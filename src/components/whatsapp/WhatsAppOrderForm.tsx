import React, { useState } from 'react';
import { useSelectionBag } from '../../context/SelectionBagContext';
import {
  CustomerDetails,
  buildWhatsAppLink,
  validateSriLankanPhone,
  generateWhatsAppMessage,
} from '../../utils/whatsapp';
import { formatPrice } from '../../utils/formatPrice';
import { MessageCircle, AlertCircle, CheckCircle2, Shield, Truck } from 'lucide-react';

const SRI_LANKA_DISTRICTS = [
  'Colombo',
  'Gampaha',
  'Kalutara',
  'Kandy',
  'Matale',
  'Nuwara Eliya',
  'Galle',
  'Matara',
  'Hambantota',
  'Jaffna',
  'Kilinochchi',
  'Mannar',
  'Vavuniya',
  'Mullaitivu',
  'Batticaloa',
  'Ampara',
  'Trincomalee',
  'Kurunegala',
  'Puttalam',
  'Anuradhapura',
  'Polonnaruwa',
  'Badulla',
  'Monaragala',
  'Ratnapura',
  'Kegalle',
];

export const WhatsAppOrderForm: React.FC = () => {
  const { items, subtotal, totalItems } = useSelectionBag();

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    contactNumber: '',
    deliveryAddress: '',
    city: '',
    district: 'Colombo',
    postalCode: '',
    deliveryInstructions: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof CustomerDetails]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerDetails, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact Number is required';
    } else if (!validateSriLankanPhone(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid Sri Lankan mobile number (e.g. 0771234567)';
    }

    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Delivery Address is required for islandwide dispatch';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City or Town is required';
    }

    if (!formData.district) {
      newErrors.district = 'Please select your District';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const { url, error } = buildWhatsAppLink(items, formData);

    if (error) {
      alert(error);
      return;
    }

    setIsSubmitting(true);

    // Open WhatsApp in a new tab/window for customer review
    window.open(url, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      setShowPreviewModal(true);
    }, 800);
  };

  if (items.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xs border border-olive/10 text-center max-w-md mx-auto">
        <h3 className="font-editorial text-xl text-charcoal mb-2">No Items in Your Bag</h3>
        <p className="text-xs text-gray-500 mb-6 font-light">
          Please select clothing items before submitting a WhatsApp order.
        </p>
        <a
          href="/shop"
          className="inline-block px-6 py-2.5 bg-olive text-ivory text-xs tracking-widest uppercase font-semibold"
        >
          Browse Collection
        </a>
      </div>
    );
  }

  const generatedPreviewMessage = generateWhatsAppMessage(items, formData);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: Customer Details Form */}
      <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xs border border-olive/10 shadow-xs">
        <div className="border-b border-gray-100 pb-4 mb-6">
          <span className="text-[10px] tracking-widestPlus uppercase font-semibold text-gold-dark block mb-1">
            Step 2 of 2 • Order Submission
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl text-charcoal font-normal">
            Delivery & Customer Details
          </h2>
          <p className="text-xs text-charcoal/70 mt-1 font-light">
            Fill in your delivery details. Your prefilled order will open in WhatsApp where you can review and press Send.
          </p>
        </div>

        <form onSubmit={handleOpenWhatsApp} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-charcoal mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Kasuni Perera"
              className={`w-full px-3.5 py-2.5 border text-xs sm:text-sm bg-ivory/30 focus:outline-none ${
                errors.fullName ? 'border-red-500' : 'border-gray-300 focus:border-olive'
              }`}
            />
            {errors.fullName && (
              <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.fullName}
              </p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-charcoal mb-1">
              Contact Number (WhatsApp Enabled) <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="e.g. 0771234567"
              className={`w-full px-3.5 py-2.5 border text-xs sm:text-sm bg-ivory/30 focus:outline-none ${
                errors.contactNumber ? 'border-red-500' : 'border-gray-300 focus:border-olive'
              }`}
            />
            {errors.contactNumber && (
              <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.contactNumber}
              </p>
            )}
            <p className="text-[10px] text-gray-400 mt-1">
              Our boutique care team will confirm stock and delivery updates through this number.
            </p>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-charcoal mb-1">
              Delivery Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="deliveryAddress"
              rows={2}
              value={formData.deliveryAddress}
              onChange={handleChange}
              placeholder="House/Apartment No, Street Name"
              className={`w-full px-3.5 py-2.5 border text-xs sm:text-sm bg-ivory/30 focus:outline-none ${
                errors.deliveryAddress ? 'border-red-500' : 'border-gray-300 focus:border-olive'
              }`}
            />
            {errors.deliveryAddress && (
              <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.deliveryAddress}
              </p>
            )}
          </div>

          {/* City & District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-charcoal mb-1">
                City / Town <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Colombo 03 or Nugegoda"
                className={`w-full px-3.5 py-2.5 border text-xs sm:text-sm bg-ivory/30 focus:outline-none ${
                  errors.city ? 'border-red-500' : 'border-gray-300 focus:border-olive'
                }`}
              />
              {errors.city && (
                <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.city}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase text-charcoal mb-1">
                District <span className="text-red-500">*</span>
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 border border-gray-300 bg-ivory/30 focus:border-olive focus:outline-none text-xs sm:text-sm"
              >
                {SRI_LANKA_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Postal Code (optional) */}
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-charcoal mb-1">
              Postal Code <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="e.g. 00300"
              className="w-full px-3.5 py-2.5 border border-gray-300 bg-ivory/30 focus:border-olive focus:outline-none text-xs sm:text-sm"
            />
          </div>

          {/* Delivery Instructions or Notes */}
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-charcoal mb-1">
              Delivery Instructions / Notes <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              name="deliveryInstructions"
              rows={2}
              value={formData.deliveryInstructions}
              onChange={handleChange}
              placeholder="Any landmark, apartment buzzer or preferred delivery timing"
              className="w-full px-3.5 py-2.5 border border-gray-300 bg-ivory/30 focus:border-olive focus:outline-none text-xs sm:text-sm"
            />
          </div>

          {/* Trust Notice */}
          <div className="p-3 bg-ivory border border-olive/15 rounded-xs flex items-center gap-3 text-xs text-charcoal/80">
            <Shield className="w-5 h-5 text-olive shrink-0" />
            <span>
              Your personal details are stored only in this session and passed directly to WhatsApp. We never charge cards online.
            </span>
          </div>

          {/* Submission Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-olive text-ivory hover:bg-olive-dark transition-all text-xs sm:text-sm tracking-widestPlus uppercase font-bold flex items-center justify-center gap-2.5 shadow-lg group focus:outline-none focus:ring-2 focus:ring-olive/40"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>SEND ORDER VIA WHATSAPP</span>
            </button>
            <p className="text-[11px] text-gray-400 text-center mt-2">
              Clicking will open WhatsApp with your items prefilled. You will review and press <strong>Send</strong> manually.
            </p>
          </div>
        </form>
      </div>

      {/* Right: Order Summary */}
      <div className="lg:col-span-5 bg-white p-6 rounded-xs border border-olive/10 shadow-xs space-y-6">
        <div>
          <h3 className="font-editorial text-xl text-charcoal font-normal pb-3 border-b border-gray-100">
            Selected Items ({totalItems})
          </h3>

          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto mt-2 pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex gap-3 items-center text-xs">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-16 object-cover rounded-xs bg-ivory shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-charcoal truncate">{item.name}</h4>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {item.sku} • Size: {item.size} • {item.color}
                  </div>
                  <div className="text-gray-500 mt-1">
                    Qty: {item.quantity} × {formatPrice(item.unitPrice)}
                  </div>
                </div>
                <div className="font-semibold text-charcoal text-right">
                  {formatPrice(item.quantity * item.unitPrice)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtotal & Delivery Notes */}
        <div className="bg-ivory/60 p-4 rounded-xs border border-olive/10 space-y-2 text-xs">
          <div className="flex justify-between text-charcoal">
            <span>Total Items</span>
            <span className="font-semibold">{totalItems}</span>
          </div>
          <div className="flex justify-between text-charcoal text-sm">
            <span>Merchandise Subtotal</span>
            <span className="font-bold text-olive">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-500 text-[11px] pt-1 border-t border-olive/10">
            <span>Delivery Charges</span>
            <span className="italic text-gold-dark font-medium">To be confirmed on WhatsApp</span>
          </div>
          <div className="pt-2 flex items-center gap-2 text-[10px] text-gray-500">
            <Truck className="w-3.5 h-3.5 text-olive shrink-0" />
            <span>Islandwide delivery charges calculated based on your exact district and weight.</span>
          </div>
        </div>

        {/* WhatsApp Prefilled Message Preview Accordion */}
        <div className="border border-gray-200 rounded-xs p-3.5 bg-gray-50/50">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-600 block mb-1">
            WhatsApp Message Preview
          </span>
          <pre className="text-[10px] text-gray-600 font-mono whitespace-pre-wrap max-h-36 overflow-y-auto bg-white p-2.5 border border-gray-200 rounded-xs">
            {generatedPreviewMessage}
          </pre>
        </div>
      </div>

      {/* Confirmation Modal when WhatsApp opens */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-xs shadow-2xl border border-olive/20 animate-slide-up text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-editorial text-2xl text-charcoal font-semibold mb-2">
              WhatsApp Opened!
            </h3>
            <p className="text-xs text-charcoal/70 mb-6 font-light leading-relaxed">
              We have generated your order message and opened WhatsApp. Please review the prefilled details and click <strong>Send</strong> in WhatsApp to submit your order to AMORA VOGUE.
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="w-full py-2.5 bg-olive text-ivory text-xs tracking-widest uppercase font-semibold hover:bg-olive-dark transition-colors"
              >
                Back to Website
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
