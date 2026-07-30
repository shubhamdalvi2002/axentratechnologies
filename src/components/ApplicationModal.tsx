import React, { useState, useEffect } from 'react';
import { DomainTrack, ApplicationRecord } from '../types';
import { updateApplicationPayment, generateApplicationId } from '../lib/applications';
import {
  submitToGoogleSheets,
  TARGET_GOOGLE_SHEET_URL,
  GOOGLE_APPS_SCRIPT_CODE,
  getAppsScriptUrl,
  setAppsScriptUrl,
} from '../lib/googleSheets';
import { getStoredDomains } from '../lib/storage';
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  Lock,
  Building2,
  GraduationCap,
  Sparkles,
  User,
  Mail,
  Phone,
  BookOpen,
  Code2,
  Linkedin,
  Github,
  CreditCard,
  ShieldCheck,
  Download,
  ArrowRight,
  Check,
  AlertCircle,
  Table,
  ExternalLink,
  Code,
  Copy,
  Settings,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDomain?: DomainTrack | null;
  initialDuration?: '4 Weeks' | '6 Weeks' | '3 Months' | '6 Months' | null;
  onSuccess?: (app: ApplicationRecord) => void;
}

const PRICING: Record<string, number> = {
  '4 Weeks': 499,
  '6 Weeks': 699,
  '3 Months': 999,
  '6 Months': 1499,
};

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  initialDomain,
  initialDuration,
  onSuccess,
}) => {
  const domains = getStoredDomains();

  // Step 1: Form, Step 2: Payment, Step 3: Success
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('B.Tech');
  const [branch, setBranch] = useState('');
  const [currentYear, setCurrentYear] = useState('3rd Year');
  const [graduationYear, setGraduationYear] = useState('2026');
  const [preferredDomainId, setPreferredDomainId] = useState(
    initialDomain?.id || domains[0]?.id || 'react-web-dev'
  );
  const [duration, setDuration] = useState<'4 Weeks' | '6 Weeks' | '3 Months' | '6 Months'>(
    initialDuration || '4 Weeks'
  );
  const [skills, setSkills] = useState('');
  const [resumeFile, setResumeFile] = useState<{ name: string; size: string } | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  // Form Processing & Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentApp, setCurrentApp] = useState<ApplicationRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
  const [submissionErrorMessage, setSubmissionErrorMessage] = useState<string | null>(null);

  // Apps Script Settings Drawer Toggle
  const [showScriptConfig, setShowScriptConfig] = useState(false);
  const [customAppsScriptUrl, setCustomAppsScriptUrl] = useState(getAppsScriptUrl());
  const [copiedScript, setCopiedScript] = useState(false);

  // Payment State
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  // Update defaults when initialDomain/initialDuration change
  useEffect(() => {
    if (initialDomain) {
      setPreferredDomainId(initialDomain.id);
    }
    if (initialDuration) {
      setDuration(initialDuration);
    }
  }, [initialDomain, initialDuration, isOpen]);

  // Reset state on modal open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrors({});
      setShowRazorpayModal(false);
      setIsProcessingPayment(false);
      setIsSubmitting(false);
      setSubmissionSuccess(false);
      setRedirectCountdown(null);
      setSubmissionErrorMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedDomain = domains.find(d => d.id === preferredDomainId) || initialDomain || domains[0];
  const feeAmount = PRICING[duration] || 499;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setResumeFile({ name: file.name, size: `${sizeMb} MB` });
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email address is required';
    if (!mobile.trim() || mobile.replace(/\D/g, '').length < 10)
      newErrors.mobile = 'Valid 10-digit mobile number is required';
    if (!college.trim()) newErrors.college = 'College / University name is required';
    if (!branch.trim()) newErrors.branch = 'Branch / Department is required';
    if (!skills.trim()) newErrors.skills = 'Please list your key skills';
    if (!resumeFile) newErrors.resume = 'Resume document is required';

    if (linkedinUrl && !linkedinUrl.startsWith('http')) {
      newErrors.linkedinUrl = 'Please enter a valid URL (starting with http:// or https://)';
    }
    if (githubUrl && !githubUrl.startsWith('http')) {
      newErrors.githubUrl = 'Please enter a valid URL (starting with http:// or https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetFormFields = () => {
    setFullName('');
    setEmail('');
    setMobile('');
    setCollege('');
    setDegree('B.Tech');
    setBranch('');
    setCurrentYear('3rd Year');
    setGraduationYear('2026');
    setSkills('');
    setResumeFile(null);
    setLinkedinUrl('');
    setGithubUrl('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionErrorMessage(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    const appId = generateApplicationId();
    const newRecord: ApplicationRecord = {
      id: appId,
      fullName: fullName.trim(),
      email: email.trim(),
      mobile: mobile.trim(),
      college: college.trim(),
      degree,
      branch: branch.trim(),
      currentYear,
      graduationYear,
      preferredDomainId: selectedDomain.id,
      preferredDomainTitle: selectedDomain.title,
      internshipDuration: duration,
      skills: skills.trim(),
      resumeName: resumeFile?.name || 'Resume.pdf',
      resumeSize: resumeFile?.size || '1.0 MB',
      linkedinUrl: linkedinUrl.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      submittedAt: new Date().toISOString(),
      paymentStatus: 'pending',
      amountPaid: feeAmount,
    };

    try {
      // 1. Submit directly to Google Sheets (via Google Apps Script Endpoint)
      const res = await submitToGoogleSheets(newRecord);

      if (!res.success) {
        throw new Error(res.message || 'Failed to save application to Google Sheet.');
      }

      // Save application reference for step 2 payment
      setCurrentApp(newRecord);
      setIsSubmitting(false);
      setSubmissionSuccess(true);
      setRedirectCountdown(2);

      // 2. Clear/reset the form fields immediately as required
      resetFormFields();

      // 3. Countdown 2 seconds and automatically redirect to Payment page
      let remaining = 2;
      const interval = setInterval(() => {
        remaining -= 1;
        setRedirectCountdown(remaining);
        if (remaining <= 0) {
          clearInterval(interval);
          setSubmissionSuccess(false);
          setStep(2);
        }
      }, 1000);
    } catch (err: any) {
      console.error('Submission error:', err);
      setIsSubmitting(false);
      setSubmissionErrorMessage(
        err?.message || 'An error occurred while saving your application. Please check your connection and try again.'
      );
    }
  };

  const handleSimulatePayment = () => {
    if (!currentApp) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      const razorpayPaymentId = `pay_Rzp${Math.floor(100000000 + Math.random() * 900000000)}`;
      const updatedApp = updateApplicationPayment(currentApp.id, razorpayPaymentId, feeAmount);

      setIsProcessingPayment(false);
      setShowRazorpayModal(false);
      if (updatedApp) {
        setCurrentApp(updatedApp);
      }
      setStep(3);
      if (onSuccess && updatedApp) {
        onSuccess(updatedApp);
      }
    }, 1500);
  };

  const copyAppsScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleSaveScriptUrl = () => {
    setAppsScriptUrl(customAppsScriptUrl);
    setShowScriptConfig(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-xs">
              AX
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">Axentra Technologies</h2>
              <p className="text-[11px] text-slate-400">Official Internship Application Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Google Sheet Bridge Badge */}
            <a
              href={TARGET_GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 text-[11px] font-medium border border-emerald-800 transition-colors"
              title="Connected to Google Sheet"
            >
              <Table className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Sheet Live</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => setShowScriptConfig(!showScriptConfig)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Google Sheet Integration Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Optional Google Sheet Bridge Developer Drawer */}
        <AnimatePresence>
          {showScriptConfig && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-slate-950 text-slate-200 border-b border-slate-800 px-5 py-4 text-xs shrink-0 overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <Table className="w-4 h-4" />
                    <span>Google Sheets Integration via Apps Script Bridge</span>
                  </div>
                  <a
                    href={TARGET_GOOGLE_SHEET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <span>View Spreadsheet</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-medium text-slate-400">
                    Google Apps Script Web App Endpoint URL:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={customAppsScriptUrl}
                      onChange={e => setCustomAppsScriptUrl(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 text-xs font-mono outline-none focus:border-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={handleSaveScriptUrl}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg text-xs"
                    >
                      Save URL
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Google Apps Script Code Snippet:</span>
                  <button
                    type="button"
                    onClick={copyAppsScript}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px] flex items-center gap-1"
                  >
                    {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedScript ? 'Copied Code!' : 'Copy Script Code'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Indicator */}
        <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs shrink-0">
          <div className="flex items-center gap-2 sm:gap-4 w-full">
            <div className={`flex items-center gap-1.5 font-semibold ${step >= 1 ? 'text-indigo-600' : 'text-slate-400'}`}>
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                  step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                1
              </span>
              <span>Application Form</span>
            </div>

            <div className="h-0.5 flex-1 bg-slate-200 min-w-[12px] overflow-hidden">
              <div className={`h-full bg-indigo-600 transition-all duration-300 ${step >= 2 ? 'w-full' : 'w-0'}`} />
            </div>

            <div className={`flex items-center gap-1.5 font-semibold ${step >= 2 ? 'text-indigo-600' : 'text-slate-400'}`}>
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                  step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                2
              </span>
              <span>Razorpay Payment</span>
            </div>

            <div className="h-0.5 flex-1 bg-slate-200 min-w-[12px] overflow-hidden">
              <div className={`h-full bg-indigo-600 transition-all duration-300 ${step >= 3 ? 'w-full' : 'w-0'}`} />
            </div>

            <div className={`flex items-center gap-1.5 font-semibold ${step >= 3 ? 'text-indigo-600' : 'text-slate-400'}`}>
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                  step >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                3
              </span>
              <span>Confirmation</span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* STEP 1: Application Form */}
          {step === 1 && (
            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Submission Success Banner before Redirect */}
              <AnimatePresence>
                {submissionSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-1 shadow-md"
                  >
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Application Submitted & Saved to Google Sheet!</span>
                    </div>
                    <p className="text-xs text-emerald-700">
                      Form reset successfully. Redirecting you to the Payment Page in{' '}
                      <span className="font-extrabold text-emerald-900">{redirectCountdown} seconds</span>...
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submission Error Alert */}
              {submissionErrorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{submissionErrorMessage}</span>
                </div>
              )}

              {/* Program Overview Banner */}
              <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-indigo-950">Selected Program:</div>
                    <div className="text-sm font-extrabold text-indigo-700">{selectedDomain.title}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-indigo-200 text-xs font-semibold text-indigo-800 shadow-2xs">
                    {duration} Internship
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold">
                    ₹{feeAmount}
                  </span>
                </div>
              </div>

              {/* Personal Details Section */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Personal Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-xs text-slate-900 outline-none focus:ring-2 transition-all ${
                          errors.fullName
                            ? 'border-red-400 focus:ring-red-100'
                            : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-100'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        placeholder="rahul@example.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-xs text-slate-900 outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-red-400 focus:ring-red-100'
                            : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-100'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={mobile}
                        onChange={e => setMobile(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-xs text-slate-900 outline-none focus:ring-2 transition-all ${
                          errors.mobile
                            ? 'border-red-400 focus:ring-red-100'
                            : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-100'
                        }`}
                      />
                    </div>
                    {errors.mobile && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.mobile}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>Academic Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      College / University <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="e.g. SRM Institute of Technology"
                        value={college}
                        onChange={e => setCollege(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2 bg-white border rounded-xl text-xs text-slate-900 outline-none focus:ring-2 transition-all ${
                          errors.college
                            ? 'border-red-400 focus:ring-red-100'
                            : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-100'
                        }`}
                      />
                    </div>
                    {errors.college && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.college}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Degree <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={degree}
                      onChange={e => setDegree(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 focus:border-indigo-600 rounded-xl text-xs text-slate-900 outline-none"
                    >
                      <option value="B.Tech">B.Tech / B.E.</option>
                      <option value="BCA">BCA</option>
                      <option value="MCA">MCA</option>
                      <option value="B.Sc">B.Sc (CS / IT)</option>
                      <option value="M.Tech">M.Tech / M.E.</option>
                      <option value="Diploma">Polytechnic / Diploma</option>
                      <option value="Other">Other Degree</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Branch / Department <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Computer Science"
                      value={branch}
                      onChange={e => setBranch(e.target.value)}
                      className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-slate-900 outline-none focus:ring-2 transition-all ${
                        errors.branch
                          ? 'border-red-400 focus:ring-red-100'
                          : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-100'
                      }`}
                    />
                    {errors.branch && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.branch}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Current Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={currentYear}
                      onChange={e => setCurrentYear(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 focus:border-indigo-600 rounded-xl text-xs text-slate-900 outline-none"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year / Final Year">4th Year / Final Year</option>
                      <option value="Graduated">Graduated / Passed Out</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Graduation Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={graduationYear}
                      onChange={e => setGraduationYear(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 focus:border-indigo-600 rounded-xl text-xs text-slate-900 outline-none"
                    >
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Internship Program Options */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span>Internship Preferences</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Preferred Domain Track <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={preferredDomainId}
                      onChange={e => setPreferredDomainId(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 focus:border-indigo-600 rounded-xl text-xs text-slate-900 font-medium outline-none"
                    >
                      {domains.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Internship Duration <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={duration}
                      onChange={e => setDuration(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 focus:border-indigo-600 rounded-xl text-xs text-slate-900 font-medium outline-none"
                    >
                      <option value="4 Weeks">4 Weeks Internship (₹499)</option>
                      <option value="6 Weeks">6 Weeks Internship (₹699)</option>
                      <option value="3 Months">3 Months Internship (₹999)</option>
                      <option value="6 Months">6 Months Internship (₹1,499)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Skills & Resume Upload */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-indigo-600" />
                  <span>Skills & Resume</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Key Skills & Technologies <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Java, Spring Boot, React, HTML/CSS, Git"
                      value={skills}
                      onChange={e => setSkills(e.target.value)}
                      className={`w-full px-3 py-2 bg-white border rounded-xl text-xs text-slate-900 outline-none focus:ring-2 transition-all ${
                        errors.skills
                          ? 'border-red-400 focus:ring-red-100'
                          : 'border-slate-300 focus:border-indigo-600 focus:ring-indigo-100'
                      }`}
                    />
                    {errors.skills && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.skills}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Resume Upload (PDF / DOCX) <span className="text-red-500">*</span>
                    </label>

                    {resumeFile ? (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <FileText className="w-5 h-5 text-indigo-600 shrink-0" />
                          <div className="truncate">
                            <p className="text-xs font-semibold text-slate-900 truncate">{resumeFile.name}</p>
                            <p className="text-[10px] text-slate-500">{resumeFile.size}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setResumeFile(null)}
                          className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label
                        className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                          errors.resume
                            ? 'border-red-300 bg-red-50/30'
                            : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50'
                        }`}
                      >
                        <Upload className="w-6 h-6 text-indigo-600 mb-1.5" />
                        <p className="text-xs font-semibold text-slate-800">Click or drag resume file here</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Supports PDF, DOC, DOCX (Max 10MB)</p>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                      </label>
                    )}
                    {errors.resume && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.resume}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Links (Optional) */}
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Linkedin className="w-4 h-4 text-indigo-600" />
                  <span>Profiles & Social Links (Optional)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">LinkedIn Profile</label>
                    <div className="relative">
                      <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        value={linkedinUrl}
                        onChange={e => setLinkedinUrl(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 focus:border-indigo-600 rounded-xl text-xs text-slate-900 outline-none"
                      />
                    </div>
                    {errors.linkedinUrl && <p className="text-[11px] text-red-500 mt-1">{errors.linkedinUrl}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">GitHub Profile</label>
                    <div className="relative">
                      <Github className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="url"
                        placeholder="https://github.com/username"
                        value={githubUrl}
                        onChange={e => setGithubUrl(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 focus:border-indigo-600 rounded-xl text-xs text-slate-900 outline-none"
                      />
                    </div>
                    {errors.githubUrl && <p className="text-[11px] text-red-500 mt-1">{errors.githubUrl}</p>}
                  </div>
                </div>
              </div>

              {/* Form Action Button */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Table className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Direct Google Sheet Sync</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || submissionSuccess}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Saving to Google Sheets...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application & Pay</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* STEP 2: Razorpay Payment Page */}
          {step === 2 && currentApp && (
            <div className="space-y-5">
              <div className="text-center max-w-lg mx-auto space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Razorpay Trusted Checkout</span>
                </span>
                <h3 className="text-lg font-extrabold text-slate-900">Complete Program Payment</h3>
                <p className="text-xs text-slate-500">
                  Application recorded in Google Sheets. Complete registration payment inside Axentra portal.
                </p>
              </div>

              {/* Order Summary Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5 text-xs">
                  <span className="text-slate-500">Application Reference ID:</span>
                  <span className="font-mono font-bold text-slate-900">{currentApp.id}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">Applicant:</span>
                    <span className="font-semibold text-slate-800">{currentApp.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Email:</span>
                    <span className="font-semibold text-slate-800 truncate block">{currentApp.email}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Program:</span>
                    <span className="font-semibold text-indigo-700">{currentApp.preferredDomainTitle}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Duration:</span>
                    <span className="font-semibold text-slate-800">{currentApp.internshipDuration}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">Total Registration Amount:</span>
                  <span className="text-base font-extrabold text-indigo-600">₹{feeAmount}</span>
                </div>
              </div>

              {/* Razorpay Container Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="px-2.5 py-1 rounded-md bg-blue-600 font-extrabold text-xs tracking-wide">
                      Razorpay
                    </div>
                    <span className="text-xs text-slate-300">256-Bit SSL Encryption</span>
                  </div>
                  <Lock className="w-4 h-4 text-emerald-400" />
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-slate-300">Select Preferred Payment Channel:</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentMethod === 'upi'
                          ? 'bg-blue-600/30 border-blue-400 text-white'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-bold">UPI / QR</div>
                      <div className="text-[10px] text-slate-400">GPay, PhonePe, Paytm</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'bg-blue-600/30 border-blue-400 text-white'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-bold">Cards</div>
                      <div className="text-[10px] text-slate-400">Debit / Credit Cards</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        paymentMethod === 'netbanking'
                          ? 'bg-blue-600/30 border-blue-400 text-white'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="text-xs font-bold">Net Banking</div>
                      <div className="text-[10px] text-slate-400">All Major Banks</div>
                    </button>
                  </div>
                </div>

                {/* Razorpay Action Button */}
                <button
                  type="button"
                  onClick={() => setShowRazorpayModal(true)}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay ₹{feeAmount} via Razorpay</span>
                </button>
              </div>

              {/* Razorpay Checkout Modal Overlay */}
              <AnimatePresence>
                {showRazorpayModal && (
                  <div className="fixed inset-0 z-60 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
                    >
                      <div className="bg-blue-900 text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm tracking-wider">Razorpay</span>
                          <span className="text-[10px] bg-blue-800 px-2 py-0.5 rounded text-blue-200">
                            Secure Checkout
                          </span>
                        </div>
                        <button onClick={() => setShowRazorpayModal(false)} className="text-blue-200 hover:text-white">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-5 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <div>
                            <p className="text-xs text-slate-500">Axentra Technologies Pvt. Ltd.</p>
                            <p className="text-sm font-bold text-slate-900">{currentApp.preferredDomainTitle}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-500">Amount</p>
                            <p className="text-base font-extrabold text-blue-600">₹{feeAmount}</p>
                          </div>
                        </div>

                        {paymentMethod === 'upi' && (
                          <div className="text-center space-y-3 py-2">
                            <div className="w-32 h-32 mx-auto bg-slate-100 border border-slate-300 rounded-xl p-2 flex items-center justify-center">
                              <div className="text-center">
                                <span className="font-mono text-xs font-bold text-slate-700 block mb-1">
                                  UPI QR CODE
                                </span>
                                <div className="w-20 h-20 mx-auto bg-slate-900 rounded flex items-center justify-center text-white text-[10px] font-bold">
                                  [RAZORPAY]
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 font-medium">Scan with Google Pay, PhonePe, or Paytm</p>
                          </div>
                        )}

                        {paymentMethod === 'card' && (
                          <div className="space-y-2 text-xs">
                            <input
                              type="text"
                              disabled
                              value="4111 •••• •••• 1111 (Razorpay Secured)"
                              className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-lg font-mono text-slate-700"
                            />
                            <div className="flex gap-2">
                              <input
                                type="text"
                                disabled
                                value="12/28"
                                className="w-1/2 p-2.5 bg-slate-100 border border-slate-300 rounded-lg text-center"
                              />
                              <input
                                type="text"
                                disabled
                                value="•••"
                                className="w-1/2 p-2.5 bg-slate-100 border border-slate-300 rounded-lg text-center"
                              />
                            </div>
                          </div>
                        )}

                        {paymentMethod === 'netbanking' && (
                          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 space-y-1">
                            <p className="font-semibold text-slate-900">Popular Banks:</p>
                            <p>HDFC Bank, ICICI Bank, State Bank of India, Axis Bank</p>
                          </div>
                        )}

                        <button
                          type="button"
                          disabled={isProcessingPayment}
                          onClick={handleSimulatePayment}
                          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                        >
                          {isProcessingPayment ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Authorizing Razorpay Payment...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Confirm Payment (₹{feeAmount})</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* STEP 3: Success Confirmation */}
          {step === 3 && currentApp && (
            <div className="py-4 text-center space-y-5">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-600 flex items-center justify-center shadow-md">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900">Application & Payment Successful!</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Your application for <span className="font-semibold text-slate-900">{currentApp.preferredDomainTitle}</span> has been logged to Google Sheets and verified.
                </p>
              </div>

              {/* Application Details Slip */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Application ID:</span>
                  <span className="font-mono font-bold text-slate-900">{currentApp.id}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Applicant Name:</span>
                  <span className="font-semibold text-slate-900">{currentApp.fullName}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Registered Email:</span>
                  <span className="font-semibold text-slate-900">{currentApp.email}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Internship Duration:</span>
                  <span className="font-semibold text-indigo-600">{currentApp.internshipDuration}</span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-2">
                  <span className="text-slate-500">Razorpay Payment ID:</span>
                  <span className="font-mono text-[11px] text-emerald-700 font-bold">
                    {currentApp.paymentId || 'pay_Rzp1049281'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 max-w-md mx-auto text-left text-xs text-blue-900 leading-relaxed space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Next Steps & HR Onboarding:</span>
                </p>
                <p className="text-[11px] text-slate-600">
                  Our HR team and technical mentors will review your Google Sheet record. Your onboarding kit, Slack/Discord invite, and assigned mentor details will be emailed to{' '}
                  <span className="font-semibold text-slate-800">{currentApp.email}</span> within 24 to 48 business hours.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    alert(
                      `Application Slip for ${currentApp.id}\nStudent: ${currentApp.fullName}\nEmail: ${currentApp.email}\nProgram: ${currentApp.preferredDomainTitle}\nDuration: ${currentApp.internshipDuration}\nPayment ID: ${currentApp.paymentId}`
                    );
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Application Slip</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs cursor-pointer"
                >
                  Return to Axentra Home
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
