import React, { useState } from 'react';
import { ViewMode } from '../types';
import { GraduationCap, Menu, X } from 'lucide-react';
import { CompanyLogo } from './CompanyLogo';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  selectedDomainTitle?: string;
  onSelectDomain: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { mode: ViewMode; label: string; icon?: React.ReactNode }[] = [
    { mode: 'landing', label: 'Overview' },
    { mode: 'domains', label: 'Domains' },
    { mode: 'verify_cert', label: 'Certificates', icon: <GraduationCap className="w-4 h-4" /> },
    { mode: 'about', label: 'About Us' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-xs transition-colors duration-300">
      <nav className="max-w-[1160px] mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setViewMode('landing')}
          className="cursor-pointer"
        >
          <CompanyLogo size="md" />
        </motion.div>

        {/* Desktop Nav Links & CTA */}
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-600 font-medium">
          {navItems.map((item) => {
            const isActive = viewMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => setViewMode(item.mode)}
                className={`relative py-1 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isActive ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="navActiveIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}

          <motion.button
            whileHover={{ y: -2, scale: 1.03, boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setViewMode('domains')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer flex items-center gap-1.5 ml-2"
          >
            Apply for Internship
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-white/98 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex flex-col gap-3 text-sm overflow-hidden"
          >
            <button
              onClick={() => { setViewMode('landing'); setMobileMenuOpen(false); }}
              className="text-left py-2 text-slate-600 hover:text-slate-900 border-b border-slate-100"
            >
              Overview
            </button>
            <button
              onClick={() => { setViewMode('domains'); setMobileMenuOpen(false); }}
              className="text-left py-2 text-slate-600 hover:text-slate-900 border-b border-slate-100"
            >
              Domains Track
            </button>
            <button
              onClick={() => { setViewMode('verify_cert'); setMobileMenuOpen(false); }}
              className="text-left py-2 text-slate-600 hover:text-slate-900 border-b border-slate-100"
            >
              Verify Certificates
            </button>
            <button
              onClick={() => { setViewMode('about'); setMobileMenuOpen(false); }}
              className="text-left py-2 text-slate-600 hover:text-slate-900 border-b border-slate-100"
            >
              About Us
            </button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { setViewMode('domains'); setMobileMenuOpen(false); }}
              className="w-full text-center py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs mt-1"
            >
              Apply for Internship
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

