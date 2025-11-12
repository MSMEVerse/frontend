'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Campaign } from '@/lib/types';
import { format } from 'date-fns';
import { Calendar, DollarSign, Users, Eye, MessageCircle } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  hasApplied?: boolean;
  applicationStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
  onViewDetails?: () => void;
  onApply?: () => void;
}

export default function CampaignCard({
  campaign,
  hasApplied = false,
  applicationStatus,
  onViewDetails,
  onApply,
}: CampaignCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg line-clamp-2">{campaign.title}</h3>
              <Badge variant="outline" className="ml-2 shrink-0">
                {campaign.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {campaign.objective}
            </p>
            {campaign.msme?.profile?.companyName && (
              <p className="text-xs text-muted-foreground">
                by {campaign.msme.profile.companyName}
              </p>
            )}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {format(new Date(campaign.startDate), 'MMM dd')} -{' '}
                {format(new Date(campaign.endDate), 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                Offer: ₹{campaign.budgetPerCreator.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {campaign.creatorsCount} creators needed
              </span>
            </div>
            <div className="text-muted-foreground">
              {campaign.deliverables.length} deliverable{campaign.deliverables.length !== 1 ? 's' : ''}
            </div>
          </div>

          {hasApplied && applicationStatus && (
            <div>
              {applicationStatus === 'PENDING' && (
                <Badge variant="secondary">Application Pending</Badge>
              )}
              {applicationStatus === 'APPROVED' && (
                <Badge variant="default" className="bg-green-600">Approved</Badge>
              )}
              {applicationStatus === 'REJECTED' && (
                <Badge variant="destructive">Rejected</Badge>
              )}
            </div>
          )}

          <div className="flex space-x-2 pt-2 min-w-0">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 min-w-0"
              onClick={onViewDetails}
            >
              <Eye className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">View Details</span>
            </Button>
            {!hasApplied ? (
              <Button
                size="sm"
                className="flex-1 min-w-0"
                onClick={onApply}
              >
                <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">Apply</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="flex-1 min-w-0"
                onClick={onViewDetails}
              >
                <span className="truncate">View Application</span>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

