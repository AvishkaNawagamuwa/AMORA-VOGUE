import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Navigation,
  Upload,
  ArrowUpDown,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Category } from '../../types/store';
import { uploadImage } from '../../services/storageService';

export const AdminCategoriesPage: React.FC = () => {
  const { categories, products, saveCategory, deleteCategory } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [showInNav, setShowInNav] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Delete Guard State
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [reassignCategory, setReassignCategory] = useState<string>('');

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setName('');
    setSlug('');
    setDescription('');
    setImage('/Carousel/Chevron Maxi Dress in Ivory Studio.png');
    setDisplayOrder(categories.length + 1);
    setIsActive(true);
    setShowInNav(true);
    setIsModalOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setImage(cat.image || '');
    setDisplayOrder(cat.displayOrder);
    setIsActive(cat.isActive);
    setShowInNav(cat.showInNav);
    setIsModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(autoSlug);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(e.target.files[0], 'categories');
      setImage(url);
      showToast('Cover image uploaded.');
    } catch {
      showToast('Failed to upload image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await saveCategory({
        id: editingCategory?.id,
        name: name.trim(),
        slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: description.trim(),
        image: image || '/Carousel/Chevron Maxi Dress in Ivory Studio.png',
        displayOrder: Number(displayOrder),
        isActive,
        showInNav,
      });

      showToast(editingCategory ? 'Category updated!' : 'Category created!');
      setIsModalOpen(false);
    } catch {
      showToast('Failed to save category.');
    }
  };

  const handleToggleNav = async (cat: Category) => {
    try {
      await saveCategory({ ...cat, showInNav: !cat.showInNav });
      showToast(`Navigation visibility updated for ${cat.name}.`);
    } catch {
      showToast('Failed to update navigation.');
    }
  };

  const handleToggleActive = async (cat: Category) => {
    try {
      await saveCategory({ ...cat, isActive: !cat.isActive });
      showToast(`Status updated for ${cat.name}.`);
    } catch {
      showToast('Failed to update status.');
    }
  };

  const categoryToDelete = categories.find((c) => c.id === deleteId);
  const productsInCat = products.filter(
    (p) => p.category === deleteId || p.categoryId === deleteId
  );

  const confirmDelete = async () => {
    if (!deleteId) return;

    if (productsInCat.length > 0 && !reassignCategory) {
      showToast('Please select a category to reassign products to.');
      return;
    }

    try {
      await deleteCategory(deleteId, reassignCategory || undefined);
      showToast('Category deleted.');
      setDeleteId(null);
      setReassignCategory('');
    } catch {
      showToast('Failed to delete category.');
    }
  };

  return (
    <AdminLayout
      title="Category Management"
      subtitle="Organize your garment collections and navbar navigation links."
      actions={
        <button
          type="button"
          onClick={openAddModal}
          className="py-2 px-4 bg-olive text-ivory hover:bg-olive-dark rounded-md text-xs tracking-wider uppercase font-semibold flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4 text-gold" />
          <span>Add Category</span>
        </button>
      }
    >
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-charcoal text-ivory text-xs px-4 py-2.5 rounded-lg shadow-xl border border-gold/40 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Categories Table / List */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50/75 border-b border-gray-200/80 text-[11px] uppercase tracking-wider text-charcoal/60">
              <th className="py-3 px-4 w-12 text-center">#</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Navbar</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((cat) => {
              const itemCount = products.filter(
                (p) => p.category === cat.id || p.categoryId === cat.id
              ).length;

              return (
                <tr key={cat.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono text-center text-charcoal/50 font-semibold">
                    {cat.displayOrder}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-ivory shrink-0 border border-gray-200">
                        <img
                          src={cat.image || '/Carousel/Chevron Maxi Dress in Ivory Studio.png'}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-semibold text-charcoal block">
                          {cat.name}
                        </span>
                        {cat.description && (
                          <span className="text-[10px] text-charcoal/50 truncate block max-w-xs font-light">
                            {cat.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-charcoal/60 text-[11px]">
                    /category/{cat.slug}
                  </td>
                  <td className="py-3 px-4 font-semibold text-charcoal">
                    {itemCount} {itemCount === 1 ? 'product' : 'products'}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleNav(cat)}
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all ${
                        cat.showInNav
                          ? 'bg-olive/10 text-olive'
                          : 'bg-gray-100 text-charcoal/40'
                      }`}
                      title="Click to toggle navbar visibility"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>{cat.showInNav ? 'In Nav' : 'Hidden'}</span>
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(cat)}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider transition-all ${
                        cat.isActive
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {cat.isActive ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(cat)}
                        className="p-1.5 text-olive hover:bg-olive/10 rounded-md"
                        title="Edit category"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteId(cat.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md"
                        title="Delete category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <h3 className="font-editorial text-xl font-semibold text-charcoal mb-4">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Category Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Frocks"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="frocks"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description for collection banners..."
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  min="1"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                  className="w-24 px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive font-bold"
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Cover Image
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-md overflow-hidden bg-ivory border border-gray-200 shrink-0">
                    <img
                      src={image || '/Carousel/Chevron Maxi Dress in Ivory Studio.png'}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="py-2 px-3 bg-gray-100 hover:bg-gray-200 text-charcoal rounded-md text-xs font-semibold uppercase tracking-wider cursor-pointer flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-olive" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Visibility Toggles */}
              <div className="pt-2 space-y-2">
                <label className="flex items-center justify-between p-2.5 rounded-lg border border-gray-200 cursor-pointer">
                  <span className="text-xs font-semibold uppercase text-charcoal">
                    Show in Main Navbar
                  </span>
                  <input
                    type="checkbox"
                    checked={showInNav}
                    onChange={(e) => setShowInNav(e.target.checked)}
                    className="w-4 h-4 text-olive rounded focus:ring-olive"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-lg border border-gray-200 cursor-pointer">
                  <span className="text-xs font-semibold uppercase text-charcoal">
                    Active Category
                  </span>
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-olive rounded focus:ring-olive"
                  />
                </label>
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
                  className="py-2 px-5 bg-olive text-ivory rounded-md font-semibold uppercase tracking-wider shadow-sm hover:bg-olive-dark"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete / Reassign Modal */}
      {deleteId && categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-200">
            <h3 className="font-editorial text-lg font-semibold text-charcoal mb-2">
              Delete "{categoryToDelete.name}"?
            </h3>

            {productsInCat.length > 0 ? (
              <div className="space-y-4 mb-6">
                <p className="text-xs text-charcoal/80 leading-relaxed font-light">
                  This category contains <strong className="font-semibold text-charcoal">{productsInCat.length} products</strong>.
                  Before deleting, please reassign them to another category:
                </p>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-charcoal/70 mb-1">
                    Reassign products to:
                  </label>
                  <select
                    value={reassignCategory}
                    onChange={(e) => setReassignCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive uppercase"
                  >
                    <option value="">Select Target Category...</option>
                    {categories
                      .filter((c) => c.id !== deleteId)
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            ) : (
              <p className="text-xs text-charcoal/70 leading-relaxed mb-6 font-light">
                This category is currently empty and can be safely deleted.
              </p>
            )}

            <div className="flex items-center justify-end gap-3 text-xs">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="py-2 px-4 rounded-md text-charcoal/70 hover:bg-gray-100 font-semibold uppercase tracking-wider"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-md font-semibold uppercase tracking-wider shadow-sm"
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
