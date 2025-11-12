'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdRecommendation } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, Target, DollarSign } from 'lucide-react';

interface AdRecommendationsProps {
  recommendations: AdRecommendation[];
}

export default function AdRecommendations({ recommendations }: AdRecommendationsProps) {
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <p className="text-muted-foreground">No recommendations available.</p>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-600 dark:bg-red-600';
      case 'MEDIUM':
        return 'bg-yellow-600 dark:bg-yellow-600';
      case 'LOW':
        return 'bg-blue-600 dark:bg-blue-600';
      default:
        return 'bg-gray-600 dark:bg-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      {recommendations.map((rec) => (
        <Card key={rec.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">{rec.adType}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                  <Badge variant="secondary">{rec.objective}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <TrendingUp className="h-5 w-5" />
                <span className="text-2xl font-bold">{rec.expectedROI.toFixed(1)}x</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Reasoning:</p>
              <p className="text-sm text-muted-foreground">{rec.reasoning}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Budget</p>
                <p className="text-lg font-semibold">₹{rec.budget.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Expected ROI</p>
                <p className="text-lg font-semibold">{rec.expectedROI.toFixed(1)}x</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Age Range</p>
                <p className="text-lg font-semibold">
                  {rec.targetAudience.ageRange?.min}-{rec.targetAudience.ageRange?.max}
                </p>
              </div>
            </div>

            {rec.bestPractices && rec.bestPractices.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Best Practices:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {rec.bestPractices.map((practice, idx) => (
                    <li key={idx}>{practice}</li>
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

