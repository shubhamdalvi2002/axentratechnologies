import React from 'react';
import {
  Code2,
  Layers,
  Globe,
  Server,
  Cpu,
  Smartphone,
  Database,
  Cloud,
  ShieldCheck,
  BarChart3,
  Layout,
  Megaphone,
  TestTube2,
  Brain,
  PenTool,
  Terminal,
  Link2,
  Zap,
  Sparkles,
  GitBranch,
  FileCode,
  Box,
} from 'lucide-react';

export const getDomainIcon = (id: string, className?: string) => {
  const defaultClass = className || "w-5 h-5";

  switch (id) {
    case 'react-web-dev':
      return <Code2 className={`${defaultClass} text-sky-600`} />;
    case 'mern-stack-dev':
      return <Layers className={`${defaultClass} text-emerald-600`} />;
    case 'dotnet-web-dev':
    case 'dotnet-intern':
      return <Box className={`${defaultClass} text-purple-600`} />;
    case 'figma-web-dev':
    case 'figma-app-dev':
      return <Layout className={`${defaultClass} text-rose-500`} />;
    case 'fullstack-web-dev':
      return <Terminal className={`${defaultClass} text-indigo-600`} />;
    case 'frontend-web-dev':
      return <Globe className={`${defaultClass} text-blue-600`} />;
    case 'backend-web-dev':
      return <Server className={`${defaultClass} text-slate-700`} />;
    case 'c-cpp-programming':
    case 'embedded-systems':
    case 'vlsi-intern':
      return <Cpu className={`${defaultClass} text-amber-600`} />;
    case 'software-dev':
      return <GitBranch className={`${defaultClass} text-indigo-600`} />;
    case 'digital-marketing':
      return <Megaphone className={`${defaultClass} text-orange-500`} />;
    case 'app-development':
      return <Smartphone className={`${defaultClass} text-violet-600`} />;
    case 'java-programming':
      return <Code2 className={`${defaultClass} text-red-600`} />;
    case 'python-programming':
      return <FileCode className={`${defaultClass} text-yellow-600`} />;
    case 'data-analytics':
    case 'power-bi':
      return <BarChart3 className={`${defaultClass} text-indigo-600`} />;
    case 'sql-intern':
    case 'big-data':
      return <Database className={`${defaultClass} text-teal-600`} />;
    case 'devops-intern':
    case 'cloud-computing':
      return <Cloud className={`${defaultClass} text-cyan-600`} />;
    case 'blockchain-tech':
      return <Link2 className={`${defaultClass} text-blue-600`} />;
    case 'software-testing':
    case 'automation-testing':
      return <TestTube2 className={`${defaultClass} text-emerald-600`} />;
    case 'data-science':
      return <Sparkles className={`${defaultClass} text-purple-600`} />;
    case 'uiux-intern':
      return <PenTool className={`${defaultClass} text-pink-600`} />;
    case 'ml-ai-iot':
      return <Brain className={`${defaultClass} text-indigo-600`} />;
    case 'cybersecurity':
      return <ShieldCheck className={`${defaultClass} text-emerald-600`} />;
    default:
      return <Zap className={`${defaultClass} text-indigo-600`} />;
  }
};
