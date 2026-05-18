import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { StatusBadge } from './StatusBadge';
import { SourceBadge } from './SourceBadge';
import { Lead } from '@/lib/types';

interface LeadsTableProps {
  leads: Lead[];
  currentUserId: string;
  isAdmin: boolean;
  onView: (lead: Lead) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export function LeadsTable({ leads, currentUserId, isAdmin, onView, onEdit, onDelete }: LeadsTableProps) {
  const canDelete = (lead: Lead) => isAdmin || lead.createdBy._id === currentUserId;

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="font-semibold text-foreground">Name</TableHead>
              <TableHead className="font-semibold text-foreground">Email</TableHead>
              <TableHead className="font-semibold text-foreground">Status</TableHead>
              <TableHead className="font-semibold text-foreground">Source</TableHead>
              <TableHead className="font-semibold text-foreground">Created At</TableHead>
              <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead._id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium text-foreground">{lead.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{lead.email}</TableCell>
                <TableCell><StatusBadge status={lead.status} /></TableCell>
                <TableCell><SourceBadge source={lead.source} /></TableCell>
                <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit', month: 'short', year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 justify-end">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => onView(lead)}>
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => onEdit(lead)}>
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    {canDelete(lead) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onDelete(lead)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {leads.map((lead) => (
          <div
            key={lead._id}
            className="rounded-lg border border-border bg-card p-4 space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-sm">{lead.name}</p>
                <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
              </div>
              <StatusBadge status={lead.status} />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <SourceBadge source={lead.source} />
              <span className="text-xs text-muted-foreground">
                {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit', month: 'short', year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1 border-t border-border">
              <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs" onClick={() => onView(lead)}>
                <Eye className="w-3.5 h-3.5 mr-1" /> View
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs" onClick={() => onEdit(lead)}>
                <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
              </Button>
              {canDelete(lead) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 h-8 text-xs text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => onDelete(lead)}
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
