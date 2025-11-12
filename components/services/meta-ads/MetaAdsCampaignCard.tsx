'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MetaAdsCampaign } from '@/lib/types';
import { Facebook, Instagram, Edit, Eye, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

interface MetaAdsCampaignCardProps {
  campaign: MetaAdsCampaign;
  onEdit: (campaign: MetaAdsCampaign) => void;
  onViewDetails: (campaign: MetaAdsCampaign) => void;
}

export default function MetaAdsCampaignCard({
  campaign,
  onEdit,
  onViewDetails,
}: MetaAdsCampaignCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-600 dark:bg-green-600';
      case 'PAUSED':
        return 'bg-yellow-600 dark:bg-yellow-600';
      case 'DRAFT':
        return 'bg-gray-600 dark:bg-gray-600';
      case 'COMPLETED':
        return 'bg-blue-600 dark:bg-blue-600';
      default:
        return 'bg-gray-600 dark:bg-gray-600';
    }
  };

  const getPlatformIcon = (platform: string) => {
    if (platform === 'FACEBOOK') return <Facebook className="h-4 w-4" />;
    if (platform === 'INSTAGRAM') return <Instagram className="h-4 w-4" />;
    return (
      <div className="flex gap-1">
        <Facebook className="h-4 w-4" />
        <Instagram className="h-4 w-4" />
      </div>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{campaign.name}</CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
              <div className="flex items-center gap-1 text-muted-foreground">
                {getPlatformIcon(campaign.platform)}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Objective</p>
          <p className="font-medium">{campaign.objective}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-1">Budget</p>
          <p className="font-medium">₹{campaign.budget.toLocaleString()}</p>
          {campaign.dailyBudget && (
            <p className="text-xs text-muted-foreground">Daily: ₹{campaign.dailyBudget.toLocaleString()}</p>
          )}
        </div>

        {campaign.performance && (
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Impressions</span>
              <span className="font-medium">{campaign.performance.impressions.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Clicks</span>
              <span className="font-medium">{campaign.performance.clicks.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">CTR</span>
              <span className="font-medium">{campaign.performance.ctr.toFixed(2)}%</span>
            </div>
            {campaign.performance.roas && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">ROAS</span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {campaign.performance.roas.toFixed(2)}x
                </span>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails(campaign)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onEdit(campaign)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

