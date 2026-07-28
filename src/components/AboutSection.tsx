import React from 'react';
import { ViewMode } from '../types';
import { CountUp } from './CountUp';
import {
  Building2,
  Award,
  Users,
  Target,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Sparkles,
  Briefcase,
  Compass,
  Zap,
  Code2,
  GraduationCap,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedWords } from './AnimatedWords';

interface AboutSectionProps {
  setViewMode: (mode: ViewMode) => void;
}

const studentTestimonials = [
  {
    name: 'Prathamesh Patil',
    role: 'Full Stack Web Dev Intern',
    college: 'Pune Institute of Computer Technology (PICT, Pune)',
    photo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    quote: 'The practical task simulation at Axentra felt like working at an actual tech company in Pune. The QR-verifiable certificate boosted my resume for campus placements!',
  },
  {
    name: 'Ananya Deshmukh',
    role: 'Data Science & AI Intern',
    college: 'COEP Technological University (COEP, Pune)',
    photo: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?auto=format&fit=crop&w=400&q=80',
    quote: 'I built real ML models and received direct code review feedback from senior industry mentors. Axentra helped me bridge college theory with production-grade engineering.',
  },
  {
    name: 'Tejas Kulkarni',
    role: 'Cloud Computing & DevOps Intern',
    college: 'Veermata Jijabai Technological Institute (VJTI, Mumbai)',
    photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
    quote: 'Deploying dockerized microservices on cloud infrastructure during my virtual internship gave me the exact hands-on confidence required for my tech interviews!',
  },
  {
    name: 'Sayali Gawande',
    role: 'Cybersecurity & Network Security Intern',
    college: 'Vishwakarma Institute of Technology (VIT, Pune)',
    photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80',
    quote: 'Axentra’s structured security tasks helped me master penetration testing and vulnerability auditing. The ISO-certified credential added immense value to my profile.',
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ setViewMode }) => {
  return (
    <div className="py-8 md:py-12 bg-slate-50 min-h-[80vh]">
      <div className="max-w-[1160px] mx-auto px-4 md:px-6 space-y-8 md:space-y-12">
        
        {/* Header / Hero Intro with Student Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold tracking-wide uppercase"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>About Axentra Technologies Pvt. Ltd.</span>
            </motion.div>

            <AnimatedWords
              text="Empowering Next-Gen Tech Talent Through Experiential Learning"
              as="h1"
              className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight"
              stagger={0.04}
            />

            <AnimatedWords
              text="Axentra Technologies Pvt. Ltd. is an ISO 9001:2015 certified, government-recognized organization (DPIIT #startupindia, MSME, MCA Govt. of India). We specialize in crafting real-world virtual internship simulators and domain training tracks for engineering and technology students nationwide."
              as="p"
              className="text-base md:text-lg text-slate-600 leading-relaxed"
              stagger={0.015}
              delay={0.15}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>AICTE Aligned Curriculum</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>QR-Verifiable Credentials</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg group">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80"
                alt="Students collaborating on technology projects"
                referrerPolicy="no-referrer"
                className="w-full h-[340px] md:h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-semibold">Active Cohort</span>
                </div>
                <h4 className="text-lg font-bold">10,480+ Students Building Production Code</h4>
                <p className="text-xs text-slate-300">Hands-on virtual internship tracks across Software Engineering, AI, Cloud, and Data Science.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: '10,480+', label: 'Interns Trained', sub: '200+ Colleges Across India', color: 'text-blue-600' },
            { value: '50+', label: 'Specialized Tracks', sub: 'Web, App, AI, ML & Cloud', color: 'text-indigo-600' },
            { value: '100%', label: 'QR Verification', sub: 'Tamper-Proof Digital ID', color: 'text-emerald-600' },
            { value: 'ISO 9001', label: 'Quality Standard', sub: 'Certified Organization', color: 'text-amber-600' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs text-center space-y-1 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className={`text-3xl md:text-4xl font-black ${stat.color} font-mono`}>
                {stat.value.includes('ISO') ? (
                  stat.value
                ) : (
                  <CountUp value={stat.value} />
                )}
              </div>
              <div className="text-xs md:text-sm font-semibold text-slate-700">{stat.label}</div>
              <div className="text-[11px] text-slate-400">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* SECTION 1: Our Mission */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold"
              >
                <Target className="w-4 h-4" />
                <span>Core Purpose</span>
              </motion.div>

              <AnimatedWords
                text="Our Mission"
                as="h2"
                className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight"
                stagger={0.06}
              />

              <AnimatedWords
                text="Our mission at Axentra Technologies is to eliminate the industry skill gap for engineering students by providing structured, task-driven virtual internship programs. We replace passive video learning with real-world software specifications, git-based submissions, and industry mentor evaluations."
                as="p"
                className="text-sm md:text-base text-slate-600 leading-relaxed"
                stagger={0.015}
                delay={0.12}
              />

              <div className="space-y-3 pt-2">
                {[
                  { icon: <Code2 className="w-4 h-4" />, bg: 'bg-blue-600', title: 'Task-Driven Practical Exposure', desc: 'Interns solve practical engineering problems, build APIs, design databases, and push code to production environments.' },
                  { icon: <Users className="w-4 h-4" />, bg: 'bg-indigo-600', title: 'Line-by-Line Code Review', desc: 'Senior developers evaluate code quality, structure, performance, and best practices to mentor students step-by-step.' },
                  { icon: <Award className="w-4 h-4" />, bg: 'bg-emerald-600', title: 'Verifiable Credentials for Career Success', desc: 'Every graduate receives an official certificate with an online QR validation link that HR managers and recruiters can audit instantly.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.1 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div className={`w-7 h-7 rounded-lg ${item.bg} text-white flex items-center justify-center shrink-0 mt-0.5`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                  alt="Student intern working on software project"
                  referrerPolicy="no-referrer"
                  className="w-full h-[320px] md:h-[360px] object-cover"
                />
                <div className="p-4 bg-slate-900 text-white text-xs space-y-1">
                  <div className="font-bold text-blue-400 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>Real Student Impact</span>
                  </div>
                  <p className="text-slate-300">Empowering engineering candidates with verifiable work experience for top product & IT companies.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* SECTION 2: Our Vision */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-5 order-2 lg:order-1 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                  alt="Tech workshop and students learning"
                  referrerPolicy="no-referrer"
                  className="w-full h-[320px] md:h-[360px] object-cover"
                />
                <div className="p-4 bg-slate-900 text-white text-xs space-y-1">
                  <div className="font-bold text-indigo-400 flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    <span>National Reach</span>
                  </div>
                  <p className="text-slate-300">Connecting students from Tier 1, 2 & 3 colleges with global technology industry standards.</p>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-5">
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold"
              >
                <Compass className="w-4 h-4" />
                <span>Long-Term Horizon</span>
              </motion.div>

              <AnimatedWords
                text="Our Vision"
                as="h2"
                className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight"
                stagger={0.06}
              />

              <AnimatedWords
                text="We envision a future where location or college tier never limits a passionate student's ability to gain high-quality technology work experience. Axentra Technologies aims to be the premier experiential education ecosystem in India, recognized globally by technology companies for producing job-ready graduates."
                as="p"
                className="text-sm md:text-base text-slate-600 leading-relaxed"
                stagger={0.015}
                delay={0.12}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5"
                >
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span>AICTE & Govt Alignment</span>
                  </div>
                  <p className="text-xs text-slate-600">Fulfilling national internship credit mandates with high quality, audited technical curriculum.</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.18 }}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5"
                >
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span>Hiring Network Expansion</span>
                  </div>
                  <p className="text-xs text-slate-600">Connecting top performing interns directly with hiring managers at IT product and service firms.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: Our Approach */}
        <div className="space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wide"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>How We Deliver Value</span>
            </motion.div>
            <AnimatedWords
              text="Our 4-Step Experiential Learning Approach"
              as="h2"
              className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight justify-center"
              stagger={0.04}
            />
            <AnimatedWords
              text="Designed from the ground up to reflect how real engineering teams build, review, and ship software in modern product environments."
              as="p"
              className="text-sm text-slate-600 leading-relaxed justify-center"
              stagger={0.015}
              delay={0.12}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Select Your Domain', desc: 'Choose from over 50+ domain tracks including MERN Stack, Python AI, Cloud DevOps, Cybersecurity, Data Analytics, and Android Development.', bg: 'bg-blue-100 text-blue-600', hover: 'hover:border-blue-400', groupHover: 'group-hover:text-blue-600' },
              { num: '02', title: 'Execute Real Tasks', desc: 'Solve realistic technical task specifications with code repositories, database schemas, and step-by-step project guidelines.', bg: 'bg-indigo-100 text-indigo-600', hover: 'hover:border-indigo-400', groupHover: 'group-hover:text-indigo-600' },
              { num: '03', title: 'Mentor Evaluation', desc: 'Submit your project code for mentor review. Receive constructive code feedback on performance, modularity, and clean architecture.', bg: 'bg-emerald-100 text-emerald-600', hover: 'hover:border-emerald-400', groupHover: 'group-hover:text-emerald-600' },
              { num: '04', title: 'Get Certified', desc: 'Earn an official ISO 9001:2015 certified completion credential with a unique QR verification code for your resume and LinkedIn.', bg: 'bg-amber-100 text-amber-600', hover: 'hover:border-amber-400', groupHover: 'group-hover:text-amber-600' },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className={`p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3 relative ${step.hover} transition-all group`}
              >
                <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center font-black text-base font-mono`}>
                  {step.num}
                </div>
                <h3 className={`font-extrabold text-base text-slate-900 ${step.groupHover} transition-colors`}>
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 4: Student Community & Testimonials */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/70 text-slate-800 text-xs font-semibold uppercase tracking-wide"
            >
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Student Success Stories</span>
            </motion.div>
            <AnimatedWords
              text="Hear From Our Student Interns"
              as="h2"
              className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight justify-center"
              stagger={0.05}
            />
            <AnimatedWords
              text="Thousands of students have accelerated their technical careers with Axentra's virtual internship tracks."
              as="p"
              className="text-sm text-slate-600 justify-center"
              stagger={0.02}
              delay={0.12}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {studentTestimonials.map((student, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between hover:border-blue-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    "{student.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img
                    src={student.photo}
                    alt={student.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-blue-200 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{student.name}</h4>
                    <p className="text-[11px] font-semibold text-blue-600">{student.role}</p>
                    <p className="text-[10px] text-slate-400">{student.college}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Why Axentra Dark Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 md:p-10 rounded-3xl bg-slate-900 text-white space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Enterprise Quality</span>
            </div>
            <AnimatedWords
              text="Why Colleges & Students Choose Axentra Technologies"
              as="h2"
              className="text-2xl md:text-3xl font-extrabold tracking-tight"
              stagger={0.04}
            />
            <p className="text-sm text-slate-300 leading-relaxed">
              Our structured internship platform guarantees zero compromise on quality and authenticity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Real Enterprise Tasks</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Work on authentic task specs created by senior developers from top technology firms.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">ISO & Govt Approved</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                ISO 9001:2015 quality certified, AICTE aligned, MSME & DPIIT registered company credentials.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-white">Instant Verification</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Employers and HR teams can instantly verify candidate certificates via secure online ID search.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black">Ready to Kickstart Your Virtual Internship?</h3>
            <p className="text-sm text-blue-100 max-w-xl">
              Explore our wide variety of industry domain tracks, select your domain, and start solving real tasks today.
            </p>
          </div>

          <button
            onClick={() => setViewMode('domains')}
            className="px-6 py-3.5 rounded-xl bg-white text-blue-700 font-extrabold text-sm hover:bg-blue-50 transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Apply Now</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
