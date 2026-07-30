export type TaskDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export type TaskStatus = 'todo' | 'in_progress' | 'submitted' | 'under_review' | 'needs_revision' | 'completed';

export interface DomainTrack {
  id: string;
  title: string;
  icon: string;
  desc: string;
  longDesc: string;
  tags: string[];
  totalTasks: number;
  category: 'Software' | 'Data' | 'Core' | 'Design & Cloud';
  popular?: boolean;
}

export interface TaskItem {
  id: string;
  domainId: string;
  taskNumber: string; // e.g. "TASK-014"
  title: string;
  description: string;
  requirements: string[];
  starterCode?: string;
  difficulty: TaskDifficulty;
  dueDays: number;
  status: TaskStatus;
  points: number;
  submission?: TaskSubmission;
  mentorFeedback?: MentorFeedback;
}

export interface TaskSubmission {
  id: string;
  taskId: string;
  submittedAt: string;
  codeOrContent: string;
  notes?: string;
  attachments?: string[];
  aiReview?: {
    score: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
    passed: boolean;
  };
}

export interface MentorFeedback {
  id: string;
  taskId: string;
  mentorName: string;
  status: 'approved' | 'needs_revision' | 'rejected';
  grade: 'A+' | 'A' | 'B' | 'C' | 'Pass';
  comments: string;
  reviewedAt: string;
}

export interface CertificateData {
  id: string;
  studentName: string;
  studentEmail: string;
  domainId: string;
  domainTitle: string;
  issuedAt: string;
  tasksCompleted: number;
  verificationCode: string;
  grade: string;
  mentorSignature: string;
}

export type ViewMode = 'landing' | 'domains' | 'domain_detail' | 'verify_cert' | 'about';
