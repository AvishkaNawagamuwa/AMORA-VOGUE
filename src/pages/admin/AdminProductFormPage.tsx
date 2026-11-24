import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Camera,
  Upload,
  Trash2,
  Star,
  Plus,
  Check,
  AlertCircle,
  Eye,
  Sparkles,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Product, ProductVariant, ProductColor } from '../../types/store';
import { uploadImage } from '../../services/storageService';

const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

const COMMON_COLORS: ProductColor[] = [
  { name: 'IVORY', hex: '#F8F5EB' },
  { name: 'CHOCOLATE BROWN', hex: '#4E3629' },
  { name: 'OLIVE GREEN', hex: '#303915' },
  { name: 'TERRACOTTA', hex: '#D87040' },
  { name: 'MIDNIGHT BLACK', hex: '#1B1B1B' },
  { name: 'WHITE/VIOLET', hex: '#8A2BE2' },
  { name: 'CORAL', hex: '#FF7043' },
  { name: 'CORNFLOWER BLUE', hex: '#6495ED' },
  { name: 'ROSE DUST', hex: '#D4A5A5' },
];

export const AdminProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const { getProductById, saveProduct, categories, saveCategory } = useStore();

  // Form State
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || 'dresses');
  const [price, setPrice] = useState<number | ''>('');
  const [compareAtPrice, setCompareAtPrice] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [fabric, setFabric] = useState('');
  const [care, setCare] = useState('');
  const [collection, setCollection] = useState('');

  // Status & Badges
  const [status, setStatus] = useState<'published' | 'draft' | 'archived'>('published');
  const [featured, setFeatured] = useState(false);
  const [newArrival, setNewArrival] = useState(true);
  const [bestSeller, setBestSeller] = useState(false);

  // Photos
  const [images, setImages] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Sizes & Colors
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['S', 'M', 'L']);
  const [customSizeInput, setCustomSizeInput] = useState('');
  const [colors, setColors] = useState<ProductColor[]>([{ name: 'IVORY', hex: '#F8F5EB' }]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#303915');

  // Stock Matrix
  const [variants, setVariants] = useState<ProductVariant[]>([]);

  // Category quick add modal
  const [showNewCatModal, setShowNewCatModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  // Status & Notifications
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Populate if editing
  useEffect(() => {
    if (isEditing && id) {
      const prod = getProductById(id);
      if (prod) {
        setName(prod.name);
        setSku(prod.sku);
        setSlug(prod.slug);
        setCategory(prod.category || prod.categoryId || categories[0]?.id || 'dresses');
        setPrice(prod.price);
        setCompareAtPrice(prod.compareAtPrice || '');
        setDescription(prod.description || '');
        setFabric(prod.fabric || '');
        setCare(Array.isArray(prod.care) ? prod.care.join(', ') : '');
        setCollection(prod.collection || '');
        setStatus(prod.status || 'published');
        setFeatured(Boolean(prod.featured));
        setNewArrival(Boolean(prod.newArrival));
        setBestSeller(Boolean(prod.bestSeller));
        setImages(prod.images || []);
        setSelectedSizes(prod.availableSizes || ['S', 'M', 'L']);
        setColors(prod.availableColors || [{ name: 'IVORY', hex: '#F8F5EB' }]);
        setVariants(prod.variants || []);
      }
    } else {
      // Auto-generate fresh SKU for new product
      setSku(`AV-${Math.floor(100000 + Math.random() * 900000)}`);
    }
  }, [id, isEditing, getProductById, categories]);

  // Auto-generate slug when name changes (for new products)
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(autoSlug);
    }
  };

  // Sync variants when sizes or colors change
  useEffect(() => {
    setVariants((prevVariants) => {
      const newVariants: ProductVariant[] = [];
      selectedSizes.forEach((s) => {
        colors.forEach((c) => {
          const existing = prevVariants.find((v) => v.size === s && v.color === c.name);
          if (existing) {
            newVariants.push(existing);
          } else {
            newVariants.push({
              size: s,
              color: c.name,
              colorHex: c.hex,
              stockQuantity: 10,
              inStock: true,
              sku: `${sku || 'AV'}-${s}-${c.name.substring(0, 2)}`,
            });
          }
        });
      });
      return newVariants;
    });
  }, [selectedSizes, colors, sku]);

  // Handle Photo Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingImage(true);

    try {
      const files = Array.from(e.target.files);
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const url = await uploadImage(file, 'products');
        uploadedUrls.push(url);
      }

      setImages((prev) => [...prev, ...uploadedUrls]);
      showToast(`${uploadedUrls.length} photo(s) added.`);
    } catch {
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    setImages((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      copy.unshift(item);
      return copy;
    });
  };

  // Sizes management
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleAddCustomSize = () => {
    if (!customSizeInput.trim()) return;
    const clean = customSizeInput.trim().toUpperCase();
    if (!selectedSizes.includes(clean)) {
      setSelectedSizes((prev) => [...prev, clean]);
    }
    setCustomSizeInput('');
  };

  // Colors management
  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    const nameUpper = newColorName.trim().toUpperCase();
    if (!colors.some((c) => c.name === nameUpper)) {
      setColors((prev) => [...prev, { name: nameUpper, hex: newColorHex }]);
    }
    setNewColorName('');
  };

  const handleRemoveColor = (colorName: string) => {
    if (colors.length <= 1) {
      showToast('At least one color is required.');
      return;
    }
    setColors((prev) => prev.filter((c) => c.name !== colorName));
  };

  // Stock input change
  const handleStockChange = (size: string, color: string, qty: number) => {
    setVariants((prev) =>
      prev.map((v) => {
        if (v.size === size && v.color === color) {
          const validQty = Math.max(0, qty);
          return {
            ...v,
            stockQuantity: validQty,
            inStock: validQty > 0,
          };
        }
        return v;
      })
    );
  };

  // Quick category creation
  const handleCreateCategory = async () => {
    if (!newCatName.trim()) return;
    try {
      const created = await saveCategory({ name: newCatName.trim() });
      setCategory(created.id);
      setShowNewCatModal(false);
      setNewCatName('');
      showToast(`Category "${created.name}" created!`);
    } catch {
      showToast('Could not create category.');
    }
  };

  // Form Save
  const handleSubmit = async (publishStatus?: 'published' | 'draft') => {
    setError(null);

    if (!name.trim()) {
      setError('Product name is required.');
      return;
    }

    if (price === '' || isNaN(Number(price)) || Number(price) <= 0) {
      setError('Please provide a valid selling price in LKR.');
      return;
    }

    if (images.length === 0) {
      setError('Please upload at least one product photo.');
      return;
    }

    setSaving(true);

    try {
      const careArray = care
        .split(',')
        .map((c) => c.trim())
        .filter(Boolean);

      const productPayload: Partial<Product> = {
        id: id || undefined,
        name: name.trim(),
        sku: sku.trim() || `AV-${Date.now()}`,
        slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category,
        categoryId: category,
        price: Number(price),
        compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
        description: description.trim(),
        fabric: fabric.trim(),
        care: careArray,
        collection: collection.trim(),
        status: publishStatus || status,
        featured,
        newArrival,
        bestSeller,
        images,
        availableSizes: selectedSizes,
        availableColors: colors,
        variants,
      };

      await saveProduct(productPayload);
      showToast(isEditing ? 'Product updated successfully!' : 'Product created successfully!');
      setTimeout(() => navigate('/admin/products'), 600);
    } catch (err: any) {
      setError(err?.message || 'Failed to save product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title={isEditing ? 'Edit Product' : 'Add New Product'}
      subtitle={isEditing ? `Editing SKU ${sku}` : 'Fill in the boutique garment details below.'}
      actions={
        <div className="flex items-center gap-2">
          <Link
            to="/admin/products"
            className="py-2 px-3 text-charcoal/70 hover:bg-gray-100 rounded-md text-xs font-semibold uppercase tracking-wider"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={saving}
            className="py-2 px-3.5 bg-gray-100 hover:bg-gray-200 text-charcoal rounded-md text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={saving}
            className="py-2 px-4 bg-olive hover:bg-olive-dark text-ivory rounded-md text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-gold" />
            <span>{saving ? 'Saving...' : 'Publish'}</span>
          </button>
        </div>
      }
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-charcoal text-ivory text-xs px-4 py-2.5 rounded-lg shadow-xl border border-gold/40 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs text-red-700 leading-relaxed font-medium">
            {error}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        {/* ================= 1. PRODUCT PHOTOS ================= */}
        <section className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal flex items-center gap-2">
                <span>1. Product Photos</span>
                <span className="text-[10px] text-gold-dark font-medium lowercase">({images.length} uploaded)</span>
              </h2>
              <p className="text-xs text-charcoal/60 font-light mt-0.5">
                Upload garment photos (front view, side view, back view, fabric details). The first photo is the primary cover image.
              </p>
            </div>
          </div>

          {/* Photos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4">
            {images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-ivory border border-gray-200 shadow-xs"
              >
                <img
                  src={imgUrl}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                />

                {/* Primary Tag */}
                {idx === 0 && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-olive text-ivory text-[9px] uppercase font-bold tracking-wider rounded shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 text-gold fill-gold" />
                    <span>Primary</span>
                  </div>
                )}

                {/* Photo Actions Overlay */}
                <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(idx)}
                      className="p-1.5 bg-white text-charcoal rounded-full hover:bg-gold hover:text-white transition-colors shadow-xs"
                      title="Set as primary photo"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="p-1.5 bg-white text-rose-600 rounded-full hover:bg-rose-600 hover:text-white transition-colors shadow-xs"
                    title="Remove photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Mobile / Camera Upload Box */}
            <label className="aspect-[3/4] rounded-lg border-2 border-dashed border-olive/30 hover:border-olive bg-ivory/40 hover:bg-ivory/80 flex flex-col items-center justify-center cursor-pointer transition-colors p-4 text-center">
              <Camera className="w-6 h-6 text-olive mb-2" />
              <span className="text-xs font-semibold text-charcoal tracking-wide">
                {uploadingImage ? 'Uploading...' : 'Take or Upload Photo'}
              </span>
              <span className="text-[10px] text-charcoal/50 mt-1">
                PNG, JPG, WebP
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                disabled={uploadingImage}
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </section>

        {/* ================= 2. NAME & CATEGORY ================= */}
        <section className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-xs space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
            2. Product Name & Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                Product Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Summer Bloom Square-Neck Pleated Midi Dress"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                SKU (Stock Keeping Unit)
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="AV-061102"
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-white font-mono"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80">
                  Category <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowNewCatModal(true)}
                  className="text-[11px] text-olive hover:underline font-semibold flex items-center gap-0.5"
                >
                  <Plus className="w-3 h-3" />
                  <span>New Category</span>
                </button>
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-white uppercase font-medium"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug || c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                URL Slug
              </label>
              <div className="flex items-center text-xs text-charcoal/50">
                <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg font-mono text-[11px]">
                  /product/
                </span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="summer-bloom-midi-dress"
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-olive bg-white font-mono"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. PRICING ================= */}
        <section className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-xs space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
            3. Pricing (LKR)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                Selling Price (LKR) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-charcoal/50">
                  Rs.
                </span>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="7450"
                  className="w-full pl-11 pr-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-white font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                Original Price (Optional Strikethrough)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-charcoal/50">
                  Rs.
                </span>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={compareAtPrice}
                  onChange={(e) => setCompareAtPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="8400"
                  className="w-full pl-11 pr-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-white"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. SIZES & COLOURS ================= */}
        <section className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-xs space-y-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
            4. Available Sizes & Colours
          </h2>

          {/* Sizes Chips */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
              Select Available Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {STANDARD_SIZES.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`py-2 px-3.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border ${
                      isSelected
                        ? 'bg-olive text-ivory border-olive shadow-xs'
                        : 'bg-white text-charcoal/70 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {/* Custom Size Input */}
            <div className="mt-3 flex items-center gap-2 max-w-xs">
              <input
                type="text"
                placeholder="Custom size (e.g. 2XL, UK 10)"
                value={customSizeInput}
                onChange={(e) => setCustomSizeInput(e.target.value)}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive"
              />
              <button
                type="button"
                onClick={handleAddCustomSize}
                className="py-1.5 px-3 bg-gray-100 hover:bg-gray-200 text-charcoal text-xs font-semibold rounded-md uppercase"
              >
                Add
              </button>
            </div>
          </div>

          {/* Colours Swatches */}
          <div className="pt-4 border-t border-gray-100">
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-2">
              Available Colours ({colors.length})
            </label>

            {/* Current colors list */}
            <div className="flex flex-wrap gap-2.5 mb-4">
              {colors.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-gray-200 bg-white shadow-2xs"
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs font-semibold uppercase">{c.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(c.name)}
                    className="text-charcoal/40 hover:text-rose-600 ml-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Add color tool */}
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                placeholder="Colour name (e.g. PASTEL LILAC)"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive w-48 uppercase"
              />
              <input
                type="color"
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                className="w-8 h-8 rounded border border-gray-300 cursor-pointer p-0"
                title="Pick swatch color"
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="py-1.5 px-3 bg-olive text-ivory hover:bg-olive-dark text-xs font-semibold rounded-md uppercase tracking-wider"
              >
                + Add Colour
              </button>
            </div>
          </div>
        </section>

        {/* ================= 5. STOCK & INVENTORY MATRIX ================= */}
        <section className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
              5. Inventory Quantities
            </h2>
            <span className="text-xs text-charcoal/60">
              Total Stock:{' '}
              <strong className="text-charcoal font-bold">
                {variants.reduce((sum, v) => sum + (v.stockQuantity || 0), 0)} items
              </strong>
            </span>
          </div>

          <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto pr-1">
            {variants.map((v) => (
              <div
                key={`${v.size}-${v.color}`}
                className="py-2.5 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                    style={{ backgroundColor: v.colorHex || '#333' }}
                  />
                  <span className="font-semibold text-charcoal">{v.color}</span>
                  <span className="text-charcoal/40">•</span>
                  <span className="px-2 py-0.5 rounded bg-gray-100 font-mono text-[11px] font-bold">
                    {v.size}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-charcoal/50 text-[11px]">Quantity:</span>
                  <input
                    type="number"
                    min="0"
                    value={v.stockQuantity ?? 0}
                    onChange={(e) => handleStockChange(v.size, v.color, parseInt(e.target.value) || 0)}
                    className="w-20 px-2 py-1 text-center font-bold text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-olive bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 6. OPTIONAL PRODUCT DETAILS ================= */}
        <section className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-xs space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
            6. Fabric & Description (Optional)
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
              Fabric Composition
            </label>
            <input
              type="text"
              value={fabric}
              onChange={(e) => setFabric(e.target.value)}
              placeholder="e.g. 100% Pure Sateen Cotton with Slight Lustre and Cotton Lining"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
              Care Instructions (Comma separated)
            </label>
            <input
              type="text"
              value={care}
              onChange={(e) => setCare(e.target.value)}
              placeholder="e.g. Gentle wash cold, Medium steam iron, Line dry in shade"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
              Collection Tag
            </label>
            <input
              type="text"
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
              placeholder="e.g. Best Sellers, Summer Drop, Resort"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
              Product Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the cut, silhouette, fit and design..."
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-olive bg-white font-light"
            />
          </div>
        </section>

        {/* ================= 7. PREVIEW & PUBLISH ================= */}
        <section className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-xs space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
            7. Visibility & Badges
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="p-3 rounded-lg border border-gray-200 hover:border-olive cursor-pointer flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase block">New Arrival</span>
                <span className="text-[10px] text-charcoal/50">Feature in New Arrivals</span>
              </div>
              <input
                type="checkbox"
                checked={newArrival}
                onChange={(e) => setNewArrival(e.target.checked)}
                className="w-4 h-4 text-olive rounded focus:ring-olive"
              />
            </label>

            <label className="p-3 rounded-lg border border-gray-200 hover:border-olive cursor-pointer flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase block">Best Seller</span>
                <span className="text-[10px] text-charcoal/50">Feature in Best Sellers</span>
              </div>
              <input
                type="checkbox"
                checked={bestSeller}
                onChange={(e) => setBestSeller(e.target.checked)}
                className="w-4 h-4 text-olive rounded focus:ring-olive"
              />
            </label>

            <label className="p-3 rounded-lg border border-gray-200 hover:border-olive cursor-pointer flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase block">Featured Item</span>
                <span className="text-[10px] text-charcoal/50">Homepage showcase</span>
              </div>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 text-olive rounded focus:ring-olive"
              />
            </label>
          </div>
        </section>
      </div>

      {/* Sticky Mobile Save & Publish Bar */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 flex items-center justify-between gap-3 z-20 shadow-lg">
        <button
          type="button"
          onClick={() => handleSubmit('draft')}
          disabled={saving}
          className="flex-1 py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-charcoal rounded-lg text-xs font-semibold uppercase tracking-wider"
        >
          Save Draft
        </button>
        <button
          type="button"
          onClick={() => handleSubmit('published')}
          disabled={saving}
          className="flex-1 py-2.5 px-4 bg-olive hover:bg-olive-dark text-ivory rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Save className="w-4 h-4 text-gold" />
          <span>{saving ? 'Saving...' : 'Publish'}</span>
        </button>
      </div>

      {/* Quick Category Modal */}
      {showNewCatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-xl border border-gray-200">
            <h3 className="font-editorial text-lg font-semibold text-charcoal mb-2">
              Create New Category
            </h3>
            <input
              type="text"
              placeholder="Category name (e.g. Frocks)"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive mb-4"
            />
            <div className="flex items-center justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setShowNewCatModal(false)}
                className="py-1.5 px-3 rounded-md text-charcoal/70 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateCategory}
                className="py-1.5 px-4 bg-olive text-ivory rounded-md font-semibold uppercase tracking-wider"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
