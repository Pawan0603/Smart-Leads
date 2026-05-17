import { LeadStatus } from '@/lib/types';
import { STATUS_BG, STATUS_COLORS } from '@/utils/statusHelpers';
import { cn } from '@/lib/utils';

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
        STATUS_BG[status],
        STATUS_COLORS[status]
      )}
    >
      {status}
    </span>
  );
}
