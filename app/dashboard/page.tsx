'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  Users2,
  TrendingUp,
  Phone,
  Award,
  XCircle,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  STATUS_BG,
  STATUS_COLORS,
} from '@/utils/statusHelpers';

import { cn } from '@/lib/utils';

interface RecentLead {
  _id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
}

interface DashboardData {
  stats: {
    totalLeads: number;
    newLeads: number;
    contactedLeads: number;
    qualifiedLeads: number;
    lostLeads: number;
  };

  sources: {
    website: number;
    instagram: number;
    referral: number;
  };

  recentLeads: RecentLead[];
}

interface StatCardData {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bg: string;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch('/api/dashboard');

        const data = await response.json();

        setDashboardData(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const stats = useMemo<StatCardData[]>(() => {
    if (!dashboardData) return [];

    return [
      {
        label: 'Total Leads',
        value: dashboardData.stats.totalLeads,
        icon: Users2,
        color: 'text-primary',
        bg: 'bg-primary/10',
      },

      {
        label: 'New',
        value: dashboardData.stats.newLeads,
        icon: TrendingUp,
        color: STATUS_COLORS.New,
        bg: STATUS_BG.New,
      },

      {
        label: 'Contacted',
        value: dashboardData.stats.contactedLeads,
        icon: Phone,
        color: STATUS_COLORS.Contacted,
        bg: STATUS_BG.Contacted,
      },

      {
        label: 'Qualified',
        value: dashboardData.stats.qualifiedLeads,
        icon: Award,
        color: STATUS_COLORS.Qualified,
        bg: STATUS_BG.Qualified,
      },

      {
        label: 'Lost',
        value: dashboardData.stats.lostLeads,
        icon: XCircle,
        color: STATUS_COLORS.Lost,
        bg: STATUS_BG.Lost,
      },
    ];
  }, [dashboardData]);

  const sourceBreakdown = useMemo(() => {
    if (!dashboardData) return [];

    const total =
      dashboardData.stats.totalLeads || 1;

    return [
      {
        source: 'Website',
        count: dashboardData.sources.website,
        percentage: Math.round(
          (dashboardData.sources.website / total) * 100
        ),
      },

      {
        source: 'Instagram',
        count: dashboardData.sources.instagram,
        percentage: Math.round(
          (dashboardData.sources.instagram / total) * 100
        ),
      },

      {
        source: 'Referral',
        count: dashboardData.sources.referral,
        percentage: Math.round(
          (dashboardData.sources.referral / total) * 100
        ),
      },
    ];
  }, [dashboardData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-lg font-medium">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Dashboard
        </h1>

        <p className="text-sm text-muted-foreground mt-1">
          Welcome back — here's your leads overview.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map(
          ({ label, value, icon: Icon, color, bg }) => (
            <Card
              key={label}
              className="border border-border shadow-sm"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-muted-foreground">
                    {label}
                  </span>

                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      bg
                    )}
                  >
                    <Icon className={cn('w-4 h-4', color)} />
                  </div>
                </div>

                <p className={cn('text-3xl font-bold', color)}>
                  {value}
                </p>
              </CardContent>
            </Card>
          )
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Breakdown */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              Leads by Source
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 pt-0 space-y-3">
            {sourceBreakdown.map(
              ({ source, count, percentage }) => (
                <div key={source}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">
                      {source}
                    </span>

                    <span className="text-muted-foreground">
                      {count} ({percentage}%)
                    </span>
                  </div>

                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              Recent Leads
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 pt-0 space-y-3">
            {dashboardData?.recentLeads.map((lead) => (
              <div
                key={lead._id}
                className="flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {lead.name}
                  </p>

                  <p className="text-xs text-muted-foreground truncate">
                    {lead.email}
                  </p>
                </div>

                <span
                  className={cn(
                    'shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full',
                    STATUS_BG[lead.status],
                    STATUS_COLORS[lead.status]
                  )}
                >
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