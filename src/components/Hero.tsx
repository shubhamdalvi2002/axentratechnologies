import React from 'react';
import { ViewMode } from '../types';
import techBanner from '../assets/images/tech_workspace_banner_1784790508797.jpg';
import { motion } from 'motion/react';
import { AnimatedWords } from './AnimatedWords';

interface HeroProps {
  setViewMode: (mode: ViewMode) => void;
}

export const Hero: React.FC<HeroProps> = ({ setViewMode }) => {
  return (
    <section className="relative pt-6 pb-8 md:pt-10 md:pb-12 max-w-[1160px] mx-auto px-4 md:px-6">
      <div className="max-w-3xl mx-auto text-center space-y-4 md:space-y-5">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-xs text-xs font-medium text-slate-700 shadow-2xs"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-800">ISO 9001:2015 Certified</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600">Applications Open for 2026</span>
        </motion.div>

        {/* Heading with word-by-word scroll animation */}
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18] flex flex-wrap justify-center items-center gap-x-2">
          <AnimatedWords text="Internships built on" stagger={0.05} />
          <motion.span
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-indigo-600 relative inline-block mx-1"
          >
            real tasks
            <svg className="absolute -bottom-1 left-0 w-full h-2 text-indigo-300" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
            </svg>
          </motion.span>
          <AnimatedWords text=", not busywork." delay={0.35} stagger={0.05} />
        </div>

        {/* Lead text with word-by-word animation */}
        <div className="max-w-2xl mx-auto">
          <AnimatedWords
            text="Pick your domain track, get structured real-world deliverables, receive automated AI evaluation & verified skill grading, and earn verifiable certificates."
            as="p"
            className="text-base sm:text-lg text-slate-600 leading-relaxed justify-center"
            stagger={0.02}
            delay={0.2}
          />
        </div>
      </div>

      {/* Technology Workspace Image Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 md:mt-6 relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 group"
      >
        <img
          src={techBanner}
          alt="Axentra Technologies Workspace"
          referrerPolicy="no-referrer"
          className="w-full h-[220px] sm:h-[300px] md:h-[350px] object-cover object-top sm:object-center group-hover:scale-102 transition-transform duration-500"
        />
        {/* Subtle gradient overlay to anchor frame smoothly */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
      </motion.div>
    </section>
  );
};



