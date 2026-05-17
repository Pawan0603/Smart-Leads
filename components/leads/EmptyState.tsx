import { Users2 } from 'lucide-react';

interface EmptyStateProps {
  hasFilters: boolean;
}

export function EmptyState({ hasFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
        <Users2 className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground">
        {hasFilters ? 'No leads match your filters' : 'No leads yet'}
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        {hasFilters
          ? 'Try adjusting or clearing your search and filter criteria.'
          : 'Get started by adding your first lead.'}
      </p>
    </div>
  );
}
