import React from 'react';
import {
  Code2,
  Database,
  Server,
  Cpu,
  Smartphone,
  Cloud,
  ShieldCheck,
  BarChart2,
  Terminal,
  Globe,
  Layers,
  Box,
  FileCode,
  Layout,
  TestTube2,
  Sparkles,
  Link2,
  Brain,
  Search,
  PenTool,
  Lock,
  Workflow,
  Table,
  CheckCircle2,
} from 'lucide-react';

export interface TechItem {
  name: string;
  icon: React.ReactNode;
  bgClass: string;
  textClass: string;
}

export function getTechLogo(tag: string): TechItem {
  const t = tag.trim().toLowerCase();

  // C / C++
  if (t === 'c' || t === 'c++' || t.includes('cpp')) {
    return {
      name: tag,
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#2563EB" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M10 9C9.5 9.5 9 10.5 9 12C9 13.5 9.5 14.5 10 15" stroke="#2563EB" strokeWidth="2" strokeLinecap="round"/>
          <path d="M14 10V14M12 12H16" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      bgClass: 'bg-blue-50 border-blue-200',
      textClass: 'text-blue-700',
    };
  }

  // Python
  if (t.includes('python')) {
    return {
      name: tag,
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.9 2c-3.1 0-5 .6-5 2.5v1.8h10V4.5c0-1.9-1.9-2.5-5-2.5zM8.5 3.3a.8.8 0 110 1.6.8.8 0 010-1.6zM6.9 7v4.5c0 3.1.6 5 2.5 5h1.8v-2.2H8.5c-1.9 0-2.5-.6-2.5-2.5V7.8h.9zm10.2 0h-.9v4c0 1.9-.6 2.5-2.5 2.5h-2.7V15.8h1.8c1.9 0 2.5-1.9 2.5-5V7zm-5.2 7.5v5c0 1.9 1.9 2.5 5 2.5s5-.6 5-2.5v-1.8H11.9v-3.2zm6.8 5a.8.8 0 110-1.6.8.8 0 010 1.6z" fill="#306998" />
        </svg>
      ),
      bgClass: 'bg-amber-50 border-amber-200',
      textClass: 'text-amber-800',
    };
  }

  // Power BI
  if (t.includes('power bi') || t.includes('dax') || t.includes('bi dashboard')) {
    return {
      name: tag,
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="12" width="4" height="9" rx="1" fill="#F2C811" />
          <rect x="10" y="7" width="4" height="14" rx="1" fill="#F2C811" />
          <rect x="17" y="3" width="4" height="18" rx="1" fill="#F2C811" />
        </svg>
      ),
      bgClass: 'bg-yellow-50 border-yellow-200',
      textClass: 'text-yellow-800',
    };
  }

  // React / React.js
  if (t.includes('react')) {
    return {
      name: tag,
      icon: (
        <svg className="w-3.5 h-3.5 animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="#0284C7" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="#0284C7" />
        </svg>
      ),
      bgClass: 'bg-sky-50 border-sky-200',
      textClass: 'text-sky-800',
    };
  }

  // JavaScript / JS
  if (t.includes('javascript') || t === 'js') {
    return {
      name: tag,
      icon: (
        <span className="w-3.5 h-3.5 rounded bg-yellow-400 text-slate-900 font-extrabold text-[9px] flex items-center justify-center leading-none">
          JS
        </span>
      ),
      bgClass: 'bg-yellow-50 border-yellow-200',
      textClass: 'text-yellow-900',
    };
  }

  // Java
  if (t.includes('java') && !t.includes('javascript')) {
    return {
      name: tag,
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
      bgClass: 'bg-red-50 border-red-200',
      textClass: 'text-red-700',
    };
  }

  // .NET / C#
  if (t.includes('.net') || t.includes('c#') || t.includes('asp.net')) {
    return {
      name: tag,
      icon: (
        <span className="w-3.5 h-3.5 rounded bg-purple-600 text-white font-bold text-[8px] flex items-center justify-center leading-none">
          C#
        </span>
      ),
      bgClass: 'bg-purple-50 border-purple-200',
      textClass: 'text-purple-800',
    };
  }

  // SQL / MySQL / PostgreSQL / Database
  if (t.includes('sql') || t.includes('database') || t.includes('postgres')) {
    return {
      name: tag,
      icon: <Database className="w-3.5 h-3.5 text-teal-600" />,
      bgClass: 'bg-teal-50 border-teal-200',
      textClass: 'text-teal-800',
    };
  }

  // MongoDB
  if (t.includes('mongo')) {
    return {
      name: tag,
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#16A34A">
          <path d="M12 2C11.5 6 7 9 7 14c0 3.3 2.2 6 5 6s5-2.7 5-6c0-5-4.5-8-5-12z" />
        </svg>
      ),
      bgClass: 'bg-emerald-50 border-emerald-200',
      textClass: 'text-emerald-800',
    };
  }

  // Node.js / Express
  if (t.includes('node') || t.includes('express')) {
    return {
      name: tag,
      icon: <Server className="w-3.5 h-3.5 text-emerald-600" />,
      bgClass: 'bg-emerald-50 border-emerald-200',
      textClass: 'text-emerald-800',
    };
  }

  // Figma / UI/UX
  if (t.includes('figma') || t.includes('ui/ux') || t.includes('design')) {
    return {
      name: tag,
      icon: (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="6" r="3" fill="#F24E1E" />
          <circle cx="15" cy="6" r="3" fill="#FF7262" />
          <circle cx="9" cy="12" r="3" fill="#A259FF" />
          <circle cx="15" cy="12" r="3" fill="#1ABCFE" />
          <circle cx="9" cy="18" r="3" fill="#0ACF83" />
        </svg>
      ),
      bgClass: 'bg-rose-50 border-rose-200',
      textClass: 'text-rose-700',
    };
  }

  // AWS / GCP / Cloud
  if (t.includes('aws') || t.includes('gcp') || t.includes('cloud') || t.includes('serverless')) {
    return {
      name: tag,
      icon: <Cloud className="w-3.5 h-3.5 text-orange-600" />,
      bgClass: 'bg-orange-50 border-orange-200',
      textClass: 'text-orange-800',
    };
  }

  // Docker / DevOps / Linux
  if (t.includes('docker') || t.includes('devops') || t.includes('linux') || t.includes('ci/cd')) {
    return {
      name: tag,
      icon: <Box className="w-3.5 h-3.5 text-blue-600" />,
      bgClass: 'bg-blue-50 border-blue-200',
      textClass: 'text-blue-800',
    };
  }

  // Flutter / Mobile / Android / iOS
  if (t.includes('flutter') || t.includes('android') || t.includes('ios') || t.includes('mobile')) {
    return {
      name: tag,
      icon: <Smartphone className="w-3.5 h-3.5 text-violet-600" />,
      bgClass: 'bg-violet-50 border-violet-200',
      textClass: 'text-violet-800',
    };
  }

  // Machine Learning / AI / Data Science
  if (t.includes('ml') || t.includes('ai') || t.includes('learning') || t.includes('pandas') || t.includes('science')) {
    return {
      name: tag,
      icon: <Brain className="w-3.5 h-3.5 text-indigo-600" />,
      bgClass: 'bg-indigo-50 border-indigo-200',
      textClass: 'text-indigo-800',
    };
  }

  // Cyber Security / Hacking
  if (t.includes('security') || t.includes('hacking') || t.includes('testing') || t.includes('owasp')) {
    return {
      name: tag,
      icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />,
      bgClass: 'bg-emerald-50 border-emerald-200',
      textClass: 'text-emerald-800',
    };
  }

  // HTML / CSS / Tailwind
  if (t.includes('html') || t.includes('css') || t.includes('tailwind')) {
    return {
      name: tag,
      icon: <Layout className="w-3.5 h-3.5 text-cyan-600" />,
      bgClass: 'bg-cyan-50 border-cyan-200',
      textClass: 'text-cyan-800',
    };
  }

  // Tableau / Excel / Data
  if (t.includes('tableau') || t.includes('excel') || t.includes('analytics')) {
    return {
      name: tag,
      icon: <Table className="w-3.5 h-3.5 text-indigo-600" />,
      bgClass: 'bg-indigo-50 border-indigo-200',
      textClass: 'text-indigo-800',
    };
  }

  // Default fallback
  return {
    name: tag,
    icon: <Code2 className="w-3.5 h-3.5 text-slate-600" />,
    bgClass: 'bg-slate-100 border-slate-200/80',
    textClass: 'text-slate-700',
  };
}
