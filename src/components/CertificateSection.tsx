import React, { useState } from 'react';
import { CertificateData } from '../types';
import { Search, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { AnimatedWords } from './AnimatedWords';

interface CertificateSectionProps {
  certificates: CertificateData[];
  onVerifyCode?: (code: string) => void;
}

export const CertificateSection: React.FC<CertificateSectionProps> = ({
  certificates,
}) => {
  const [searchCode, setSearchCode] = useState('');
  const [verifiedResult, setVerifiedResult] = useState<CertificateData | null | 'not_found'>(null);

  const handleVerifySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    const found = certificates.find(
      c =>
        c.verificationCode.toLowerCase() === searchCode.trim().toLowerCase() ||
        c.id.toLowerCase() === searchCode.trim().toLowerCase()
    );

    if (found) {
      setVerifiedResult(found);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } else {
      setVerifiedResult('not_found');
    }
  };

  return (
    <section id="certificate" className="py-8 md:py-12 bg-slate-50">
      <div className="max-w-[1160px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2"
          >
            Verifiable Credentials
          </motion.div>
          <AnimatedWords
            text="Finish with proof, not just a PDF."
            as="h2"
            className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-3 justify-center"
            stagger={0.04}
          />
          <AnimatedWords
            text="Every certificate issued by Axentra Technologies is tied to real task completion history and carries a globally unique verification ID."
            as="p"
            className="text-sm text-slate-600 justify-center"
            stagger={0.018}
            delay={0.12}
          />
        </div>

        {/* Verification Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <form onSubmit={handleVerifySearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Certificate ID (e.g. AXT-2026-JFS-0142)"
                value={searchCode}
                onChange={e => setSearchCode(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-600 rounded-xl text-xs text-slate-900 placeholder-slate-400 outline-none shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              Verify
            </button>
          </form>

          {verifiedResult === 'not_found' && (
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
              transition={{ duration: 0.4 }}
              className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs text-center font-medium shadow-xs"
            >
              Certificate code not found. Please check the code and try again.
            </motion.div>
          )}

          {verifiedResult && verifiedResult !== 'not_found' && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-4 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-slate-800 space-y-2 text-left shadow-sm"
            >
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                <CheckCircle className="w-5 h-5 shrink-0" />
                <span>Verified Official Record Found</span>
              </div>
              <div className="text-xs space-y-1 pt-1 text-slate-700 border-t border-emerald-200/80">
                <p><span className="font-semibold">Candidate Name:</span> {verifiedResult.studentName}</p>
                <p><span className="font-semibold">Domain Track:</span> {verifiedResult.domainTitle}</p>
                <p><span className="font-semibold">Verification ID:</span> <code className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">{verifiedResult.verificationCode}</code></p>
                <p><span className="font-semibold">Issue Date:</span> {verifiedResult.issueDate}</p>
                <p><span className="font-semibold">Status:</span> <span className="text-emerald-700 font-bold">Authentic & Verified (ISO 9001:2015)</span></p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
