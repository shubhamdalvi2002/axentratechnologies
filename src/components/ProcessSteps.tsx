import React from 'react';
import techShowcase from '../assets/images/tech_platform_showcase_1784790529834.jpg';
import { motion } from 'motion/react';
import { AnimatedWords } from './AnimatedWords';

export const ProcessSteps: React.FC = () => {
  const steps = [
    {
      num: '1',
      title: 'Pick a Domain Track',
      desc: 'Select from 25+ specialized domains including React, MERN, Python, Cybersecurity, Cloud, and IoT.',
    },
    {
      num: '2',
      title: 'Receive Real Deliverables',
      desc: 'Get structured project tasks with clear engineering criteria and starter specifications.',
    },
    {
      num: '3',
      title: 'Build & Submit Code',
      desc: 'Work through assignments, run automated code reviews, and submit your project work.',
    },
    {
      num: '4',
      title: 'Get Verified Certificate',
      desc: 'Complete your domain track to unlock a QR-authenticated certificate for your resume.',
    },
  ];

  return (
    <section id="how" className="py-8 md:py-12 bg-white border-y border-slate-200">
      <div className="max-w-[1160px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          <div className="lg:col-span-6 space-y-4">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold block"
            >
              Streamlined Process
            </motion.span>
            <AnimatedWords
              text="A structured roadmap built for practical engineering growth."
              as="h2"
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
              stagger={0.04}
            />
            <AnimatedWords
              text="Step away from generic video tutorials. Work on industry-standard project modules, build verified code artifacts, and stand out to hiring managers with cryptographically verifiable track records."
              as="p"
              className="text-sm text-slate-600 leading-relaxed"
              stagger={0.015}
              delay={0.15}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-lg group">
              <img
                src={techShowcase}
                alt="Axentra Platform Interactive Workflow"
                referrerPolicy="no-referrer"
                className="w-full h-[220px] sm:h-[260px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-900/20" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-indigo-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-indigo-700 transition-all shadow-2xs">
                  {step.num}
                </span>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">{step.title}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-9">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


