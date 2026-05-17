'use client';
import { useMemo } from 'react';
import { Users2, TrendingUp, Phone, Award, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLeads } from '@/context/LeadsContext';
import { LeadStatus } from '@/lib/types';
import { STATUS_COLORS, STATUS_BG } from '@/utils/statusHelpers';
import { cn } from '@/lib/utils';

interface StatCardData {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bg: string;
}

export default function DashboardPage() {
  const { leads } = useLeads();

  const stats = useMemo<StatCardData[]>(() => {
    const counts = leads.reduce<Record<LeadStatus, number>>(
      (acc, l) => { acc[l.status]++; return acc; },
      { New: 0, Contacted: 0, Qualified: 0, Lost: 0 }
    );
    return [
      { label: 'Total Leads', value: leads.length, icon: Users2,    color: 'text-primary', bg: 'bg-primary/10' },
      { label: 'New',         value: counts.New,    icon: TrendingUp, color: STATUS_COLORS.New,       bg: STATUS_BG.New },
      { label: 'Contacted',   value: counts.Contacted, icon: Phone,  color: STATUS_COLORS.Contacted,  bg: STATUS_BG.Contacted },
      { label: 'Qualified',   value: counts.Qualified, icon: Award,  color: STATUS_COLORS.Qualified,  bg: STATUS_BG.Qualified },
      { label: 'Lost',        value: counts.Lost,   icon: XCircle,   color: STATUS_COLORS.Lost,       bg: STATUS_BG.Lost },
    ];
  }, [leads]);

  const sourceBreakdown = useMemo(() => {
    return ['Website', 'Instagram', 'Referral'].map((src) => ({
      source: src,
      count: leads.filter((l) => l.source === src).length,
    }));
  }, [leads]);

  const recentLeads = useMemo(
    () => [...leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5),
    [leads]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back — here's your leads overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="border border-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
                <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', bg)}>
                  <Icon className={cn('w-4 h-4', color)} />
                </div>
              </div>
              <p className={cn('text-3xl font-bold', color)}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Breakdown */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Leads by Source</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-3">
            {sourceBreakdown.map(({ source, count }) => {
              const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
              return (
                <div key={source}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">{source}</span>
                    <span className="text-muted-foreground">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Leads</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-3">
            {recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                </div>
                <span className={cn('shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full', STATUS_BG[lead.status], STATUS_COLORS[lead.status])}>
                  {lead.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
