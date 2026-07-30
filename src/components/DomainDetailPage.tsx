import React, { useState } from 'react';
import { DomainTrack, TaskItem, TaskDifficulty } from '../types';
import { getDomainIcon } from '../utils/getDomainIcon';
import { getDomainImage } from '../utils/getDomainImage';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  Send,
  Code2,
  ChevronRight,
  Share2,
  Check,
  Star,
  Users,
  ShieldCheck,
  HelpCircle,
  Sparkles,
  FileText,
  ExternalLink,
  Laptop,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DomainDetailPageProps {
  domain: DomainTrack;
  tasks: TaskItem[];
  onBack: () => void;
  onEnroll: (domain: DomainTrack) => void;
  isEnrolled: boolean;
  onToast: (msg: string) => void;
}

export const DomainDetailPage: React.FC<DomainDetailPageProps> = ({
  domain,
  tasks,
  onBack,
  onEnroll,
  isEnrolled,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'certificate' | 'faqs'>('overview');
  const [selectedDuration, setSelectedDuration] = useState<'4 Weeks' | '6 Weeks' | '3 Months' | '6 Months' | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [submissionCode, setSubmissionCode] = useState('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTasks, setSubmittedTasks] = useState<Record<string, boolean>>({});

  // Filter tasks for this domain
  const domainTasks = tasks.filter((t) => t.domainId === domain.id);

  // Fallback sample tasks if none defined specifically in state
  const displayTasks = domainTasks.length > 0 ? domainTasks : [
    {
      id: `${domain.id}-task-1`,
      domainId: domain.id,
      taskNumber: 'TASK-01',
      title: `Environment Setup & Base Architecture for ${domain.title}`,
      description: `Set up the primary development workspace, initialize required dependencies, and implement the initial project layout following clean architecture principles.`,
      requirements: [
        'Initialize repository and setup project configuration',
        'Implement clean folder structure and design patterns',
        'Write README.md with execution and setup instructions',
      ],
      difficulty: 'Beginner' as TaskDifficulty,
      dueDays: 3,
      status: 'todo' as const,
      points: 100,
    },
    {
      id: `${domain.id}-task-2`,
      domainId: domain.id,
      taskNumber: 'TASK-02',
      title: 'Core Feature Logic & State Implementation',
      description: `Construct the core functionality module, implement business logic pipelines, handle edge cases, and integrate comprehensive error handling.`,
      requirements: [
        'Implement core data models and service methods',
        'Add robust input validation and error handlers',
        'Write unit tests for key logic paths',
      ],
      difficulty: 'Intermediate' as TaskDifficulty,
      dueDays: 5,
      status: 'todo' as const,
      points: 150,
    },
    {
      id: `${domain.id}-task-3`,
      domainId: domain.id,
      taskNumber: 'TASK-03',
      title: 'Database & API Endpoint Integration',
      description: `Connect application services to persistent data stores, design RESTful/GraphQL communication channels, and secure data access endpoints.`,
      requirements: [
        'Design efficient database schema / state flow',
        'Implement CRUD API endpoints with status codes',
        'Secure data inputs and sanitize requests',
      ],
      difficulty: 'Intermediate' as TaskDifficulty,
      dueDays: 6,
      status: 'todo' as const,
      points: 200,
    },
    {
      id: `${domain.id}-task-4`,
      domainId: domain.id,
      taskNumber: 'TASK-04',
      title: 'Testing, Code Optimization & Performance Audit',
      description: `Conduct performance benchmarking, eliminate bottlenecks, write automated tests, and ensure full cross-platform responsiveness.`,
      requirements: [
        'Optimize memory usage and execution latency',
        'Achieve >85% code coverage with unit/integration tests',
        'Audit code quality against industry standards',
      ],
      difficulty: 'Advanced' as TaskDifficulty,
      dueDays: 5,
      status: 'todo' as const,
      points: 250,
    },
    {
      id: `${domain.id}-task-5`,
      domainId: domain.id,
      taskNumber: 'TASK-05',
      title: 'Final Production Deployment & Documentation',
      description: `Package the final application for production deployment, generate build artifacts, deploy to cloud hosting, and finalize submission documentation.`,
      requirements: [
        'Build production bundle and resolve runtime warnings',
        'Deploy application to cloud runtime environment',
        'Submit demo video / live hosted URL link',
      ],
      difficulty: 'Advanced' as TaskDifficulty,
      dueDays: 4,
      status: 'todo' as const,
      points: 300,
    },
  ];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    onToast('Track link copied to clipboard!');
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionCode.trim()) {
      onToast('Please enter your submission link or code repo before submitting.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      if (selectedTask) {
        setSubmittedTasks((prev) => ({ ...prev, [selectedTask.id]: true }));
      }
      setIsSubmitting(false);
      setSelectedTask(null);
      setSubmissionCode('');
      setSubmissionNotes('');
      onToast('Task submitted successfully! Our automated evaluator and mentor team will review it.');
    }, 1000);
  };

  const getDifficultyColor = (diff: TaskDifficulty) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Advanced':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  // Helper to dynamically resolve domain technologies and tools
  const getDomainTechDetails = (d: DomainTrack) => {
    const id = d.id;
    const tags = d.tags || [];

    let coreTech = tags;
    let devTools = ['Git & GitHub', 'VS Code', 'Postman API Client'];
    let keyConcepts = ['Clean Architecture & Code Standards', 'Version Control Workflows', 'Debugging & Optimization'];

    if (id.includes('react') || id.includes('frontend')) {
      coreTech = ['React.js', 'JavaScript (ES6+)', 'TypeScript', 'HTML5 & CSS3', 'Tailwind CSS', 'Redux / Zustand'];
      devTools = ['VS Code', 'Git & GitHub', 'Vite / Webpack', 'Chrome DevTools', 'Postman'];
      keyConcepts = ['Component Architecture', 'Custom React Hooks', 'State Management', 'REST API Integration', 'Responsive UI/UX'];
    } else if (id.includes('mern') || id.includes('fullstack')) {
      coreTech = ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript / TypeScript', 'Tailwind CSS'];
      devTools = ['VS Code', 'Git & GitHub', 'Postman / Bruno', 'MongoDB Compass', 'Docker'];
      keyConcepts = ['Full Stack MERN Architecture', 'RESTful API Routing', 'JWT Authentication & Security', 'Database CRUD & Indexing'];
    } else if (id.includes('dotnet')) {
      coreTech = ['C# .NET 8', 'ASP.NET Core', 'Entity Framework Core', 'SQL Server', 'LINQ & Razor'];
      devTools = ['Visual Studio / Rider', 'Git & GitHub', 'SSMS', 'Postman', 'NuGet Manager'];
      keyConcepts = ['Enterprise MVC Architecture', 'Object-Oriented Design', 'ORMs & Database Migrations', 'Secure Web APIs'];
    } else if (id.includes('figma')) {
      coreTech = ['Figma', 'UI/UX Design Systems', 'Auto Layout 5.0', 'Interactive Prototyping', 'HTML/CSS Handoff'];
      devTools = ['Figma Desktop App', 'FigJam', 'Figma Tokens & Plugins', 'Zeplin / Dev Mode'];
      keyConcepts = ['Responsive Wireframing', 'Design Component Libraries', 'Micro-Interactions', 'Developer Design Handoff'];
    } else if (id.includes('backend')) {
      coreTech = ['Node.js', 'Express.js', 'PostgreSQL / MongoDB', 'TypeScript', 'RESTful & GraphQL APIs'];
      devTools = ['VS Code', 'Postman / Insomnia', 'Docker', 'DBeaver / DataGrip', 'Git & GitHub'];
      keyConcepts = ['API Middleware & Authentication', 'Database Schema Normalization', 'Error Handling & Logging', 'Microservices'];
    } else if (id.includes('java')) {
      coreTech = ['Java 17+', 'Spring Boot', 'Hibernate / JPA', 'Maven / Gradle', 'MySQL / PostgreSQL'];
      devTools = ['IntelliJ IDEA / Eclipse', 'Git & GitHub', 'Postman', 'MySQL Workbench', 'Docker'];
      keyConcepts = ['Object-Oriented Programming (OOP)', 'Collections & Multithreading', 'RESTful Web Services', 'Unit Testing (JUnit)'];
    } else if (id.includes('python')) {
      coreTech = ['Python 3.11+', 'FastAPI / Flask', 'Pandas & NumPy', 'SQLAlchemy', 'PyTest'];
      devTools = ['PyCharm / VS Code', 'Jupyter Notebooks', 'Git & GitHub', 'Postman', 'Virtualenv'];
      keyConcepts = ['Data Structures & Scripting', 'API Backend Development', 'Automation & Web Scraping', 'Clean Code Patterns'];
    } else if (id.includes('data') || id.includes('sql')) {
      coreTech = ['SQL (MySQL / PostgreSQL)', 'Python / R', 'Power BI / Tableau', 'Pandas & NumPy', 'Excel / Google Sheets'];
      devTools = ['Jupyter Notebooks', 'DBeaver / SSMS', 'Power BI Desktop', 'Git & GitHub', 'Google Colab'];
      keyConcepts = ['Data Cleansing & Wrangling', 'Complex SQL Joins & CTEs', 'Executive Dashboarding', 'Statistical Analysis'];
    } else if (id.includes('app') || id.includes('flutter') || id.includes('android')) {
      coreTech = ['Flutter / Dart', 'React Native', 'Kotlin / Swift', 'Firebase', 'REST APIs'];
      devTools = ['Android Studio / VS Code', 'Xcode', 'Git & GitHub', 'Postman', 'Mobile Emulators'];
      keyConcepts = ['Mobile UI State Management', 'Cross-Platform Layouts', 'Native Device APIs', 'App Store Publishing Prep'];
    } else if (id.includes('c-cpp') || id.includes('embedded')) {
      coreTech = ['C Language', 'C++17/20', 'Pointers & Memory Allocation', 'STL Containers', 'Microcontrollers'];
      devTools = ['GCC / Clang Compilers', 'VS Code / CLion', 'GDB Debugger', 'Git & GitHub', 'Arduino / ESP32 IDE'];
      keyConcepts = ['Low-Level Memory Management', 'Object-Oriented C++', 'Data Structures & Algorithms', 'Embedded Firmware Basics'];
    }

    return { coreTech, devTools, keyConcepts };
  };

  const domainTech = getDomainTechDetails(domain);

  // Helper to resolve icon & style for primary technology badges
  const getTechBadgeDetails = (tech: string) => {
    const lower = tech.toLowerCase();
    let icon = <Code2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
    let badgeColor = 'bg-indigo-50/90 text-indigo-950 border-indigo-200/80';

    if (lower.includes('react')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="9" ry="4" stroke="#0284C7" strokeWidth="1.8"/>
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)" stroke="#0284C7" strokeWidth="1.8"/>
          <ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)" stroke="#0284C7" strokeWidth="1.8"/>
          <circle cx="12" cy="12" r="2" fill="#0284C7"/>
        </svg>
      );
      badgeColor = 'bg-sky-50/90 text-sky-950 border-sky-200/80';
    } else if (lower.includes('javascript') || lower.includes('js')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 rounded-xs" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
          <path d="M6.5 18.5l2-1.2c.4.7.8 1.3 1.6 1.3.8 0 1.3-.3 1.3-1 0-.7-.5-1-1.6-1.5l-.6-.3c-1.7-.7-2.8-1.6-2.8-3.4 0-1.9 1.5-3.3 3.8-3.3 1.7 0 2.9.6 3.6 2l-1.9 1.2c-.4-.7-.9-1-1.7-1-.7 0-1.2.4-1.2.9 0 .6.4.9 1.5 1.4l.6.3c2 1 3 1.8 3 3.6 0 2.1-1.6 3.5-4.2 3.5-2.4-.1-3.8-1.2-4.5-2.5z" fill="#000"/>
        </svg>
      );
      badgeColor = 'bg-amber-50/90 text-amber-950 border-amber-200/80';
    } else if (lower.includes('typescript') || lower.includes('ts')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 rounded-xs" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="3" fill="#3178C6"/>
          <path d="M11.5 10H7v2.2h1.8V19h2.6v-6.8H13.2V10h-1.7zm3.1 8.8c1.3 0 2.3-.3 3-.9.7-.6 1-1.4 1-2.4 0-.8-.2-1.4-.7-1.8-.5-.4-1.3-.8-2.4-1.1l-.8-.2c-.6-.2-.9-.4-1.2-.6-.2-.2-.3-.5-.3-.8 0-.3.1-.6.4-.8.3-.2.8-.3 1.4-.3.6 0 1.1.1 1.6.4.5.3.8.7 1 1.2l2.1-1c-.4-.9-1-1.6-1.8-2-.8-.5-1.8-.7-2.9-.7-1.3 0-2.3.3-3 .9-.7.6-1 1.4-1 2.3 0 .7.2 1.3.7 1.8.5.4 1.3.8 2.3 1.1l.8.2c.6.2 1 .4 1.2.6.2.2.3.5.3.8 0 .4-.2.7-.5.9-.3.2-.9.3-1.6.3-.7 0-1.4-.2-2-.5-.6-.4-1-.9-1.2-1.6l-2.1.9c.4 1.2 1.1 2.1 2 2.7.9.6 2.1.9 3.5.9z" fill="#FFF"/>
        </svg>
      );
      badgeColor = 'bg-blue-50/90 text-blue-950 border-blue-200/80';
    } else if (lower.includes('html') || lower.includes('css')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 fill-[#E34F26]" viewBox="0 0 24 24">
          <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.236-2.659H5.414l.7 8.033h8.909l-.375 4.189-2.678.727-2.675-.729-.172-1.921H6.6l.329 3.737 5.041 1.402 5.044-1.4 1.206-13.407H8.531z"/>
        </svg>
      );
      badgeColor = 'bg-orange-50/90 text-orange-950 border-orange-200/80';
    } else if (lower.includes('tailwind')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 fill-[#06B6D4]" viewBox="0 0 24 24">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      );
      badgeColor = 'bg-cyan-50/90 text-cyan-950 border-cyan-200/80';
    } else if (lower.includes('node')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 fill-[#339933]" viewBox="0 0 24 24">
          <path d="M12 2.5a.75.75 0 0 0-.375.1l-8 4.625A.75.75 0 0 0 3.25 7.8v9.25a.75.75 0 0 0 .375.65l8 4.625a.75.75 0 0 0 .75 0l8-4.625a.75.75 0 0 0 .375-.65V7.8a.75.75 0 0 0-.375-.65l-8-4.625A.75.75 0 0 0 12 2.5z"/>
        </svg>
      );
      badgeColor = 'bg-emerald-50/90 text-emerald-950 border-emerald-200/80';
    } else if (lower.includes('express')) {
      icon = (
        <span className="text-[10px] font-black text-slate-900 font-mono tracking-tighter">EX</span>
      );
      badgeColor = 'bg-slate-100/90 text-slate-900 border-slate-300';
    } else if (lower.includes('mongo')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 fill-[#47A248]" viewBox="0 0 24 24">
          <path d="M12 0s-3.5 6.5-3.5 11c0 3 1.5 5.5 3.5 7 2-1.5 3.5-4 3.5-7C15.5 6.5 12 0 12 0z"/>
        </svg>
      );
      badgeColor = 'bg-emerald-50/90 text-emerald-950 border-emerald-200/80';
    } else if (lower.includes('java')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 fill-[#E76F00]" viewBox="0 0 24 24">
          <path d="M4.88 18.23c0 0-1.12.56-1.5.83-.38.27-.45.42-.45.62 0 .38.64.65 1.5.65 1.09 0 2.25-.45 3.08-.87 1.09-.56 2.06-1.28 3.19-1.28 1.12 0 2.06.72 3.19 1.28.83.42 1.99.87 3.08.87.86 0 1.5-.27 1.5-.65 0-.2-.07-.35-.45-.62-.38-.27-1.5-.83-1.5-.83"/>
          <path d="M11.5 2C10.2 4.1 8 6 8 8.5c0 2.2 1.8 4 4 4s4-1.8 4-4c0-2.5-2.2-4.4-3.5-6.5z"/>
        </svg>
      );
      badgeColor = 'bg-orange-50/90 text-orange-950 border-orange-200/80';
    } else if (lower.includes('spring')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 fill-[#6DB33F]" viewBox="0 0 24 24">
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
        </svg>
      );
      badgeColor = 'bg-green-50/90 text-green-950 border-green-200/80';
    } else if (lower.includes('python')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 fill-[#3776AB]" viewBox="0 0 24 24">
          <path d="M11.87 0c-5.7 0-5.32 2.47-5.32 2.47l.01 2.56h5.39v.77H4.21S0 5.29 0 11.02c0 5.73 3.68 5.53 3.68 5.53h2.2v-3.08s-.12-3.68 3.62-3.68h6.24s3.47.05 3.47-3.36V3.36S19.78 0 11.87 0z"/>
        </svg>
      );
      badgeColor = 'bg-sky-50/90 text-sky-950 border-sky-200/80';
    } else if (lower.includes('c#') || lower.includes('.net') || lower.includes('asp')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 fill-[#512BD4]" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 19a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"/>
        </svg>
      );
      badgeColor = 'bg-purple-50/90 text-purple-950 border-purple-200/80';
    } else if (lower.includes('c++') || lower.includes('c language')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 fill-[#00599C]" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
        </svg>
      );
      badgeColor = 'bg-indigo-50/90 text-indigo-950 border-indigo-200/80';
    } else if (lower.includes('sql') || lower.includes('postgres') || lower.includes('mysql')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 fill-[#336791]" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 3c4.42 0 8 1.34 8 3s-3.58 3-8 3-8-1.34-8-3 3.58-3 8-3zm0 14c-4.42 0-8-1.34-8-3v-2.1c1.88 1.23 4.8 1.9 8 1.9s6.12-.67 8-1.9V16c0 1.66-3.58 3-8 3z"/>
        </svg>
      );
      badgeColor = 'bg-blue-50/90 text-blue-950 border-blue-200/80';
    } else if (lower.includes('flutter') || lower.includes('dart')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 fill-[#02569B]" viewBox="0 0 24 24">
          <path d="M14.3 2.3L5.7 10.9l4.3 4.3 8.6-8.6h-4.3zm-8.6 13l4.3 4.3 8.6-8.6h-4.3L5.7 15.3z"/>
        </svg>
      );
      badgeColor = 'bg-sky-50/90 text-sky-950 border-sky-200/80';
    } else if (lower.includes('figma')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M8 24a4 4 0 01-4-4 4 4 0 014-4h4v4a4 4 0 01-4 4z" fill="#0ACF83"/>
          <path d="M4 12a4 4 0 014-4h4v8H8a4 4 0 01-4-4z" fill="#A259FF"/>
          <path d="M4 4a4 4 0 014-4h4v8H8a4 4 0 01-4-4z" fill="#F24E1E"/>
          <path d="M12 0h4a4 4 0 014 4 4 4 0 01-4 4h-4V0z" fill="#FF7262"/>
          <path d="M20 12a4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4 4 4 0 014 4z" fill="#1ABCFE"/>
        </svg>
      );
      badgeColor = 'bg-purple-50/90 text-purple-950 border-purple-200/80';
    } else if (lower.includes('redux') || lower.includes('zustand')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 fill-[#764ABC]" viewBox="0 0 24 24">
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
        </svg>
      );
      badgeColor = 'bg-purple-50/90 text-purple-950 border-purple-200/80';
    } else if (lower.includes('firebase')) {
      icon = (
        <svg className="w-3.5 h-3.5 shrink-0 fill-[#FFCA28]" viewBox="0 0 24 24">
          <path d="M3.89 15.672L6.255.49a.44.44 0 0 1 .825-.137l2.845 5.372L3.89 15.672zm16.59-3.232l-2.227-11.9a.44.44 0 0 0-.814-.146L1.134 18.012l8.835 4.966a1.32 1.32 0 0 0 1.28 0l9.231-5.188-2.022-5.352z"/>
        </svg>
      );
      badgeColor = 'bg-amber-50/90 text-amber-950 border-amber-200/80';
    }

    return { icon, badgeColor };
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12 pt-2 md:pt-4">
      {/* Top Banner Navigation & Header Area */}
      <div className="max-w-[1160px] mx-auto px-4 md:px-6 space-y-3">
        
        {/* Main Header Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs relative">
          {/* Header Banner */}
          <div className="relative h-32 sm:h-40 md:h-48 w-full bg-slate-900 overflow-hidden">
            <img
              src={getDomainImage(domain.id)}
              alt={domain.title}
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20" />
            
            {/* Top Navigation Row overlay inside banner */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <button
                onClick={onBack}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white transition-all text-xs font-semibold cursor-pointer group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                <span>Back to All Tracks</span>
              </button>
            </div>

            {/* Title & Icon Overlay */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/95 backdrop-blur-md border border-white/80 flex items-center justify-center text-slate-900 shadow-md shrink-0">
                  {getDomainIcon(domain.id, 'w-5 h-5 text-indigo-600')}
                </div>
                <div>
                  <h1 className="text-base sm:text-lg md:text-xl font-extrabold text-white leading-tight">
                    {domain.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-header info bar */}
          <div className="p-3 sm:p-4 space-y-2.5">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {domain.longDesc || domain.desc}
            </p>

            {/* Skills Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-500 mr-1">Skills:</span>
              {domain.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Overview & Apply', icon: BookOpen },
            { id: 'tasks', label: 'Curriculum & Tasks', icon: Code2 },
            { id: 'certificate', label: 'Certificate & Benefits', icon: Award },
            { id: 'faqs', label: 'FAQs', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3 md:space-y-4"
          >
            {/* Internship Duration Selection Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Select Internship Duration & Apply</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Select your desired duration for {domain.title}. Includes official certification & project evaluation.
                  </p>
                </div>
                {selectedDuration && (
                  <span className="self-start md:self-auto text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Selected: {selectedDuration}
                  </span>
                )}
              </div>

              {/* Duration Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    id: '4-weeks',
                    duration: '4 Weeks',
                    badge: '1 Month Internship',
                    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
                    desc: 'Fast-paced intensive program. Ideal for quick hands-on project experience.',
                    deliverables: '3 Projects + ISO Cert',
                    paymentUrl: 'https://forms.gle/aJddkF33gm9GzMrq5',
                  },
                  {
                    id: '6-weeks',
                    duration: '6 Weeks',
                    badge: '1.5 Month Internship',
                    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    desc: 'Standard academic credit duration matching university requirements.',
                    deliverables: '4 Projects + Scorecard',
                    paymentUrl: 'https://forms.gle/oxM8H4yo7qefGiQc6',
                  },
                  {
                    id: '3-months',
                    duration: '3 Months',
                    badge: '3 Month Internship',
                    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
                    desc: 'Deep-dive domain mastery. Build complex full-stack applications.',
                    deliverables: '5 Capstone Projects',
                    paymentUrl: 'https://forms.gle/P9yC95ZYWkA9zVVE6',
                  },
                  {
                    id: '6-months',
                    duration: '6 Months',
                    badge: '6 Month Internship',
                    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
                    desc: 'Production experience, LOR & Placement Assistance.',
                    deliverables: 'Advanced Architecture + LOR',
                    paymentUrl: 'https://forms.gle/e5b45ed3dzF1FpCHA',
                  },
                ].map((plan) => {
                  const isSelected = selectedDuration === plan.duration;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedDuration(plan.duration as any)}
                      className={`p-3 rounded-xl border transition-all duration-300 ease-in-out cursor-pointer flex flex-col justify-between space-y-2.5 relative overflow-hidden hover:-translate-y-1 hover:shadow-md hover:border-blue-300 ${
                        isSelected
                          ? 'bg-blue-50/50 border-blue-500 ring-2 ring-blue-500/20 shadow-md -translate-y-0.5'
                          : 'bg-white border-slate-200 shadow-2xs'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 right-0 bg-blue-600 text-white p-1 rounded-bl-lg shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className={`px-2 py-0.5 rounded-md border text-[10px] font-semibold ${plan.badgeBg}`}>
                            {plan.badge}
                          </span>
                        </div>

                        <div className="text-sm font-bold text-slate-900">
                          {plan.duration} Internship
                        </div>

                        <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                          {plan.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100/80 space-y-2">
                        <div className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-blue-600 shrink-0" />
                          <span>{plan.deliverables}</span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDuration(plan.duration as any);
                            onEnroll(domain);
                            onToast(`Redirecting to registration for ${plan.duration} ${domain.title} Internship...`);
                            window.open(plan.paymentUrl, '_blank', 'noopener,noreferrer');
                          }}
                          className="w-full py-1.5 px-2.5 rounded-lg font-semibold text-xs transition-all duration-300 ease-in-out flex items-center justify-center gap-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                        >
                          <span>{isSelected ? `Apply for ${plan.duration}` : `Apply (${plan.duration})`}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

              {/* Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-2">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Flexible Duration</div>
                  <div className="text-[11px] text-slate-500">4 Weeks • Self-Paced Learning</div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">ISO 9001 Accredited</div>
                  <div className="text-[11px] text-slate-500">QR Verified Digital Certificate</div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-2">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">Mentor Guidance</div>
                  <div className="text-[11px] text-slate-500">Code Reviews & Constructive Feedback</div>
                </div>
              </div>

              {/* Technologies & Tools Covered */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-blue-600" />
                      <span>Technologies & Tech Stack Covered</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tools, frameworks, and technologies you will gain hands-on practical experience with in this internship.
                    </p>
                  </div>
                </div>

                {/* Tech Badges Grid */}
                <div className="space-y-4">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-500 mb-2">
                      Primary Technologies & Frameworks:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {domainTech.coreTech.map((tech) => {
                        const { icon, badgeColor } = getTechBadgeDetails(tech);
                        return (
                          <span
                            key={tech}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-2xs transition-colors ${badgeColor}`}
                          >
                            {icon}
                            <span>{tech}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono mb-2 flex items-center gap-1">
                        <Laptop className="w-3.5 h-3.5 text-slate-600" />
                        <span>Recommended IDEs & Tools:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {domainTech.devTools.map((tool) => {
                          const lower = tool.toLowerCase();
                          let icon = <Laptop className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
                          let badgeColor = 'bg-slate-100/90 text-slate-800 border-slate-200/90';

                          if (lower.includes('vs code') || lower.includes('vscode')) {
                            icon = (
                              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
                                <path d="M17.5 2.5L22 6v12l-4.5 3.5L3 13.5l14.5-11z" fill="#007ACC"/>
                                <path d="M17.5 2.5L7.5 10.5 17.5 18.5V2.5z" fill="#0066B8"/>
                                <path d="M3 13.5l4.5 3.5 10-8.5L3 13.5z" fill="#1F9CF0"/>
                              </svg>
                            );
                            badgeColor = 'bg-blue-50/90 text-blue-900 border-blue-200/80';
                          } else if (lower.includes('git')) {
                            icon = (
                              <svg className="w-3.5 h-3.5 shrink-0 fill-slate-900" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                              </svg>
                            );
                            badgeColor = 'bg-slate-100 text-slate-900 border-slate-300';
                          } else if (lower.includes('postman') || lower.includes('insomnia') || lower.includes('bruno')) {
                            icon = (
                              <svg className="w-3.5 h-3.5 shrink-0 fill-[#FF6C37]" viewBox="0 0 24 24">
                                <path d="M13.5 2L3 13.5h7.5L9 22l12-11.5h-7.5L13.5 2z"/>
                              </svg>
                            );
                            badgeColor = 'bg-orange-50/90 text-orange-900 border-orange-200/80';
                          } else if (lower.includes('docker')) {
                            icon = (
                              <svg className="w-3.5 h-3.5 shrink-0 fill-[#2496ED]" viewBox="0 0 24 24">
                                <path d="M13.98 11.08h2.12v2.12h-2.12v-2.12zm-3.18 0h2.12v2.12h-2.12v-2.12zm-3.18 0h2.12v2.12H7.62v-2.12zm9.54-3.18h2.12v2.12h-2.12V7.9zm-3.18 0h2.12v2.12h-2.12V7.9zm-3.18 0h2.12v2.12h-2.12V7.9zm-3.18 0h2.12v2.12H7.62V7.9zm6.36-3.18h2.12v2.12h-2.12V4.72zm-3.18 0h2.12v2.12h-2.12V4.72zm11.38 8.48c-.37-.26-1.15-.38-1.83-.28-.21-.52-.59-1.2-1.22-1.57l-.37-.21-.24.35c-.47.69-.64 1.61-.51 2.44-.33.15-.75.24-1.22.24H.75v1.06c0 2.28.84 4.14 2.37 5.23 1.57 1.12 3.75 1.48 6.01 1.48 4.7 0 8.58-1.84 10.32-5.06.84-.03 1.84-.42 2.45-1.12.33-.38.45-.82.35-1.14-.07-.22-.27-.38-.52-.45z"/>
                              </svg>
                            );
                            badgeColor = 'bg-sky-50/90 text-sky-900 border-sky-200/80';
                          } else if (lower.includes('figma') || lower.includes('figjam') || lower.includes('zeplin')) {
                            icon = (
                              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
                                <path d="M8 24a4 4 0 01-4-4 4 4 0 014-4h4v4a4 4 0 01-4 4z" fill="#0ACF83"/>
                                <path d="M4 12a4 4 0 014-4h4v8H8a4 4 0 01-4-4z" fill="#A259FF"/>
                                <path d="M4 4a4 4 0 014-4h4v8H8a4 4 0 01-4-4z" fill="#F24E1E"/>
                                <path d="M12 0h4a4 4 0 014 4 4 4 0 01-4 4h-4V0z" fill="#FF7262"/>
                                <path d="M20 12a4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4 4 4 0 014 4z" fill="#1ABCFE"/>
                              </svg>
                            );
                            badgeColor = 'bg-purple-50/90 text-purple-900 border-purple-200/80';
                          } else if (lower.includes('intellij') || lower.includes('pycharm') || lower.includes('clion') || lower.includes('visual studio') || lower.includes('rider')) {
                            icon = (
                              <svg className="w-3.5 h-3.5 shrink-0 fill-[#087CFA]" viewBox="0 0 24 24">
                                <path d="M5 16h6v2H5v-2zm0-8h14v2H5V8zm0 4h10v2H5v-2z"/>
                              </svg>
                            );
                            badgeColor = 'bg-indigo-50/90 text-indigo-900 border-indigo-200/80';
                          } else if (lower.includes('android')) {
                            icon = (
                              <svg className="w-3.5 h-3.5 shrink-0 fill-[#3DDC84]" viewBox="0 0 24 24">
                                <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997 0-.5507.4482-.9993.9993-.9993.5511 0 .9993.4486.9993.9993 0 .5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997 0-.5507.4482-.9993.9993-.9993.5511 0 .9993.4486.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 0 0-.1521-.5676.416.416 0 0 0-.5676.1521l-2.0223 3.503C15.5902 8.2238 13.8533 7.8 12 7.8s-3.5902.4238-5.1368 1.1504L4.841 5.4474a.416.416 0 0 0-.5676-.1521.416.416 0 0 0-.1521.5676l1.9973 3.4592C2.6889 11.2867.348 14.819 0 19h24c-.348-4.181-2.6889-7.7133-6.1185-9.6786"/>
                              </svg>
                            );
                            badgeColor = 'bg-emerald-50/90 text-emerald-900 border-emerald-200/80';
                          } else if (lower.includes('xcode')) {
                            icon = (
                              <svg className="w-3.5 h-3.5 shrink-0 fill-[#147CE5]" viewBox="0 0 24 24">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.09c.68-.82 1.13-1.96.98-3.09-1 .04-2.18.67-2.88 1.48-.63.73-1.18 1.9-.1 3.03 1.12.08 2.25-.59 2.0-1.42z"/>
                              </svg>
                            );
                            badgeColor = 'bg-blue-50/90 text-blue-900 border-blue-200/80';
                          } else if (lower.includes('jupyter') || lower.includes('colab')) {
                            icon = (
                              <svg className="w-3.5 h-3.5 shrink-0 fill-[#F37626]" viewBox="0 0 24 24">
                                <path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                              </svg>
                            );
                            badgeColor = 'bg-amber-50/90 text-amber-900 border-amber-200/80';
                          } else if (lower.includes('mongodb') || lower.includes('compass')) {
                            icon = (
                              <svg className="w-3.5 h-3.5 shrink-0 fill-[#47A248]" viewBox="0 0 24 24">
                                <path d="M12 0s-3.5 6.5-3.5 11c0 3 1.5 5.5 3.5 7 2-1.5 3.5-4 3.5-7C15.5 6.5 12 0 12 0z"/>
                              </svg>
                            );
                            badgeColor = 'bg-emerald-50/90 text-emerald-900 border-emerald-200/80';
                          }

                          return (
                            <span
                              key={tool}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-2xs transition-colors ${badgeColor}`}
                            >
                              {icon}
                              <span>{tool}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono mb-2 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Core Engineering Concepts:</span>
                      </div>
                      <ul className="space-y-1">
                        {domainTech.keyConcepts.map((concept, cIdx) => (
                          <li key={cIdx} className="text-xs text-slate-600 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span>{concept}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* What you will build / learn */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-mono">
                  What You Will Achieve in {domain.title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Build production-grade practical projects for your GitHub portfolio.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Understand industry architecture standards and best practices.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Receive direct code evaluation and scoring on each task submission.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Earn a tamper-proof ISO certified certificate shareable on LinkedIn.</span>
                  </div>
                </div>
              </div>

              {/* Internship Workflow Steps */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider font-mono">
                  4-Step Internship Journey
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-mono text-indigo-600 font-bold text-xs">01. Enroll</span>
                    <div className="font-bold text-slate-800">Select Track</div>
                    <div className="text-slate-500 text-[11px]">Instant access to task details & starter specifications.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-mono text-indigo-600 font-bold text-xs">02. Build</span>
                    <div className="font-bold text-slate-800">Complete Tasks</div>
                    <div className="text-slate-500 text-[11px]">Develop code on your local system or GitHub repository.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-mono text-indigo-600 font-bold text-xs">03. Submit</span>
                    <div className="font-bold text-slate-800">Upload Work</div>
                    <div className="text-slate-500 text-[11px]">Submit GitHub link or code snippet for evaluation.</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-mono text-indigo-600 font-bold text-xs">04. Certified</span>
                    <div className="font-bold text-slate-800">Get Certificate</div>
                    <div className="text-slate-500 text-[11px]">Receive ISO 9001 verified certificate with QR code.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Curriculum & Tasks */}
          {activeTab === 'tasks' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Domain Tasks & Curriculum</h3>
                  <p className="text-xs text-slate-500">Complete tasks in sequence to earn your track completion certificate.</p>
                </div>
                <span className="text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
                  Practical Deliverables
                </span>
              </div>

              <div className="space-y-3.5">
                {displayTasks.map((task, idx) => {
                  const isSubmitted = submittedTasks[task.id];
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 transition-all shadow-2xs space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono text-xs font-bold">
                            {task.taskNumber}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-md border text-[11px] font-semibold ${getDifficultyColor(task.difficulty)}`}>
                            {task.difficulty}
                          </span>
                          {isSubmitted && (
                            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Submitted
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {task.dueDays} Days
                          </span>
                          <span className="font-bold text-indigo-600">+{task.points} pts</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm text-slate-900 mb-1">{task.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{task.description}</p>
                      </div>

                      {/* Key Requirements instructions */}
                      {task.requirements && task.requirements.length > 0 && (
                        <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 space-y-1.5 mt-2">
                          <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Task Instructions & Requirements:</span>
                          </div>
                          <ul className="space-y-1.5 pt-1">
                            {task.requirements.map((req, rIdx) => (
                              <li key={rIdx} className="text-xs text-slate-600 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                                <span className="leading-relaxed">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Tab 3: Certificate Info */}
          {activeTab === 'certificate' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">ISO 9001:2015 Accredited Certification</h3>
                  <p className="text-xs text-slate-500">Every graduate receives a tamper-proof digital certificate backed by Axentra Technologies.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-slate-900">QR Code Verification</div>
                  <div className="text-slate-600">Employers and recruiters can scan the embedded QR code to instantly verify your completion record.</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="font-bold text-slate-900">LinkedIn Shareable</div>
                  <div className="text-slate-600">One-click addition to your LinkedIn Licenses & Certifications profile section.</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 4: FAQs */}
          {activeTab === 'faqs' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4"
            >
              <h3 className="text-base font-bold text-slate-900">Frequently Asked Questions</h3>
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900">Is this internship completely virtual?</div>
                  <div className="text-slate-600">Yes, the entire program is 100% online and self-paced. You can work on tasks according to your schedule.</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900">When will I receive my completion certificate?</div>
                  <div className="text-slate-600">Upon completing all required domain tasks, your certificate will be generated automatically and made available in the Certificate Verification section.</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900">Are there any fees to apply?</div>
                  <div className="text-slate-600">Application and enrollment in standard domain tracks are completely free for eligible engineering and tech students.</div>
                </div>
              </div>
            </motion.div>
          )}
      </div>
    </div>
  );
};
