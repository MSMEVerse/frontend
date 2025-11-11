'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreatorPerformanceMetrics } from '@/lib/types';
import {
  TrendingUp,
  Eye,
  MousePointerClick,
  Target,
  ShoppingCart,
  DollarSign,
  Users,
  BarChart3,
} from 'lucide-react';

interface CreatorInsightsProps {
  metrics?: CreatorPerformanceMetrics;
  isLoading?: boolean;
}

export default function CreatorInsights({ metrics, isLoading }: CreatorInsightsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground py-8">
            No performance metrics available for this creator.
          </p>
        </CardContent>
      </Card>
    );
  }

  const formatNumber = (num?: number) => {
    if (num === undefined || num === null) return 'N/A';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatCurrency = (num?: number) => {
    if (num === undefined || num === null) return 'N/A';
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const formatPercentage = (num?: number) => {
    if (num === undefined || num === null) return 'N/A';
    return `${num.toFixed(2)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Period Badge */}
      {metrics.period && (
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-sm">
            {metrics.period.type === 'last7days' && 'Last 7 Days'}
            {metrics.period.type === 'last30days' && 'Last 30 Days'}
            {metrics.period.type === 'last90days' && 'Last 90 Days'}
            {metrics.period.type === 'custom' && 'Custom Period'}
          </Badge>
          {metrics.period.start && metrics.period.end && (
            <span className="text-sm text-muted-foreground">
              {new Date(metrics.period.start).toLocaleDateString()} -{' '}
              {new Date(metrics.period.end).toLocaleDateString()}
            </span>
          )}
        </div>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Reach */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reach</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.reach)}</div>
            <p className="text-xs text-muted-foreground mt-1">Unique users reached</p>
          </CardContent>
        </Card>

        {/* Impressions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.impressions)}</div>
            <p className="text-xs text-muted-foreground mt-1">Total ad views</p>
          </CardContent>
        </Card>

        {/* Clicks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.clicks)}</div>
            <p className="text-xs text-muted-foreground mt-1">Total clicks</p>
          </CardContent>
        </Card>

        {/* CTR */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CTR</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(metrics.ctr)}</div>
            <p className="text-xs text-muted-foreground mt-1">Click-through rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Cost Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPC</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.cpc)}</div>
            <p className="text-xs text-muted-foreground mt-1">Cost per click</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPM</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.cpm)}</div>
            <p className="text-xs text-muted-foreground mt-1">Cost per 1,000 impressions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(metrics.totalSpend)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Budget: {formatCurrency(metrics.totalBudget)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.conversions)}</div>
            <p className="text-xs text-muted-foreground mt-1">Total conversions</p>
            {metrics.conversionRate !== undefined && (
              <p className="text-xs text-green-600 mt-1">
                {formatPercentage(metrics.conversionRate)} conversion rate
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.leads)}</div>
            <p className="text-xs text-muted-foreground mt-1">Total leads generated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Add to Cart</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.addToCart)}</div>
            <p className="text-xs text-muted-foreground mt-1">Cart additions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Purchases</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.purchases)}</div>
            <p className="text-xs text-muted-foreground mt-1">Total purchases</p>
          </CardContent>
        </Card>
      </div>

      {/* ROAS Card */}
      {metrics.roas !== undefined && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>ROAS (Return on Ad Spend)</span>
            </CardTitle>
            <CardDescription>
              Measures the effectiveness of advertising campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
              {metrics.roas > 1 ? `${metrics.roas.toFixed(2)}x` : formatPercentage(metrics.roas * 100)}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              For every ₹1 spent, you get ₹{metrics.roas.toFixed(2)} in return
            </p>
            {metrics.roas >= 3 && (
              <Badge className="mt-2 bg-green-500">Excellent Performance</Badge>
            )}
            {metrics.roas >= 2 && metrics.roas < 3 && (
              <Badge className="mt-2 bg-blue-500">Good Performance</Badge>
            )}
            {metrics.roas < 2 && (
              <Badge className="mt-2 bg-yellow-500">Needs Improvement</Badge>
            )}
          </CardContent>
        </Card>
      )}

      {/* Attribution Window */}
      {metrics.attributionWindow && (
        <Card>
          <CardHeader>
            <CardTitle>Attribution Window Performance</CardTitle>
            <CardDescription>
              Conversion data based on different attribution windows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.attributionWindow['1dayClick'] !== undefined && (
                <div className="text-center p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">1-Day Click</p>
                  <p className="text-xl font-bold mt-1">
                    {formatNumber(metrics.attributionWindow['1dayClick'])}
                  </p>
                </div>
              )}
              {metrics.attributionWindow['7dayClick'] !== undefined && (
                <div className="text-center p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">7-Day Click</p>
                  <p className="text-xl font-bold mt-1">
                    {formatNumber(metrics.attributionWindow['7dayClick'])}
                  </p>
                </div>
              )}
              {metrics.attributionWindow['1dayView'] !== undefined && (
                <div className="text-center p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">1-Day View</p>
                  <p className="text-xl font-bold mt-1">
                    {formatNumber(metrics.attributionWindow['1dayView'])}
                  </p>
                </div>
              )}
              {metrics.attributionWindow['7dayView'] !== undefined && (
                <div className="text-center p-3 border rounded-lg">
                  <p className="text-sm text-muted-foreground">7-Day View</p>
                  <p className="text-xl font-bold mt-1">
                    {formatNumber(metrics.attributionWindow['7dayView'])}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

