'use client';
import { Lead, LeadStatus, LeadSource } from '@/lib/types';

export interface CreateLeadInput {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

interface LeadsContextType {
  leads: Lead[];
  addLead: (input: CreateLeadInput, createdBy: string) => Lead;
  updateLead: (id: string, input: CreateLeadInput) => void;
  deleteLead: (id: string) => void;
}
