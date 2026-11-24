import React, { useState } from 'react';
import {
  Save,
  MessageCircle,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MapPin,
  Truck,
  RotateCcw,
  Ruler,
  Lock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { authService } from '../../services/authService';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateStoreSettings } = useStore();

  // Store Settings Form
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [contactNumber, setContactNumber] = useState(settings.contactNumber);
  const [businessEmail, setBusinessEmail] = useState(settings.businessEmail);
  const [instagramUrl, setInstagramUrl] = useState(settings.instagramUrl);
  const [facebookUrl, setFacebookUrl] = useState(settings.facebookUrl);
  const [storeAddress, setStoreAddress] = useState(settings.storeAddress);
  const [deliveryInfo, setDeliveryInfo] = useState(settings.deliveryInfo);
  const [returnsPolicy, setReturnsPolicy] = useState(settings.returnsPolicy);
  const [sizeGuide, setSizeGuide] = useState(settings.sizeGuide);

  // Change Password Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const [savingSettings, setSavingSettings] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await updateStoreSettings({
        whatsappNumber: whatsappNumber.replace(/[^0-9]/g, ''),
        contactNumber,
        businessEmail,
        instagramUrl,
        facebookUrl,
        storeAddress,
        deliveryInfo,
        returnsPolicy,
        sizeGuide,
      });
      showToast('Store settings updated successfully!');
    } catch {
      showToast('Failed to save settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    try {
      const res = await authService.changePassword(currentPassword, newPassword);
      if (res.success) {
        setPasswordSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        showToast('Admin password changed successfully!');
      } else {
        setPasswordError(res.error || 'Failed to change password');
      }
    } catch {
      setPasswordError('An error occurred while changing password.');
    }
  };

  return (
    <AdminLayout
      title="Store Settings & Policies"
      subtitle="Configure your boutique contact details, customer policies, and admin security."
    >
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-charcoal text-ivory text-xs px-4 py-2.5 rounded-lg shadow-xl border border-gold/40 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* ================= 1. CONTACT & SOCIALS ================= */}
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-xs space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal flex items-center gap-2">
              <Phone className="w-4 h-4 text-olive" />
              <span>Contact & Messaging</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Business WhatsApp Number
                </label>
                <div className="relative">
                  <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="94771234567"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive font-mono"
                  />
                </div>
                <p className="text-[10px] text-charcoal/50 mt-1">
                  Format with country code, no + or spaces (e.g. 94771234567 for Sri Lanka).
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Display Contact Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="+94 77 123 4567"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Customer Care Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    placeholder="care@amoravogue.lk"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Physical Boutique Address
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-charcoal/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={storeAddress}
                    onChange={(e) => setStoreAddress(e.target.value)}
                    placeholder="Colombo, Sri Lanka (Islandwide Doorstep Delivery)"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Instagram Profile Link
                </label>
                <div className="relative">
                  <Instagram className="w-4 h-4 text-pink-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={instagramUrl}
                    onChange={(e) => setInstagramUrl(e.target.value)}
                    placeholder="https://instagram.com/amoravogue"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                  Facebook Page Link
                </label>
                <div className="relative">
                  <Facebook className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={facebookUrl}
                    onChange={(e) => setFacebookUrl(e.target.value)}
                    placeholder="https://facebook.com/amoravogue"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ================= 2. STORE POLICIES & GUIDES ================= */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-xs space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal flex items-center gap-2">
              <Truck className="w-4 h-4 text-olive" />
              <span>Policies & Size Guide</span>
            </h2>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                Delivery Information Text
              </label>
              <textarea
                rows={2}
                value={deliveryInfo}
                onChange={(e) => setDeliveryInfo(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive font-light"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                Returns & Exchanges Policy
              </label>
              <textarea
                rows={2}
                value={returnsPolicy}
                onChange={(e) => setReturnsPolicy(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive font-light"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                Size Guide Information
              </label>
              <textarea
                rows={2}
                value={sizeGuide}
                onChange={(e) => setSizeGuide(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive font-light"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={savingSettings}
                className="py-2.5 px-6 bg-olive hover:bg-olive-dark text-ivory rounded-md text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
              >
                <Save className="w-4 h-4 text-gold" />
                <span>{savingSettings ? 'Saving Settings...' : 'Save Settings'}</span>
              </button>
            </div>
          </div>
        </form>

        {/* ================= 3. CHANGE ADMIN PASSWORD ================= */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <ShieldCheck className="w-5 h-5 text-olive" />
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
                Change Admin Password
              </h2>
              <p className="text-xs text-charcoal/50 font-light">
                Keep your boutique management account protected with a strong password.
              </p>
            </div>
          </div>

          {passwordError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          {passwordSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Password updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                New Password (minimum 8 characters)
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal/80 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-olive"
              />
            </div>

            <div>
              <button
                type="submit"
                className="py-2.5 px-5 bg-charcoal hover:bg-charcoal/90 text-ivory rounded-md text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};
