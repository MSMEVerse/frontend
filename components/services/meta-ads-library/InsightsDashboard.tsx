'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetaAdsInsight } from '@/lib/types';
import { TrendingUp, Eye, Target, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface InsightsDashboardProps {
  insights: MetaAdsInsight[];
}

export default function InsightsDashboard({ insights }: InsightsDashboardProps) {
  const companyInsights = insights.filter((i) => i.category === 'COMPANY_PERFORMANCE');
  const marketInsights = insights.filter((i) => i.category === 'MARKET_TRENDS');

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Insights</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Company Insights</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companyInsights.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Trends</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketInsights.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recommendations</CardTitle>
            <Lightbulb className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insights.reduce((sum, i) => sum + (i.recommendations?.length || 0), 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {insights.slice(0, 4).map((insight) => (
          <Card key={insight.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{insight.title}</CardTitle>
                <Badge variant="secondary">{insight.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{insight.description}</p>
              {insight.recommendations && insight.recommendations.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Recommendations:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {insight.recommendations.slice(0, 3).map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

