import React from 'react';
import { motion } from 'motion/react';
import { AnimatedWords } from './AnimatedWords';

interface Company {
  name: string;
  url: string;
  svg: React.ReactNode;
}

const companies: Company[] = [
  {
    name: 'Google',
    url: 'https://www.google.com',
    svg: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 135 36" fill="none">
        {/* Google 4-Color G Logo + colorful letters in single line */}
        <g transform="translate(0, 5)">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
        </g>
        <text x="32" y="24" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="24">
          <tspan fill="#4285F4">G</tspan>
          <tspan fill="#EA4335">o</tspan>
          <tspan fill="#FBBC05">o</tspan>
          <tspan fill="#4285F4">g</tspan>
          <tspan fill="#34A853">l</tspan>
          <tspan fill="#EA4335">e</tspan>
        </text>
      </svg>
    ),
  },
  {
    name: 'Microsoft',
    url: 'https://www.microsoft.com',
    svg: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 150 36" fill="none">
        <g transform="translate(0, 6)">
          <rect x="0" y="0" width="11" height="11" fill="#F25022"/>
          <rect x="13" y="0" width="11" height="11" fill="#7FBA00"/>
          <rect x="0" y="13" width="11" height="11" fill="#00A4EF"/>
          <rect x="13" y="13" width="11" height="11" fill="#FFB900"/>
        </g>
        <text x="32" y="24" fontFamily="'Segoe UI', Arial, sans-serif" fontWeight="700" fontSize="22" fill="#2F2F2F" letterSpacing="-0.2">Microsoft</text>
      </svg>
    ),
  },
  {
    name: 'Amazon',
    url: 'https://www.amazon.com',
    svg: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 110 36" fill="none">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="24" letterSpacing="-0.8" fill="#111827">amazon</text>
        <path d="M 4 25 Q 35 34 66 25" stroke="#FF9900" strokeWidth="3.2" fill="none" strokeLinecap="round"/>
        <path d="M 62 22 L 70 25 L 61 28" fill="#FF9900"/>
      </svg>
    ),
  },
  {
    name: 'Apple',
    url: 'https://www.apple.com',
    svg: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 105 36" fill="none">
        <path fill="#111827" d="M18.71 22.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 20 2.94 15.45 4.7 12.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 9.22c.62-.75 1.04-1.8 0.92-2.85-.9.04-2 .6-2.65 1.36-.58.68-1.09 1.76-.95 2.8.01.01.03.01.05.01 1.03 0 2.01-.57 2.63-1.32z" />
        <text x="28" y="23" fontFamily="-apple-system, BlinkMacSystemFont, Arial, sans-serif" fontWeight="800" fontSize="23" fill="#111827">Apple</text>
      </svg>
    ),
  },
  {
    name: 'NVIDIA',
    url: 'https://www.nvidia.com',
    svg: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 130 36" fill="none">
        <path d="M15 8c-5.5 0-10 4.5-10 10s4.5 10 10 10c4.2 0 7.8-2.6 9.2-6.4h-6c-1 1.8-3 3-5.2 3-3.3 0-6-2.7-6-6s2.7-6 6-6c2.2 0 4.2 1.2 5.2 3h6.5C22.8 10.6 19.2 8 15 8z" fill="#76B900"/>
        <text x="32" y="24" fontFamily="Impact, Arial, sans-serif" fontWeight="900" fontSize="23" letterSpacing="1" fill="#111827">NVIDIA</text>
      </svg>
    ),
  },
  {
    name: 'Oracle',
    url: 'https://www.oracle.com',
    svg: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 120 36" fill="none">
        <rect x="0" y="4" width="120" height="28" rx="14" fill="#C70000"/>
        <text x="60" y="23" fontFamily="'Trebuchet MS', Arial, sans-serif" fontWeight="900" fontSize="17" letterSpacing="3" fill="#FFFFFF" textAnchor="middle">ORACLE</text>
      </svg>
    ),
  },
  {
    name: 'IBM',
    url: 'https://www.ibm.com',
    svg: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 100 40" fill="#0F62FE">
        {/* IBM 8-Bar Logo - Bar 1 (y=1) */}
        <rect x="2" y="1" width="16" height="3" />
        <rect x="22" y="1" width="22" height="3" rx="0.5" />
        <rect x="48" y="1" width="6" height="3" />
        <rect x="74" y="1" width="6" height="3" />

        {/* Bar 2 (y=6) */}
        <rect x="7" y="6" width="6" height="3" />
        <rect x="22" y="6" width="6" height="3" />
        <rect x="40" y="6" width="6" height="3" />
        <rect x="48" y="6" width="6" height="3" />
        <rect x="57" y="6" width="6" height="3" />
        <rect x="74" y="6" width="6" height="3" />

        {/* Bar 3 (y=11) */}
        <rect x="7" y="11" width="6" height="3" />
        <rect x="22" y="11" width="6" height="3" />
        <rect x="42" y="11" width="6" height="3" />
        <rect x="48" y="11" width="6" height="3" />
        <rect x="60" y="11" width="8" height="3" />
        <rect x="74" y="11" width="6" height="3" />

        {/* Bar 4 (y=16) */}
        <rect x="7" y="16" width="6" height="3" />
        <rect x="22" y="16" width="22" height="3" />
        <rect x="48" y="16" width="6" height="3" />
        <rect x="62" y="16" width="4" height="3" />
        <rect x="74" y="16" width="6" height="3" />

        {/* Bar 5 (y=21) */}
        <rect x="7" y="21" width="6" height="3" />
        <rect x="22" y="21" width="6" height="3" />
        <rect x="43" y="21" width="6" height="3" />
        <rect x="48" y="21" width="6" height="3" />
        <rect x="74" y="21" width="6" height="3" />

        {/* Bar 6 (y=26) */}
        <rect x="7" y="26" width="6" height="3" />
        <rect x="22" y="26" width="6" height="3" />
        <rect x="43" y="26" width="6" height="3" />
        <rect x="48" y="26" width="6" height="3" />
        <rect x="74" y="26" width="6" height="3" />

        {/* Bar 7 (y=31) */}
        <rect x="7" y="31" width="6" height="3" />
        <rect x="22" y="31" width="6" height="3" />
        <rect x="42" y="31" width="6" height="3" />
        <rect x="48" y="31" width="6" height="3" />
        <rect x="74" y="31" width="6" height="3" />

        {/* Bar 8 (y=36) */}
        <rect x="2" y="36" width="16" height="3" />
        <rect x="22" y="36" width="24" height="3" rx="0.5" />
        <rect x="48" y="36" width="6" height="3" />
        <rect x="74" y="36" width="6" height="3" />
      </svg>
    ),
  },
  {
    name: 'TCS',
    url: 'https://www.tcs.com',
    svg: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 105 36" fill="none">
        <circle cx="15" cy="18" r="13" fill="#003366"/>
        <path d="M7 13h16M15 13v10" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round"/>
        <text x="36" y="25" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="25" letterSpacing="0.5" fill="#003366">tcs</text>
      </svg>
    ),
  },
  {
    name: 'Infosys',
    url: 'https://www.infosys.com',
    svg: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 110 36" fill="none">
        <text x="0" y="25" fontFamily="Georgia, 'Times New Roman', serif" fontWeight="bold" fontSize="26" letterSpacing="0.5" fill="#007CC3">Infosys</text>
      </svg>
    ),
  },
  {
    name: 'Wipro',
    url: 'https://www.wipro.com',
    svg: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 125 36" fill="none">
        <g transform="translate(14, 18)">
          <circle cx="0" cy="-8" r="3" fill="#34A853"/>
          <circle cx="7" cy="-4.5" r="3" fill="#00BCD4"/>
          <circle cx="8" cy="3.5" r="3" fill="#4285F4"/>
          <circle cx="2" cy="8" r="3" fill="#9C27B0"/>
          <circle cx="-6" cy="5.5" r="3" fill="#E91E63"/>
          <circle cx="-8" cy="-2" r="3" fill="#FF9800"/>
          <circle cx="0" cy="0" r="3.5" fill="#111827"/>
        </g>
        <text x="32" y="25" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="25" letterSpacing="0.5" fill="#111827">wipro</text>
      </svg>
    ),
  },
  {
    name: 'HCLTech',
    url: 'https://www.hcltech.com',
    svg: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 120 36" fill="none">
        <text x="0" y="25" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="25" letterSpacing="0.5" fill="#0055A5">HCLTech</text>
      </svg>
    ),
  },
  {
    name: 'Accenture',
    url: 'https://www.accenture.com',
    svg: (
      <svg className="h-8 md:h-10 w-auto" viewBox="0 0 135 36" fill="none">
        <path d="M0 21l15-5.5L0 10V4.5l24 11L0 26.5v-5.5z" fill="#A100FF"/>
        <text x="30" y="24" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="23" letterSpacing="-0.5" fill="#111827">accenture</text>
      </svg>
    ),
  },
];

