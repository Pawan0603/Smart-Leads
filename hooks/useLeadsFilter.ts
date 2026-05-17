import { useState, useMemo, useEffect, useRef } from 'react';
import { Lead, LeadStatus, LeadSource } from '@/lib/types';

export type SortOrder = 'latest' | 'oldest';

export interface FilterState {
  search: string;
  status: LeadStatus | 'all';
  source: LeadSource | 'all';
  sort: SortOrder;
}

const PAGE_SIZE = 10;

export function useLeadsFilter(leads: Lead[]) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState<LeadStatus | 'all'>('all');
  const [source, setSource] = useState<LeadSource | 'all'>('all');
  const [sort, setSort] = useState<SortOrder>('latest');
  const [page, setPage] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce search by 300ms
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [search]);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [status, source, sort]);

  const filtered = useMemo(() => {
    let result = [...leads];

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(
        (l) => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q)
      );
    }
    if (status !== 'all') result = result.filter((l) => l.status === status);
    if (source !== 'all') result = result.filter((l) => l.source === source);

    result.sort((a, b) =>
      sort === 'latest'
        ? b.createdAt.localeCompare(a.createdAt)
        : a.createdAt.localeCompare(b.createdAt)
    );

    return result;
  }, [leads, debouncedSearch, status, source, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return {
    search, setSearch,
    status, setStatus,
    source, setSource,
    sort, setSort,
    page: safePage, setPage,
    filtered,
    paginated,
    totalPages,
    totalCount: filtered.length,
    pageSize: PAGE_SIZE,
  };
}
