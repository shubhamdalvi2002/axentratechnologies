import React, { useState } from 'react';
import { DomainTrack, ViewMode } from '../types';
import { Search } from 'lucide-react';
import { getDomainIcon } from '../utils/getDomainIcon';
import { getDomainImage } from '../utils/getDomainImage';
import { motion } from 'motion/react';
import { AnimatedWords } from './AnimatedWords';

interface DomainGridProps {
  domains: DomainTrack[];
  selectedDomainId: string;
  onSelectDomain: (domain: DomainTrack) => void;
  setViewMode: (mode: ViewMode) => void;
  onRequestCustomDomain?: () => void;
  onOpenApply?: (domain?: DomainTrack) => void;
}

export const DomainGrid: React.FC<DomainGridProps> = ({
  domains,
  onSelectDomain,
  onOpenApply,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Software', 'Data', 'Core', 'Design & Cloud'];

  const filteredDomains = domains.filter(d => {
    const matchesCategory = activeCategory === 'All' || d.category === activeCategory;
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedDomains = [...filteredDomains].sort((a, b) => {
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    return 0;
  });

  return (
    <section id="domains" className="py-8 md:py-12 bg-slate-50">
      <div className="max-w-[1160px] mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold text-indigo-600 uppercase tracking-widest mb-2"
          >
            Choose Your Path
          </motion.div>
          <AnimatedWords
            text="Available Internship Domain Tracks"
            as="h2"
            className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2.5 justify-center"
            stagger={0.04}
          />
          <AnimatedWords
            text="Select the domain track you want to enroll in. Gain structured deliverables, automated code evaluations, and verifiable credentials."
            as="p"
            className="text-slate-600 text-sm md:text-base justify-center"
            stagger={0.015}
            delay={0.1}
          />
        </div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 mb-6"
        >
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 bg-white border border-slate-200 rounded-xl w-full md:w-auto shadow-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search domain or tech stack..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 focus:border-indigo-600 rounded-xl text-xs text-slate-900 placeholder-slate-400 outline-none shadow-xs transition-colors"
            />
          </div>
        </motion.div>

        {/* Domain Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedDomains.map((d, index) => {
            return (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.2, ease: 'easeOut' } }}
                  transition={{ duration: 0.35, delay: (index % 8) * 0.04 }}
                  onClick={() => onSelectDomain(d)}
                  className="group relative p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-500/80 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Domain Card Image Banner */}
                    <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3.5 bg-slate-100">
                      <img
                        src={getDomainImage(d.id)}
                        alt={d.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-xs border border-white/80 shadow-xs flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300">
                        {getDomainIcon(d.id, "w-4 h-4 text-indigo-600")}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors mb-1.5 leading-snug">
                      {d.title.replace(/\s+Interns?$/i, '')}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {d.desc}
                    </p>
                  </div>

                  {/* Apply Now Button */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onOpenApply) {
                          onOpenApply(d);
                        } else {
                          onSelectDomain(d);
                        }
                      }}
                      className="w-full py-2 px-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs transition-colors shadow-xs text-center cursor-pointer"
                    >
                      Apply Now
                    </motion.button>
                  </div>
                </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

