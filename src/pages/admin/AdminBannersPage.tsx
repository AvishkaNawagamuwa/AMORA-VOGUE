import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { HomepageBanner } from '../../types/store';
import { uploadImage } from '../../services/storageService';

export const AdminBannersPage: React.FC = () => {
  const { banners, saveBanner, deleteBanner, reorderBanners } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<HomepageBanner | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [mobileImage, setMobileImage] = useState('');
  const [link, setLink] = useState('/new-arrivals');
  const [alt, setAlt] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [uploadingDesktop, setUploadingDesktop] = useState(false);
  const [uploadingMobile, setUploadingMobile] = useState(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openAddModal = () => {
    setEditingBanner(null);
    setTitle('');
    setImage('');
    setMobileImage('');
    setLink('/new-arrivals');
    setAlt('AMORA VOGUE Banner');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleDesktopUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingDesktop(true);
    try {
      const url = await uploadImage(e.target.files[0], 'banners');
      setImage(url);
      showToast('Banner image uploaded.');
    } catch {
      showToast('Upload failed.');
    } finally {
      setUploadingDesktop(false);
    }
  };

  const handleMobileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingMobile(true);
    try {
      const url = await uploadImage(e.target.files[0], 'banners');
      setMobileImage(url);
      showToast('Mobile banner image uploaded.');
    } catch {
      showToast('Upload failed.');
    } finally {
      setUploadingMobile(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      showToast('Please upload a banner image.');
      return;
    }

    try {
      await saveBanner({
        id: editingBanner?.id,
        title: title.trim() || 'New Collection Banner',
        image,
        mobileImage: mobileImage || undefined,
        link: link.trim() || '/shop',
        alt: alt.trim() || title.trim() || 'AMORA VOGUE Banner',
        isActive,
      });

      showToast('Banner saved successfully!');
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save banner.');
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= banners.length) return;

    const copy = [...banners];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    try {
      await reorderBanners(copy.map((b) => b.id));
      showToast('Banner reordered.');
    } catch {
      showToast('Failed to reorder banners.');
    }
  };

  const handleToggleActive = async (banner: HomepageBanner) => {
    try {
      await saveBanner({ ...banner, isActive: !banner.isActive });
      showToast(`Banner ${banner.isActive ? 'disabled' : 'enabled'}.`);
    } catch {
      showToast('Failed to update banner status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      try {
        await deleteBanner(id);
        showToast('Banner deleted.');
      } catch {
        showToast('Failed to delete banner.');
      }
    }
  };

  return (
    <AdminLayout
      title="Homepage Banners"
      subtitle="Manage your full-width fashion hero carousel slides."
      actions={
        <button
          type="button"
          onClick={openAddModal}
          className="py-2 px-4 bg-olive text-ivory hover:bg-olive-dark rounded-md text-xs tracking-wider uppercase font-semibold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Upload Banner</span>
        </button>
      }
    >
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-charcoal text-ivory text-xs px-4 py-2.5 rounded-lg shadow-xl border border-gold/40 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Banners List */}
      <div className="space-y-4">
        {banners.map((b, idx) => (
          <div
            key={b.id}
            className="bg-white p-4 sm:p-5 rounded-xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center gap-4"
          >
            {/* Banner Preview Image (16:9 aspect) */}
            <div className="relative w-full sm:w-64 aspect-[16/9] rounded-lg overflow-hidden bg-ivory border border-gray-200 shrink-0">
              <img
                src={b.image}
                alt={b.alt}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-charcoal/70 text-white text-[9px] font-bold uppercase font-mono">
                Slide #{idx + 1}
              </div>
            </div>

            {/* Banner Details */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h3 className="font-semibold text-sm text-charcoal truncate">
                {b.title}
              </h3>
              <p className="text-xs text-charcoal/50 mt-1 truncate font-mono">
                Links to: <span className="text-olive font-semibold">{b.link}</span>
              </p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                    b.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {b.isActive ? 'Active on Storefront' : 'Disabled'}
                </span>
                {b.mobileImage && (
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold uppercase tracking-wider">
                    Mobile Image Set
                  </span>
                )}
              </div>
            </div>

            {/* Actions & Reordering */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleMove(idx, 'up')}
                disabled={idx === 0}
                className="p-2 text-charcoal/60 hover:text-charcoal hover:bg-gray-100 rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move slide earlier"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleMove(idx, 'down')}
                disabled={idx === banners.length - 1}
                className="p-2 text-charcoal/60 hover:text-charcoal hover:bg-gray-100 rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
                title="Move slide later"
              >
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleToggleActive(b)}
                className="p-2 text-charcoal/60 hover:text-charcoal hover:bg-gray-100 rounded-md"
                title={b.isActive ? 'Disable banner' : 'Enable banner'}
              >
                {b.isActive ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
              </button>

              <button
                type="button"
                onClick={() => handleDelete(b.id)}
                className="p-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-md"
                title="Delete banner"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Banner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <h3 className="font-editorial text-xl font-semibold text-charcoal mb-4">
              Upload Homepage Banner
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Banner Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Modern Essentials Collection"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive font-medium"
                />
              </div>

              {/* Desktop Image Upload */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Desktop Image (16:9 Landscape) <span className="text-rose-500">*</span>
                </label>
                <div className="space-y-2">
                  {image && (
                    <div className="aspect-[16/9] rounded-lg overflow-hidden border border-gray-200">
                      <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <label className="py-2 px-3 bg-gray-100 hover:bg-gray-200 text-charcoal rounded-md text-xs font-semibold uppercase tracking-wider cursor-pointer inline-flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-olive" />
                    <span>{uploadingDesktop ? 'Uploading...' : 'Choose Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDesktopUpload}
                      disabled={uploadingDesktop}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Mobile Image Upload (Optional) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Optional Separate Mobile Image
                </label>
                <div className="space-y-2">
                  {mobileImage && (
                    <div className="aspect-[3/4] max-w-[120px] rounded-lg overflow-hidden border border-gray-200">
                      <img src={mobileImage} alt="Mobile preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <label className="py-2 px-3 bg-gray-100 hover:bg-gray-200 text-charcoal rounded-md text-xs font-semibold uppercase tracking-wider cursor-pointer inline-flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-olive" />
                    <span>{uploadingMobile ? 'Uploading...' : 'Upload Mobile Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMobileUpload}
                      disabled={uploadingMobile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Destination Link
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="/category/dresses or /new-arrivals"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Accessibility Alt Text
                </label>
                <input
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  placeholder="AMORA VOGUE - Modern Essentials: Curated Feminine Elegance"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 rounded-md text-charcoal/70 hover:bg-gray-100 font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingDesktop || uploadingMobile}
                  className="py-2 px-5 bg-olive text-ivory rounded-md font-semibold uppercase tracking-wider shadow-sm hover:bg-olive-dark disabled:opacity-50"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
