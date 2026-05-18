'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';

import { Plus, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { toast } from 'sonner';

import { LeadsFilters } from '@/components/leads/LeadsFilters';

import { LeadsTable } from '@/components/leads/LeadsTable';

import { LeadsSkeleton } from '@/components/leads/LeadsSkeleton';

import { EmptyState } from '@/components/leads/EmptyState';

import { Pagination } from '@/components/leads/Pagination';

import { LeadFormModal } from '@/components/leads/LeadFormModal';

import { LeadDetailModal } from '@/components/leads/LeadDetailModal';

import { ConfirmDeleteDialog } from '@/components/leads/ConfirmDeleteDialog';

import { exportLeadsToCSV } from '@/utils/csvExport';

import {
  LeadStatus,
  LeadSource,
  SortOrder,
} from '@/lib/types';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  createdAt: string;

  createdBy: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function LeadsPage() {
  const [loading, setLoading] = useState(true);

  const [leads, setLeads] = useState<Lead[]>([]);

  const [pagination, setPagination] =
    useState<PaginationData>({
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 1,
    });

  const [search, setSearch] = useState('');

  const [status, setStatus] =
    useState<LeadStatus | 'all'>('all');

  const [source, setSource] =
    useState<LeadSource | 'all'>('all');

  const [sort, setSort] =
    useState<SortOrder>('latest');

  const [formOpen, setFormOpen] = useState(false);

  const [editLead, setEditLead] =
    useState<Lead | null>(null);

  const [viewLead, setViewLead] =
    useState<Lead | null>(null);

  const [deletingLead, setDeletingLead] =
    useState<Lead | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: String(pagination.page),
        sort,
      });

      if (search) {
        params.append('search', search);
      }

      if (status !== 'all') {
        params.append('status', status);
      }

      if (source !== 'all') {
        params.append('source', source);
      }

      const response = await axios.get(
        `/api/leads?${params.toString()}`
      );

      setLeads(response.data.data);

      setPagination(response.data.pagination);
    } catch (error) {
      console.log(error);

      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [
    pagination.page,
    search,
    status,
    source,
    sort,
  ]);

  const handleAddLead = () => {
    setEditLead(null);

    setFormOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setEditLead(lead);

    setFormOpen(true);
  };

  const handleFormSubmit = async (
    input: {
      name: string;
      email: string;
      source: string;
      status: string;
    }
  ) => {
    try {
      if (editLead) {
        await axios.patch(
          `/api/leads/${editLead._id}`,
          input
        );

        toast.success('Lead updated successfully');
      } else {
        await axios.post('/api/leads', input);

        toast.success('Lead created successfully');
      }

      setFormOpen(false);

      fetchLeads();
    } catch (error) {
      console.log(error);

      toast.error('Something went wrong');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingLead) return;

    try {
      await axios.delete(
        `/api/leads/${deletingLead._id}`
      );

      toast.success('Lead deleted successfully');

      setDeletingLead(null);

      fetchLeads();
    } catch (error) {
      console.log(error);

      toast.error('Failed to delete lead');
    }
  };

  const handleExportCSV = () => {
    exportLeadsToCSV(leads);

    toast.success('CSV exported successfully');
  };

  const clearAll = () => {
    setSearch('');

    setStatus('all');

    setSource('all');

    setSort('latest');
  };

  const hasActiveFilters =
    search !== '' ||
    status !== 'all' ||
    source !== 'all' ||
    sort !== 'latest';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Leads
          </h1>

          <p className="text-sm text-muted-foreground mt-0.5">
            {pagination.total}{' '}
            {pagination.total === 1
              ? 'lead'
              : 'leads'}{' '}
            found
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-1.5"
            onClick={handleExportCSV}
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>

          <Button
            size="sm"
            className="h-9 gap-1.5"
            onClick={handleAddLead}
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </Button>
        </div>
      </div>

      {/* Filters */}
      <LeadsFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        source={source}
        onSourceChange={setSource}
        sort={sort}
        onSortChange={setSort}
        onClearAll={clearAll}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Table */}
      <Card className="border border-border shadow-sm">
        <CardContent className="p-0 sm:p-4 space-y-4">
          {loading ? (
            <div className="p-4">
              <LeadsSkeleton />
            </div>
          ) : leads.length === 0 ? (
            <EmptyState
              hasFilters={hasActiveFilters}
            />
          ) : (
            <>
              <LeadsTable
                leads={leads}
                currentUserId="user-1"
                isAdmin={true}
                onView={(lead) =>
                  setViewLead(lead)
                }
                onEdit={(lead) =>
                  handleEditLead(lead)
                }
                onDelete={(lead) =>
                  setDeletingLead(lead)
                }
              />

              <Pagination
                page={pagination.page}
                totalPages={
                  pagination.totalPages
                }
                totalCount={pagination.total}
                pageSize={pagination.limit}
                onPageChange={(page) =>
                  setPagination((prev) => ({
                    ...prev,
                    page,
                  }))
                }
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <LeadFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        lead={editLead}
      />

      <LeadDetailModal
        open={viewLead !== null}
        onClose={() => setViewLead(null)}
        lead={viewLead}
      />

      <ConfirmDeleteDialog
        open={deletingLead !== null}
        lead={deletingLead}
        onConfirm={handleDeleteConfirm}
        onCancel={() =>
          setDeletingLead(null)
        }
      />
    </div>
  );
}