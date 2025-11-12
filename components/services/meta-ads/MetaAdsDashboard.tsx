'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetaAdsCampaign } from '@/lib/types';
import { TrendingUp, Eye, MousePointerClick, DollarSign, Target, BarChart3 } from 'lucide-react';

interface MetaAdsDashboardProps {
  campaigns: MetaAdsCampaign[];
}

export default function MetaAdsDashboard({ campaigns }: MetaAdsDashboardProps) {
  const stats = useMemo(() => {
    const activeCampaigns = campaigns.filter((c) => c.status === 'ACTIVE');
    const totalSpend = campaigns.reduce((sum, c) => sum + (c.performance?.spend || 0), 0);
    const totalImpressions = campaigns.reduce((sum, c) => sum + (c.performance?.impressions || 0), 0);
    const totalClicks = campaigns.reduce((sum, c) => sum + (c.performance?.clicks || 0), 0);
    const totalReach = campaigns.reduce((sum, c) => sum + (c.performance?.reach || 0), 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + (c.performance?.conversions || 0), 0);
    const avgCTR = campaigns.length > 0
      ? campaigns.reduce((sum, c) => sum + (c.performance?.ctr || 0), 0) / campaigns.length
      : 0;
    const avgROAS = campaigns.length > 0
      ? campaigns.reduce((sum, c) => sum + (c.performance?.roas || 0), 0) / campaigns.length
      : 0;

    return {
      activeCampaigns: activeCampaigns.length,
      totalSpend,
      totalImpressions,
      totalClicks,
      totalReach,
      totalConversions,
      avgCTR,
      avgROAS,
    };
  }, [campaigns]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCampaigns}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.totalSpend.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalImpressions.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClicks.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReach.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConversions.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg CTR</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgCTR.toFixed(2)}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg ROAS</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgROAS.toFixed(2)}x</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Detailed analytics and charts will be displayed here. This section will show campaign performance trends,
            audience insights, and optimization recommendations.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