const CompanyLogoGroup: React.FC = () => (
  <div className="flex items-center gap-12 md:gap-16 shrink-0">
    {companies.map((company, index) => (
      <a
        key={`${company.name}-${index}`}
        href={company.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center cursor-pointer shrink-0 transition-transform duration-300 hover:scale-110 opacity-90 hover:opacity-100"
        title={`Visit ${company.name} official website`}
      >
        {company.svg}
      </a>
    ))}
  </div>
);

export const CompanyMarquee: React.FC = () => {
  return (
    <section className="py-8 md:py-12 bg-slate-50/70 text-slate-900 relative overflow-hidden border-y border-slate-200/80">
      <div className="max-w-[1160px] mx-auto px-4 md:px-6 relative z-10 text-center space-y-1.5 mb-4 md:mb-5">
        <div className="max-w-3xl mx-auto">
          <AnimatedWords
            text="Build the skills trusted by the world's leading technology companies"
            as="h3"
            className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug justify-center"
            stagger={0.03}
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <AnimatedWords
            text="Learn through real-world projects and prepare for careers in global technology organizations."
            as="p"
            className="text-xs md:text-sm text-slate-600 leading-relaxed justify-center"
            stagger={0.02}
            delay={0.15}
          />
        </div>
      </div>

      {/* Infinite Logo Marquee Track Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative w-full overflow-hidden py-3"
      >
        {/* Soft edge gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-slate-50/90 via-slate-50/70 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-slate-50/90 via-slate-50/70 to-transparent z-20 pointer-events-none" />

        {/* Marquee Track scrolling Right to Left */}
        <div className="animate-marquee flex gap-12 md:gap-16 items-center">
          <CompanyLogoGroup />
          <CompanyLogoGroup />
        </div>
      </motion.div>
    </section>
  );
};
