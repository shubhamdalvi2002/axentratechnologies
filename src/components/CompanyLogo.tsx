import React, { useState } from 'react';
import companyLogo from '../assets/images/company_logo_1784790339260.jpg';

interface CompanyLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ size = 'md', showText = true }) => {
  const [imageError, setImageError] = useState(false);

  // Size configurations
  const dimensions = {
    sm: { img: 'w-7 h-7', title: 'text-sm sm:text-base', sub: 'text-[11px] sm:text-xs' },
    md: { img: 'w-9 h-9', title: 'text-base sm:text-lg', sub: 'text-xs sm:text-sm' },
    lg: { img: 'w-11 h-11', title: 'text-lg sm:text-xl', sub: 'text-sm' },
    xl: { img: 'w-13 h-13', title: 'text-xl sm:text-2xl', sub: 'text-base' },
  }[size];

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer select-none">
      {/* Logo Emblem Container */}
      <div className="relative shrink-0">
        <div className="absolute -inset-0.5 bg-blue-600/20 rounded-lg blur-xs opacity-0 group-hover:opacity-100 transition duration-300" />
        
        <div className={`relative ${dimensions.img} rounded-lg bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:scale-102 group-hover:border-blue-200 p-0.5`}>
          {!imageError ? (
            <img
              src={companyLogo}
              alt="Axentra Technologies Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain rounded-md"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-slate-900 rounded-md flex items-center justify-center relative overflow-hidden">
              <svg className="w-5 h-5 text-blue-500" viewBox="0 0 32 32" fill="none">
                <path d="M16 4L4 10L16 16L28 10L16 4Z" fill="url(#grad_logo)" />
                <path d="M4 16L16 22L28 16" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 22L16 28L28 22" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="grad_logo" x1="4" y1="4" x2="28" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#60A5FA" />
                    <stop offset="1" stopColor="#2563EB" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Full Company Name in a Single Horizontal Line */}
      {showText && (
        <div className="flex items-baseline gap-1.5 whitespace-nowrap">
          <span className={`font-extrabold ${dimensions.title} tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors`}>
            AXENTRA
          </span>
          <span className={`font-medium ${dimensions.sub} text-slate-500 group-hover:text-slate-700 transition-colors`}>
            Technologies Pvt. Ltd.
          </span>
        </div>
      )}
    </div>
  );
};
