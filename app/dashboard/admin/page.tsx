'use client';

import { useEffect, useMemo, useState } from 'react';

import {
  ShieldCheck,
  Users2,
  TrendingUp,
  Award,
  Phone,
  XCircle,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';

import {
  LeadStatus,
  LeadSource,
} from '@/lib/types';

import {
  STATUS_COLORS,
  STATUS_BG,
  SOURCE_BG,
  SOURCE_COLORS,
} from '@/utils/statusHelpers';

import { cn } from '@/lib/utils';
import Skeleton from './Skeleton';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminDashboardData {
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

  users: User[];
}

const STATUSES: LeadStatus[] = [
  'New',
  'Contacted',
  'Qualified',
  'Lost',
];

const STATUS_ICONS: Record<
  LeadStatus,
  React.ElementType
> = {
  New: TrendingUp,
  Contacted: Phone,
  Qualified: Award,
  Lost: XCircle,
};

export default function AdminPage() {
  const [loading, setLoading] = useState(true);

  const [dashboardData, setDashboardData] =
    useState<AdminDashboardData | null>(
      null
    );

  useEffect(() => {
    const fetchAdminDashboard =
      async () => {
        try {
          const response = await fetch(
            '/api/admin/dashboard'
          );

          const data =
            await response.json();

          setDashboardData(data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchAdminDashboard();
  }, []);

  const stats = useMemo(() => {
    if (!dashboardData) {
      return {
        total: 0,
        byStatus: [],
        bySource: [],
      };
    }

    const byStatus = [
      {
        label: 'New',
        count:
          dashboardData.stats.newLeads,
      },

      {
        label: 'Contacted',
        count:
          dashboardData.stats
            .contactedLeads,
      },

      {
        label: 'Qualified',
        count:
          dashboardData.stats
            .qualifiedLeads,
      },

      {
        label: 'Lost',
        count:
          dashboardData.stats
            .lostLeads,
      },
    ];

    const bySource = [
      {
        label: 'Website',
        count:
          dashboardData.sources.website,
      },

      {
        label: 'Instagram',
        count:
          dashboardData.sources
            .instagram,
      },

      {
        label: 'Referral',
        count:
          dashboardData.sources
            .referral,
      },
    ];

    return {
      total:
        dashboardData.stats.totalLeads,

      byStatus,

      bySource,
    };
  }, [dashboardData]);

  if (loading) {
    return (
      <Skeleton />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-primary" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Admin Panel
          </h1>

          <p className="text-sm text-muted-foreground">
            System overview and user
            management
          </p>
        </div>
      </div>

      {/* Total Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Leads */}
        <Card className="border border-border shadow-sm col-span-2 sm:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground">
                Total Leads
              </span>

              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Users2 className="w-4 h-4 text-primary" />
              </div>
            </div>

            <p className="text-3xl font-bold text-primary">
              {stats.total}
            </p>
          </CardContent>
        </Card>

        {/* Status Cards */}
        {stats.byStatus.map(
          ({ label, count }) => {
            const Icon =
              STATUS_ICONS[
                label as LeadStatus
              ];

            return (
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
                        STATUS_BG[
                          label as LeadStatus
                        ]
                      )}
                    >
                      <Icon
                        className={cn(
                          'w-4 h-4',
                          STATUS_COLORS[
                            label as LeadStatus
                          ]
                        )}
                      />
                    </div>
                  </div>

                  <p
                    className={cn(
                      'text-3xl font-bold',
                      STATUS_COLORS[
                        label as LeadStatus
                      ]
                    )}
                  >
                    {count}
                  </p>
                </CardContent>
              </Card>
            );
          }
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
            {stats.bySource.map(
              ({ label, count }) => {
                const pct =
                  stats.total > 0
                    ? Math.round(
                        (count /
                          stats.total) *
                          100
                      )
                    : 0;

                return (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span
                        className={cn(
                          'font-semibold text-xs px-2 py-0.5 rounded-full',
                          SOURCE_BG[
                            label as LeadSource
                          ],
                          SOURCE_COLORS[
                            label as LeadSource
                          ]
                        )}
                      >
                        {label}
                      </span>

                      <span className="text-muted-foreground text-sm">
                        {count} ({pct}%)
                      </span>
                    </div>

                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{
                          width: `${pct}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="border border-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              User Management
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-semibold text-foreground">
                    Name
                  </TableHead>

                  <TableHead className="font-semibold text-foreground">
                    Email
                  </TableHead>

                  <TableHead className="font-semibold text-foreground">
                    Role
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {dashboardData?.users.map(
                  (user) => (
                    <TableRow
                      key={user._id}
                      className="hover:bg-muted/30"
                    >
                      <TableCell className="font-medium text-foreground text-sm">
                        {user.name}
                      </TableCell>

                      <TableCell className="text-muted-foreground text-xs">
                        {user.email}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            user.role ===
                            'Admin'
                              ? 'default'
                              : 'secondary'
                          }
                          className="text-xs"
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}