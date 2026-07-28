import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CompanyLogo } from './CompanyLogo';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-none pointer-events-none"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

          {/* Logo Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            {/* Animated Brand Mark */}
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl backdrop-blur-md relative">
              <CompanyLogo size="lg" className="scale-110" />
            </div>

            {/* Glowing Loading Line */}
            <div className="w-48 h-1 bg-slate-800/80 rounded-full overflow-hidden relative shadow-inner">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: 'easeInOut',
                }}
                className="w-full h-full bg-gradient-to-r from-transparent via-indigo-500 to-blue-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.8)]"
              />
            </div>

            {/* Status text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-[11px] font-mono text-slate-400 tracking-widest uppercase"
            >
              Axentra Internship Engine v2.4
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
