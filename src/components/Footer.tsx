import React from 'react';
import { ViewMode } from '../types';
import { CompanyLogo } from './CompanyLogo';
import { Mail, Instagram, Linkedin, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  setViewMode: (mode: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ setViewMode }) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white border-t border-slate-200/90 pt-8 pb-6 text-slate-600 relative"
    >
      <div className="max-w-[1160px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          {/* Logo & Sub */}
          <div className="space-y-3.5 max-w-sm">
            <motion.div whileHover={{ scale: 1.03 }} className="cursor-pointer inline-block" onClick={() => setViewMode('landing')}>
              <CompanyLogo size="lg" />
            </motion.div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Real tasks. Real domain tracks. Verified certificates built for serious engineering students.
            </p>

            {/* Pune Office Address */}
            <div className="flex items-start gap-2.5 text-xs text-slate-600 bg-slate-50 border border-slate-200/90 p-2.5 rounded-xl shadow-2xs">
              <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-slate-800 block text-[11px] font-mono uppercase tracking-wider">Pune Office</span>
                <p className="text-xs text-slate-600 leading-snug">
                  Axentra Technologies Pvt. Ltd., Level 4, Panchshil Tech Park, Hinjawadi Phase 1, Pune, Maharashtra 411057
                </p>
              </div>
            </div>
            
            {/* Social & Contact Icons */}
            <div className="flex items-center gap-3 pt-1">
              <motion.a
                href="https://linkedin.com/company/axentratechnologies"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.1, shadow: '0 4px 12px rgba(37, 99, 235, 0.25)' }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 border border-slate-200 text-slate-600 hover:text-blue-600 flex items-center justify-center transition-colors shadow-2xs"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="https://instagram.com/axentratechnologies"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.1, shadow: '0 4px 12px rgba(225, 48, 108, 0.25)' }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-rose-50 border border-slate-200 text-slate-600 hover:text-rose-600 flex items-center justify-center transition-colors shadow-2xs"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="mailto:team.axentratechnologies@gmail.com"
                whileHover={{ y: -3, scale: 1.1, shadow: '0 4px 12px rgba(79, 70, 229, 0.25)' }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-indigo-50 border border-slate-200 text-slate-600 hover:text-indigo-600 flex items-center justify-center transition-colors shadow-2xs"
                title="Email Us"
              >
                <Mail className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Links Column */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-xs">
            <div className="space-y-3">
              <div className="font-mono text-slate-400 uppercase tracking-wider text-[11px]">Platform</div>
              <button onClick={() => setViewMode('landing')} className="block hover:text-indigo-600 transition-colors text-left cursor-pointer">Overview</button>
              <button onClick={() => setViewMode('domains')} className="block hover:text-indigo-600 transition-colors text-left cursor-pointer">Domains Track</button>
              <button onClick={() => setViewMode('about')} className="block hover:text-indigo-600 transition-colors text-left cursor-pointer">About Us</button>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-slate-400 uppercase tracking-wider text-[11px]">Verification</div>
              <button onClick={() => setViewMode('verify_cert')} className="block hover:text-indigo-600 transition-colors text-left cursor-pointer">Verify Certificate</button>
              <a href="#how" className="block hover:text-indigo-600 transition-colors">Process & Policy</a>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-slate-400 uppercase tracking-wider text-[11px]">Contact & Legal</div>
              <a href="mailto:team.axentratechnologies@gmail.com" className="block hover:text-indigo-600 transition-colors">Contact Support</a>
              <a href="#" className="block hover:text-indigo-600 transition-colors">Privacy Policy</a>
              <a href="#" className="block hover:text-indigo-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <span>© 2026 Axentra Technologies Pvt. Ltd. All rights reserved.</span>
          <div className="flex items-center gap-4 text-slate-500">
            <motion.a
              href="https://linkedin.com/company/axentratechnologies"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, color: '#2563EB' }}
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors font-medium"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </motion.a>
            <motion.a
              href="https://instagram.com/axentratechnologies"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, color: '#E1306C' }}
              className="inline-flex items-center gap-1 hover:text-rose-600 transition-colors font-medium"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </motion.a>
            <motion.a
              href="mailto:team.axentratechnologies@gmail.com"
              whileHover={{ y: -2, color: '#4F46E5' }}
              className="inline-flex items-center gap-1 hover:text-indigo-600 transition-colors font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-600" />
              <span>Mail</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

