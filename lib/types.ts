export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Lost';
export type LeadSource = 'Website' | 'Instagram' | 'Referral';
export type UserRole = 'Admin' | 'Sales';

export type SortOrder =
  | 'latest'
  | 'oldest';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
} 
