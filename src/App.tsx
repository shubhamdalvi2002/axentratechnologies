/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { DomainTrack, TaskItem, CertificateData, ViewMode } from './types';
import {
  getStoredDomains,
  getStoredTasks,
  getStoredCertificates,
  getActiveDomainId,
  setActiveDomainId,
} from './lib/storage';

import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CompanyMarquee } from './components/CompanyMarquee';
import { DomainGrid } from './components/DomainGrid';
import { ProcessSteps } from './components/ProcessSteps';
import { TrustBadges } from './components/TrustBadges';
import { CertificateSection } from './components/CertificateSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { DomainDetailPage } from './components/DomainDetailPage';
import { Preloader } from './components/Preloader';
import { AuroraBackground } from './components/AuroraBackground';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');

  const [domains, setDomains] = useState<DomainTrack[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [certificates, setCertificates] = useState<CertificateData[]>([]);

  const [activeDomainId, setActiveDomainIdState] = useState<string>('react-web-dev');
  const [selectedTrackDomain, setSelectedTrackDomain] = useState<DomainTrack | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll to top on viewMode change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewMode]);

  // Load initial data from local storage / seeds
  const refreshData = () => {
    const loadedDomains = getStoredDomains();
    const loadedTasks = getStoredTasks();
    const loadedCerts = getStoredCertificates();
    const activeId = getActiveDomainId();

    setDomains(loadedDomains);
    setTasks(loadedTasks);
    setCertificates(loadedCerts);
    setActiveDomainIdState(activeId);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const activeDomain = domains.find(d => d.id === activeDomainId) || domains[0] || {
    id: 'java-fullstack',
    title: 'Java Full Stack',
    icon: '☕',
    desc: 'Spring Boot REST APIs, Microservices & React frontend integrations.',
    longDesc: 'Master end-to-end Enterprise application development.',
    tags: ['Java', 'Spring', 'SQL', 'React'],
    totalTasks: 5,
    category: 'Software',
  };

  const handleSelectDomainClick = (domain: DomainTrack) => {
    setSelectedTrackDomain(domain);
    setViewMode('domain_detail');
  };

  const handleEnrollDomainTrack = (domain: DomainTrack) => {
    setActiveDomainId(domain.id);
    setActiveDomainIdState(domain.id);
    setToastMessage(`Enrolled in ${domain.title} track!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRequestCustomDomain = () => {
    setToastMessage('Custom Domain proposal submitted! Our curriculum team will review.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-600 selection:text-white relative overflow-x-hidden">
      {/* SaaS Preloader */}
      <Preloader />

      {/* Ambient Animated Aurora Gradient Background */}
      <AuroraBackground />

      {/* Header Navigation */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedDomainTitle={activeDomain.title}
        onSelectDomain={() => setViewMode('domains')}
      />

      {/* Main Views Routing with Smooth Page Transitions */}
      <main className="relative z-10 pt-16 md:pt-20">
        <AnimatePresence mode="wait">
          {viewMode === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Hero setViewMode={setViewMode} />
              <DomainGrid
                domains={domains}
                selectedDomainId={activeDomainId}
                onSelectDomain={handleSelectDomainClick}
                setViewMode={setViewMode}
                onRequestCustomDomain={handleRequestCustomDomain}
              />
              <CompanyMarquee />
              <ProcessSteps />
              <TrustBadges />
            </motion.div>
          )}

          {viewMode === 'domains' && (
            <motion.div
              key="domains"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <DomainGrid
                domains={domains}
                selectedDomainId={activeDomainId}
                onSelectDomain={handleSelectDomainClick}
                setViewMode={setViewMode}
                onRequestCustomDomain={handleRequestCustomDomain}
              />
            </motion.div>
          )}

          {viewMode === 'domain_detail' && (
            <motion.div
              key="domain_detail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <DomainDetailPage
                domain={selectedTrackDomain || activeDomain}
                tasks={tasks}
                onBack={() => setViewMode('domains')}
                onEnroll={handleEnrollDomainTrack}
                isEnrolled={activeDomainId === (selectedTrackDomain?.id || activeDomain.id)}
                onToast={(msg) => {
                  setToastMessage(msg);
                  setTimeout(() => setToastMessage(null), 3000);
                }}
              />
            </motion.div>
          )}

          {viewMode === 'verify_cert' && (
            <motion.div
              key="verify_cert"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <CertificateSection certificates={certificates} />
            </motion.div>
          )}

          {viewMode === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <AboutSection setViewMode={setViewMode} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer setViewMode={setViewMode} />

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs text-white shadow-2xl flex items-center gap-2.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

