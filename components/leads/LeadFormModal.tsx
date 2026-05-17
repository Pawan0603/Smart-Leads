import { useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Lead, LeadStatus, LeadSource } from '@/lib/types';
import { CreateLeadInput } from '@/context/LeadsContext';

interface LeadFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: CreateLeadInput) => void;
  lead?: Lead | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  status?: string;
  source?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LeadFormModal({ open, onClose, onSubmit, lead }: LeadFormModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<LeadStatus | ''>('');
  const [source, setSource] = useState<LeadSource | ''>('');
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (open) {
      setName(lead?.name ?? '');
      setEmail(lead?.email ?? '');
      setStatus(lead?.status ?? '');
      setSource(lead?.source ?? '');
      setErrors({});
    }
  }, [open, lead]);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!name.trim()) e.name = 'Name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!EMAIL_RE.test(email)) e.email = 'Enter a valid email address';
    if (!status) e.status = 'Status is required';
    if (!source) e.source = 'Source is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit({ name: name.trim(), email: email.trim(), status: status as LeadStatus, source: source as LeadSource });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{lead ? 'Edit Lead' : 'Add New Lead'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Name */}
          <div className="space-y-1.5">
            <Label htmlFor="lead-name">Name <span className="text-destructive">*</span></Label>
            <Input
              id="lead-name"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="lead-email">Email <span className="text-destructive">*</span></Label>
            <Input
              id="lead-email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label>Status <span className="text-destructive">*</span></Label>
            <Select value={status} onValueChange={(v) => setStatus(v as LeadStatus)}>
              <SelectTrigger className={errors.status ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && <p className="text-xs text-destructive">{errors.status}</p>}
          </div>

          {/* Source */}
          <div className="space-y-1.5">
            <Label>Source <span className="text-destructive">*</span></Label>
            <Select value={source} onValueChange={(v) => setSource(v as LeadSource)}>
              <SelectTrigger className={errors.source ? 'border-destructive' : ''}>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
              </SelectContent>
            </Select>
            {errors.source && <p className="text-xs text-destructive">{errors.source}</p>}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{lead ? 'Update Lead' : 'Add Lead'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
