'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetaAdsInsight } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CompanyPerformanceProps {
  insights: MetaAdsInsight[];
}

export default function CompanyPerformance({ insights }: CompanyPerformanceProps) {
  if (insights.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <p className="text-muted-foreground">No company performance insights available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {insights.map((insight) => (
        <Card key={insight.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">{insight.title}</CardTitle>
              <Badge variant="secondary">{insight.type}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{insight.description}</p>
            
            {insight.data && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                {Object.entries(insight.data).map(([key, value]) => (
                  <div key={key} className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">{key}</p>
                    <p className="text-lg font-semibold">{typeof value === 'number' ? value.toLocaleString() : String(value)}</p>
                  </div>
                ))}
              </div>
            )}

            {insight.recommendations && insight.recommendations.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Recommendations:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {insight.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

