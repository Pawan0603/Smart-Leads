'use client';
import { useState, useEffect } from 'react';
import { Plus, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLeads, CreateLeadInput } from '@/context/LeadsContext';
import { useAppContext } from '@/context/AppContext';
import { useLeadsFilter } from '@/hooks/useLeadsFilter';
import { toast } from "sonner"
import { Lead } from '@/lib/types';
import { LeadsFilters } from '@/components/leads/LeadsFilters';
import { LeadsTable } from '@/components/leads/LeadsTable';
import { LeadsSkeleton } from '@/components/leads/LeadsSkeleton';
import { EmptyState } from '@/components/leads/EmptyState';
import { Pagination } from '@/components/leads/Pagination';
import { LeadFormModal } from '@/components/leads/LeadFormModal';
import { LeadDetailModal } from '@/components/leads/LeadDetailModal';
import { ConfirmDeleteDialog } from '@/components/leads/ConfirmDeleteDialog';
import { exportLeadsToCSV } from '@/utils/csvExport';
import axios, { AxiosError } from 'axios';

export default function LeadsPage() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  const { role } = useAppContext();

  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);

  // Simulate initial loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const {
    search, setSearch,
    status, setStatus,
    source, setSource,
    sort, setSort,
    page, setPage,
    filtered,
    paginated,
    totalPages,
    totalCount,
    pageSize,
  } = useLeadsFilter(leads);

  const hasActiveFilters = search !== '' || status !== 'all' || source !== 'all' || sort !== 'latest';

  const clearAll = () => {
    setSearch('');
    setStatus('all');
    setSource('all');
    setSort('latest');
  };

  const handleAddLead = () => {
    setEditLead(null);
    setFormOpen(true);
  };

  const handleEditLead = (lead: Lead) => {
    setEditLead(lead);
    setFormOpen(true);
  };

  const handleFormSubmit = async (input: CreateLeadInput) => {
    if (editLead) {
      updateLead(editLead.id, input);
      toast("Lead updated", { description: `${input.name} has been updated successfully.` });
    } else {
      
      try {
        const res = await axios.post('/api/leads', input);
        console.log(res.data);
        addLead(input, 'user-1');
        toast("Lead added", { description: `${input.name} has been added successfully.` });
      } catch (err) {
        const error = err as AxiosError<{ error: string }>
        toast.error(error.response?.data.error || "Something went wrong.")
      }
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingLead) {
      deleteLead(deletingLead.id);
      toast("Lead deleted", { description: `${deletingLead.name} has been removed.` });
      setDeletingLead(null);
    }
  };

  const handleExportCSV = () => {
    exportLeadsToCSV(filtered);
    toast(`Exported ${filtered.length} leads to CSV.`);
  };

  const currentUserId = role === 'Admin' ? 'user-1' : 'user-2';
  const isAdmin = role === 'Admin';

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leads</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {totalCount} {totalCount === 1 ? 'lead' : 'leads'} found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-1.5" onClick={handleExportCSV}>
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button size="sm" className="h-9 gap-1.5" onClick={handleAddLead}>
            <Plus className="w-4 h-4" /> Add Lead
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
          ) : paginated.length === 0 ? (
            <EmptyState hasFilters={hasActiveFilters} />
          ) : (
            <>
              <LeadsTable
                leads={paginated}
                currentUserId={currentUserId}
                isAdmin={isAdmin}
                onView={(l) => setViewLead(l)}
                onEdit={handleEditLead}
                onDelete={(l) => setDeletingLead(l)}
              />
              <Pagination
                page={page}
                totalPages={totalPages}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={setPage}
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
        onCancel={() => setDeletingLead(null)}
      />
    </div>
  );
}
