import { User } from '@/lib/types';

export const mockUsers: User[] = [
  { _id: 'user-1', name: 'Admin User',   email: 'admin@leads.io',   role: 'Admin' },
  { _id: 'user-2', name: 'Sales Rep',    email: 'sales@leads.io',   role: 'Sales' },
  { _id: 'user-3', name: 'Jane Cooper',  email: 'jane@leads.io',    role: 'Sales' },
  { _id: 'user-4', name: 'Bob Martin',   email: 'bob@leads.io',     role: 'Sales' },
];
