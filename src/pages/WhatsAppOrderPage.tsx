import React from 'react';
import { WhatsAppOrderForm } from '../components/whatsapp/WhatsAppOrderForm';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const WhatsAppOrderPage: React.FC = () => {
  return (
    <div className="bg-ivory/30 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center gap-1.5 text-[11px] text-charcoal/60 uppercase tracking-wider font-light">
            <Link to="/" className="hover:text-olive">Home</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <Link to="/selection-bag" className="hover:text-olive">Selection Bag</Link>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-charcoal font-medium">WhatsApp Order Submission</span>
          </nav>
        </div>

        <WhatsAppOrderForm />
      </div>
    </div>
  );
};
