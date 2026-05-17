'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Lead, LeadStatus, LeadSource } from '@/lib/types';
import { mockLeads } from '@/data/mockLeads';

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

const LeadsContext = createContext<LeadsContextType | null>(null);

export function LeadsProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);

  const addLead = (input: CreateLeadInput, createdBy: string): Lead => {
    const newLead: Lead = {
      id: Date.now().toString(),
      ...input,
      createdAt: new Date().toISOString(),
      createdBy,
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLead = (id: string, input: CreateLeadInput) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...input } : l))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <LeadsContext.Provider value={{ leads, addLead, updateLead, deleteLead }}>
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads() {
  const ctx = useContext(LeadsContext);
  if (!ctx) throw new Error('useLeads must be used within LeadsProvider');
  return ctx;
}
