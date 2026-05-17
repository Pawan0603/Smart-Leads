import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Lead } from '@/lib/types';
import { StatusBadge } from './StatusBadge';
import { SourceBadge } from './SourceBadge';
import { Separator } from '@/components/ui/separator';

interface LeadDetailModalProps {
  open: boolean;
  onClose: () => void;
  lead: Lead | null;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
      <div className="text-sm text-foreground">{children}</div>
    </div>
  );
}

export function LeadDetailModal({ open, onClose, lead }: LeadDetailModalProps) {
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-primary font-bold text-lg">
                {lead.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-semibold text-foreground">{lead.name}</p>
              <p className="text-sm text-muted-foreground">{lead.email}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <Field label="Status">
              <StatusBadge status={lead.status} />
            </Field>
            <Field label="Source">
              <SourceBadge source={lead.source} />
            </Field>
            <Field label="Created At">
              {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                day: '2-digit', month: 'long', year: 'numeric',
              })}
            </Field>
            <Field label="Lead ID">
              <span className="font-mono text-xs text-muted-foreground">#{lead.id}</span>
            </Field>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
