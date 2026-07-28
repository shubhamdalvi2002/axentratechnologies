import { DomainTrack, TaskItem, CertificateData, TaskSubmission, MentorFeedback } from '../types';
import { INITIAL_DOMAINS, INITIAL_TASKS, INITIAL_CERTIFICATES } from '../data/mockData';

const KEYS = {
  DOMAINS: 'axentra_domains_v2',
  TASKS: 'axentra_tasks_v2',
  CERTIFICATES: 'axentra_certificates_v2',
  ACTIVE_DOMAIN: 'axentra_active_domain_v2',
  USER_INFO: 'axentra_user_info_v2',
};

export function getStoredDomains(): DomainTrack[] {
  try {
    const data = localStorage.getItem(KEYS.DOMAINS);
    return data ? JSON.parse(data) : INITIAL_DOMAINS;
  } catch {
    return INITIAL_DOMAINS;
  }
}

export function saveDomains(domains: DomainTrack[]): void {
  localStorage.setItem(KEYS.DOMAINS, JSON.stringify(domains));
}

export function getStoredTasks(): TaskItem[] {
  try {
    const data = localStorage.getItem(KEYS.TASKS);
    return data ? JSON.parse(data) : INITIAL_TASKS;
  } catch {
    return INITIAL_TASKS;
  }
}

export function saveTasks(tasks: TaskItem[]): void {
  localStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
}

export function getStoredCertificates(): CertificateData[] {
  try {
    const data = localStorage.getItem(KEYS.CERTIFICATES);
    return data ? JSON.parse(data) : INITIAL_CERTIFICATES;
  } catch {
    return INITIAL_CERTIFICATES;
  }
}

export function saveCertificates(certs: CertificateData[]): void {
  localStorage.setItem(KEYS.CERTIFICATES, JSON.stringify(certs));
}

export function getActiveDomainId(): string {
  return localStorage.getItem(KEYS.ACTIVE_DOMAIN) || 'react-web-dev';
}

export function setActiveDomainId(id: string): void {
  localStorage.setItem(KEYS.ACTIVE_DOMAIN, id);
}

export function getUserInfo(): { name: string; email: string } {
  try {
    const data = localStorage.getItem(KEYS.USER_INFO);
    return data ? JSON.parse(data) : { name: 'Shubham Dalvi', email: 'shubhamdalvi7218@gmail.com' };
  } catch {
    return { name: 'Shubham Dalvi', email: 'shubhamdalvi7218@gmail.com' };
  }
}

export function saveUserInfo(info: { name: string; email: string }): void {
  localStorage.setItem(KEYS.USER_INFO, JSON.stringify(info));
}

export function submitTaskSolution(
  taskId: string,
  codeOrContent: string,
  notes?: string,
  aiReviewData?: TaskSubmission['aiReview']
): TaskItem {
  const tasks = getStoredTasks();
  const index = tasks.findIndex(t => t.id === taskId);
  if (index === -1) throw new Error('Task not found');

  const submission: TaskSubmission = {
    id: `sub-${Date.now()}`,
    taskId,
    submittedAt: new Date().toISOString(),
    codeOrContent,
    notes,
    aiReview: aiReviewData,
  };

  tasks[index] = {
    ...tasks[index],
    status: 'under_review',
    submission,
  };

  saveTasks(tasks);
  return tasks[index];
}

export function reviewTaskSubmission(
  taskId: string,
  mentorName: string,
  status: 'approved' | 'needs_revision' | 'rejected',
  grade: 'A+' | 'A' | 'B' | 'C' | 'Pass',
  comments: string
): TaskItem {
  const tasks = getStoredTasks();
  const index = tasks.findIndex(t => t.id === taskId);
  if (index === -1) throw new Error('Task not found');

  const feedback: MentorFeedback = {
    id: `mf-${Date.now()}`,
    taskId,
    mentorName,
    status,
    grade,
    comments,
    reviewedAt: new Date().toISOString(),
  };

  const newStatus = status === 'approved' ? 'completed' : status === 'needs_revision' ? 'needs_revision' : 'in_progress';

  tasks[index] = {
    ...tasks[index],
    status: newStatus,
    mentorFeedback: feedback,
  };

  saveTasks(tasks);

  // Check if all tasks for this domain are completed to auto-generate or issue certificate
  const domainId = tasks[index].domainId;
  checkAndGenerateCertificateIfComplete(domainId);

  return tasks[index];
}

export function createNewTask(domainId: string, task: Omit<TaskItem, 'id' | 'domainId' | 'status' | 'taskNumber'>): TaskItem {
  const tasks = getStoredTasks();
  const domainTasks = tasks.filter(t => t.domainId === domainId);
  const taskNumber = `TASK-${domainId.toUpperCase().slice(0, 4)}-0${domainTasks.length + 1}`;

  const newTask: TaskItem = {
    ...task,
    id: `task-${Date.now()}`,
    domainId,
    taskNumber,
    status: 'todo',
  };

  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
}

export function checkAndGenerateCertificateIfComplete(domainId: string): CertificateData | null {
  const tasks = getStoredTasks().filter(t => t.domainId === domainId);
  if (tasks.length === 0) return null;

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  if (completedCount === tasks.length && completedCount > 0) {
    const certs = getStoredCertificates();
    const existing = certs.find(c => c.domainId === domainId);
    if (existing) return existing;

    const user = getUserInfo();
    const domains = getStoredDomains();
    const domain = domains.find(d => d.id === domainId);

    const newCert: CertificateData = {
      id: `cert-${Date.now()}`,
      studentName: user.name,
      studentEmail: user.email,
      domainId,
      domainTitle: domain ? `${domain.title} Internship` : 'Axentra Tech Internship',
      issuedAt: new Date().toISOString().split('T')[0],
      tasksCompleted: completedCount,
      verificationCode: `AXT-2026-${domainId.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`,
      grade: 'Distinction (A+)',
      mentorSignature: 'Dr. Rajesh Nair, VP Engineering',
    };

    certs.push(newCert);
    saveCertificates(certs);
    return newCert;
  }

  return null;
}
