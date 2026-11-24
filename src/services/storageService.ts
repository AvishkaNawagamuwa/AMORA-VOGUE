import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Optimizes an image file for web performance while preserving colors, patterns and clarity.
 */
export const optimizeImage = async (
  file: File,
  maxWidth = 2000,
  maxHeight = 2000,
  quality = 0.88
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    // If SVG or non-image, return raw file
    if (file.type === 'image/svg+xml' || !file.type.startsWith('image/')) {
      resolve(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve(file);
          return;
        }

        // High quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Keep webp or jpeg
        const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              resolve(file);
            }
          },
          outputType,
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve(file);
    reader.readAsDataURL(file);
  });
};

/**
 * Uploads an image to persistent storage (Supabase Storage or local fallback)
 */
export const uploadImage = async (
  file: File,
  folder: 'products' | 'categories' | 'banners' = 'products'
): Promise<string> => {
  try {
    const optimizedBlob = await optimizeImage(file);
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.storage
        .from('amora-assets')
        .upload(fileName, optimizedBlob, {
          cacheControl: '31536000',
          upsert: true,
          contentType: file.type || 'image/jpeg',
        });

      if (error) {
        console.warn('Supabase storage upload error:', error.message);
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('amora-assets')
        .getPublicUrl(data.path);

      return publicUrlData.publicUrl;
    } else {
      // Offline / Local fallback: convert to persistent base64 data URL
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(optimizedBlob);
      });
    }
  } catch (error) {
    console.error('Failed to upload image:', error);
    // Fallback to base64 so admin operation never breaks
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
};
