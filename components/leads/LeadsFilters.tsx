import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LeadStatus, LeadSource } from '@/lib/types';
import { SortOrder } from '@/hooks/useLeadsFilter';

interface LeadsFiltersProps {
  search: string;
  onSearchChange: (v: string) => void;
  status: LeadStatus | 'all';
  onStatusChange: (v: LeadStatus | 'all') => void;
  source: LeadSource | 'all';
  onSourceChange: (v: LeadSource | 'all') => void;
  sort: SortOrder;
  onSortChange: (v: SortOrder) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

export function LeadsFilters({
  search, onSearchChange,
  status, onStatusChange,
  source, onSourceChange,
  sort, onSortChange,
  onClearAll, hasActiveFilters,
}: LeadsFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 h-9"
        />
        {search && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => onSearchChange('')}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Status */}
      <Select value={status} onValueChange={(v) => onStatusChange(v as LeadStatus | 'all')}>
        <SelectTrigger className="h-9 w-full sm:w-36">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Contacted">Contacted</SelectItem>
          <SelectItem value="Qualified">Qualified</SelectItem>
          <SelectItem value="Lost">Lost</SelectItem>
        </SelectContent>
      </Select>

      {/* Source */}
      <Select value={source} onValueChange={(v) => onSourceChange(v as LeadSource | 'all')}>
        <SelectTrigger className="h-9 w-full sm:w-36">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          <SelectItem value="Website">Website</SelectItem>
          <SelectItem value="Instagram">Instagram</SelectItem>
          <SelectItem value="Referral">Referral</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select value={sort} onValueChange={(v) => onSortChange(v as SortOrder)}>
        <SelectTrigger className="h-9 w-full sm:w-32">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" className="h-9 px-3 shrink-0" onClick={onClearAll}>
          <X className="w-3.5 h-3.5 mr-1" /> Clear
        </Button>
      )}
    </div>
  );
}
