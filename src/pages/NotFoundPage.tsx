import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] bg-ivory flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white p-8 sm:p-12 text-center rounded-xs border border-olive/15 shadow-sm">
        <span className="font-editorial text-6xl text-gold-dark font-normal block mb-2">
          404
        </span>
        <h1 className="font-editorial text-2xl text-charcoal font-medium mb-3">
          Page Not Found
        </h1>
        <p className="text-xs text-charcoal/70 mb-8 font-light leading-relaxed">
          The boutique page or collection you are looking for does not exist or may have been relocated.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-olive text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-olive-dark transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};
