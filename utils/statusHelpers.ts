import { LeadStatus, LeadSource } from '@/lib/types';

export const STATUS_COLORS: Record<LeadStatus, string> = {
  New:       'text-blue-600 dark:text-blue-400',
  Contacted: 'text-amber-600 dark:text-amber-400',
  Qualified: 'text-green-600 dark:text-green-400',
  Lost:      'text-red-500 dark:text-red-400',
};

export const STATUS_BG: Record<LeadStatus, string> = {
  New:       'bg-blue-50 dark:bg-blue-950/40',
  Contacted: 'bg-amber-50 dark:bg-amber-950/40',
  Qualified: 'bg-green-50 dark:bg-green-950/40',
  Lost:      'bg-red-50 dark:bg-red-950/40',
};

export const SOURCE_COLORS: Record<LeadSource, string> = {
  Website:   'text-violet-600 dark:text-violet-400',
  Instagram: 'text-pink-600 dark:text-pink-400',
  Referral:  'text-teal-600 dark:text-teal-400',
};

export const SOURCE_BG: Record<LeadSource, string> = {
  Website:   'bg-violet-50 dark:bg-violet-950/40',
  Instagram: 'bg-pink-50 dark:bg-pink-950/40',
  Referral:  'bg-teal-50 dark:bg-teal-950/40',
};
