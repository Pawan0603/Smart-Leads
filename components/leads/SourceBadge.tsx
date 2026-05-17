import { LeadSource } from '@/lib/types';
import { SOURCE_BG, SOURCE_COLORS } from '@/utils/statusHelpers';
import { cn } from '@/lib/utils';

export function SourceBadge({ source }: { source: LeadSource }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        SOURCE_BG[source],
        SOURCE_COLORS[source]
      )}
    >
      {source}
    </span>
  );
}
