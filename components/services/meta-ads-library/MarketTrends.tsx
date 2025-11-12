'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MarketTrend } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

interface MarketTrendsProps {
  trends: MarketTrend[];
}

export default function MarketTrends({ trends }: MarketTrendsProps) {
  if (trends.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <p className="text-muted-foreground">No market trends available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {trends.map((trend) => (
        <Card key={trend.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">{trend.trend}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{trend.category}</Badge>
                  <span className="text-sm text-muted-foreground">{trend.timeframe}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <TrendingUp className="h-5 w-5" />
                <span className="text-2xl font-bold">+{trend.percentage}%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{trend.recommendation}</p>
            {trend.data && (
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(trend.data).map(([key, value]) => (
                  <div key={key} className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{key}</p>
                    <p className="text-lg font-semibold">{typeof value === 'number' ? value.toLocaleString() : String(value)}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

