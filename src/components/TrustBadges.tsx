import React from 'react';

const badges = [
  {
    name: 'AICTE Approved',
    svg: (
      <svg className="h-16 md:h-20 w-auto filter drop-shadow-xs" viewBox="0 0 120 120" fill="none">
        {/* Outer cogwheel */}
        <circle cx="60" cy="60" r="50" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
        <circle cx="60" cy="60" r="38" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2" />
        {/* Gear teeth */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <rect
            key={i}
            x="55"
            y="3"
            width="10"
            height="12"
            rx="2"
            fill="#D97706"
            transform={`rotate(${angle} 60 60)`}
          />
        ))}
        {/* Text ring simulation */}
        <path id="circlePath" d="M 22, 60 A 38,38 0 1,1 98,60" fill="none" />
        <text fontSize="7" fontWeight="bold" fill="#B45309" letterSpacing="0.5">
          <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
            ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
          </textPath>
        </text>
        {/* Center flame lamp */}
        <circle cx="60" cy="76" r="18" fill="#1E40AF" />
        <path d="M60 58 C53 70, 53 82, 60 86 C67 82, 67 70, 60 58 Z" fill="#DC2626" />
        <path d="M60 65 C56 73, 56 80, 60 83 C64 80, 64 73, 60 65 Z" fill="#F59E0B" />
        <text x="60" y="52" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="18" fill="#991B1B" textAnchor="middle">
          AICTE
        </text>
      </svg>
    ),
  },
  {
    name: 'ISO 9001:2015 Certified',
    svg: (
      <svg className="h-16 md:h-20 w-auto filter drop-shadow-xs" viewBox="0 0 120 120" fill="none">
        {/* Starburst outer teeth */}
        {Array.from({ length: 32 }).map((_, i) => (
          <path
            key={i}
            d="M 60 4 L 63 12 L 57 12 Z"
            fill="#EAB308"
            transform={`rotate(${i * (360 / 32)} 60 60)`}
          />
        ))}
        <circle cx="60" cy="60" r="50" fill="#CA8A04" />
        <circle cx="60" cy="60" r="45" fill="#111827" />
        <circle cx="60" cy="60" r="38" fill="#FACC15" />
        {/* Ribbon banner */}
        <rect x="5" y="46" width="110" height="28" rx="4" fill="#111827" stroke="#FACC15" strokeWidth="2.5" />
        <text x="60" y="66" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="16" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">
          ISO 9001
        </text>
        <text x="60" y="36" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="9" fill="#111827" textAnchor="middle" letterSpacing="0.5">
          ★ CERTIFIED ★
        </text>
        <text x="60" y="86" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="8" fill="#111827" textAnchor="middle">
          QUALITY MANAGEMENT
        </text>
      </svg>
    ),
  },
  {
    name: 'MSME Govt of India',
    svg: (
      <svg className="h-16 md:h-20 w-auto filter drop-shadow-xs" viewBox="0 0 140 90" fill="none">
        {/* Lion Capitol Symbol */}
        <path d="M70 4 L74 12 L82 12 L76 18 L78 26 L70 21 L62 26 L64 18 L58 12 L66 12 Z" fill="#D97706" />
        <rect x="62" y="27" width="16" height="3" fill="#D97706" />
        <text x="70" y="36" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="6" fill="#B45309" textAnchor="middle">
          सत्यमेव जयते
        </text>
        {/* MSME Letters */}
        <text x="70" y="62" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="28" fill="#111827" textAnchor="middle" letterSpacing="-0.5">
          MSME
        </text>
        <rect x="10" y="67" width="120" height="1.5" fill="#D97706" />
        <text x="70" y="77" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="7.5" fill="#374151" textAnchor="middle" letterSpacing="0.5">
          MICRO, SMALL & MEDIUM ENTERPRISES
        </text>
        <text x="70" y="85" fontFamily="Arial, sans-serif" fontWeight="semibold" fontSize="6" fill="#6B7280" textAnchor="middle">
          सूक्ष्म, लघु एवं मध्यम उद्यम
        </text>
      </svg>
    ),
  },
  {
    name: 'AWS Partner',
    svg: (
      <svg className="h-16 md:h-20 w-auto filter drop-shadow-xs" viewBox="0 0 130 90" fill="none">
        <path d="M10 10 L120 10 L120 65 L95 80 L10 80 Z" fill="#FFFFFF" stroke="#FF9900" strokeWidth="3" />
        <text x="65" y="38" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="22" fill="#232F3E" textAnchor="middle">
          aws
        </text>
        <path d="M44 43 Q65 52 86 43" stroke="#FF9900" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M83 39 L89 43 L82 47" fill="#FF9900" />
        <text x="65" y="68" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="12" fill="#232F3E" textAnchor="middle" letterSpacing="1.5">
          PARTNER
        </text>
      </svg>
    ),
  },
  {
    name: 'Axentra Technologies',
    svg: (
      <svg className="h-16 md:h-20 w-auto filter drop-shadow-xs" viewBox="0 0 180 80" fill="none">
        {/* Modern Axentra A Logo Mark */}
        <path d="M30 65 L60 12 L90 65 L73 65 L60 38 L47 65 Z" fill="url(#axentra_hero_grad)" />
        <path d="M42 50 L82 32 L70 26 Z" fill="#38BDF8" />
        <text x="98" y="44" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="20" letterSpacing="1" fill="#111827">
          AXENTRA
        </text>
        <text x="98" y="58" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="9" letterSpacing="2" fill="#2563EB">
          TECHNOLOGIES
        </text>
        <defs>
          <linearGradient id="axentra_hero_grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: 'Google Partner',
    svg: (
      <svg className="h-16 md:h-20 w-auto filter drop-shadow-xs" viewBox="0 0 150 60" fill="none">
        <rect x="0" y="0" width="16" height="60" fill="#4285F4" />
        <text x="26" y="26" fontFamily="Product Sans, Arial, sans-serif" fontWeight="bold" fontSize="19" fill="#4285F4">
          Google
        </text>
        <text x="26" y="50" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="22" fill="#5F6368">
          Partner
        </text>
      </svg>
    ),
  },
  {
    name: 'Registered Trademark',
    svg: (
      <svg className="h-16 md:h-20 w-auto filter drop-shadow-xs" viewBox="0 0 110 110" fill="none">
        <circle cx="55" cy="55" r="48" stroke="#DC2626" strokeWidth="3.5" strokeDasharray="7 4" fill="none" />
        <circle cx="55" cy="55" r="41" stroke="#DC2626" strokeWidth="2.5" fill="none" />
        <rect x="5" y="42" width="100" height="26" fill="#DC2626" rx="3" />
        <text x="55" y="60" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="12" fill="#FFFFFF" textAnchor="middle" letterSpacing="1">
          TRADEMARK
        </text>
        <text x="55" y="32" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="8" fill="#DC2626" textAnchor="middle" letterSpacing="0.5">
          ★ REGISTERED ★
        </text>
        <text x="55" y="80" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="8" fill="#DC2626" textAnchor="middle" letterSpacing="0.5">
          REGISTERED
        </text>
      </svg>
    ),
  },
  {
    name: '#startupindia',
    svg: (
      <svg className="h-14 md:h-18 w-auto filter drop-shadow-xs" viewBox="0 0 160 55" fill="none">
        <text x="0" y="35" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="24" fill="#F97316">
          #startup<tspan fill="#06B6D4">i</tspan><tspan fill="#F97316">ndia</tspan>
        </text>
        <path d="M125 35 L125 46 L150 46" stroke="#84CC16" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
  },
  {
    name: 'MCA Govt of India',
    svg: (
      <svg className="h-16 md:h-20 w-auto filter drop-shadow-xs" viewBox="0 0 170 70" fill="none">
        {/* Ashoka Emblem */}
        <g transform="translate(0, 0) scale(0.7)">
          <path d="M25 5 L28 14 L36 14 L30 20 L32 28 L25 23 L18 28 L20 20 L14 14 L22 14 Z" fill="#1E293B" />
          <path d="M10 32 C10 25, 40 25, 40 32 L40 55 L10 55 Z" fill="#1E293B" />
          <circle cx="25" cy="65" r="8" stroke="#1E293B" strokeWidth="2" fill="none" />
          <text x="25" y="82" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="7" fill="#1E293B" textAnchor="middle">
            सत्यमेव जयते
          </text>
        </g>
        {/* MCA Blocks */}
        <g transform="translate(40, 2)">
          <rect x="0" y="0" width="18" height="18" fill="#0A2540" rx="1" />
          <text x="9" y="14" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="13" fill="#FFFFFF" textAnchor="middle">M</text>
          <rect x="0" y="21" width="18" height="18" fill="#0A2540" rx="1" />
          <text x="9" y="35" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="13" fill="#FFFFFF" textAnchor="middle">C</text>
          <rect x="0" y="42" width="18" height="18" fill="#0A2540" rx="1" />
          <text x="9" y="56" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="13" fill="#FFFFFF" textAnchor="middle">A</text>

          <text x="26" y="14" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12" fill="#0A2540">MINISTRY OF</text>
          <text x="26" y="35" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="12" fill="#0A2540">CORPORATE AFFAIRS</text>
          <text x="26" y="56" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="11" fill="#0EA5E9">GOVERNMENT OF INDIA</text>
        </g>
      </svg>
    ),
  },
];

const BadgeMarqueeGroup: React.FC = () => (
  <div className="flex items-center gap-14 md:gap-20 shrink-0">
    {badges.map((badge, index) => (
      <div
        key={`${badge.name}-${index}`}
        className="flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110 cursor-pointer"
        title={badge.name}
      >
        {badge.svg}
      </div>
    ))}
  </div>
);

export const TrustBadges: React.FC = () => {
  return (
    <section className="py-8 md:py-12 bg-slate-50/80 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-4 md:px-6">
        <div className="text-center mb-5">
          <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-extrabold">
            Accreditations, Govt. Affiliations & Recognition
          </h4>
        </div>

        {/* Playing Infinite Marquee Track */}
        <div className="relative w-full overflow-hidden py-2">
          {/* Subtle fade masks on sides */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex gap-14 md:gap-20 items-center">
            <BadgeMarqueeGroup />
            <BadgeMarqueeGroup />
          </div>
        </div>
      </div>
    </section>
  );
};
