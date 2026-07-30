import { ApplicationRecord } from '../types';

const STORAGE_KEY = 'axentra_applications_v1';

export function getStoredApplications(): ApplicationRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveApplication(app: ApplicationRecord): void {
  const existing = getStoredApplications();
  const updated = [app, ...existing.filter(item => item.id !== app.id)];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function updateApplicationPayment(
  id: string,
  paymentId: string,
  amountPaid: number
): ApplicationRecord | null {
  const existing = getStoredApplications();
  const index = existing.findIndex(item => item.id === id);
  if (index === -1) return null;

  existing[index] = {
    ...existing[index],
    paymentStatus: 'completed',
    paymentId,
    amountPaid,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  return existing[index];
}

export function generateApplicationId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `AXN-${new Date().getFullYear()}-${randomNum}`;
}
