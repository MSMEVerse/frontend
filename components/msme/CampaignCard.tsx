import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Campaign, CampaignStatus } from '@/lib/types';
import { format } from 'date-fns';
import { Eye, MessageCircle, Calendar, DollarSign, Users, FileText } from 'lucide-react';
import Link from 'next/link';

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const getStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case 'OPEN':
        return 'bg-green-100 text-green-800';
      case 'ONGOING':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      case 'PENDING_REVIEW':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const applicationsCount = campaign.applications?.length || 0;
  const selectedCount = campaign.selectedCreators?.length || 0;
  const slotsFilled = `${selectedCount}/${campaign.creatorsCount}`;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-lg">{campaign.title}</h3>
              <Badge className={getStatusColor(campaign.status)}>
                {campaign.status.replace('_', ' ')}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {campaign.objective}
            </p>
          </div>
        </div>

        {campaign.creator && (
          <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg">
            <Avatar className="h-8 w-8">
              <AvatarImage src={campaign.creator.avatar} />
              <AvatarFallback>
                {campaign.creator.firstName?.[0] || campaign.creator.email[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {campaign.creator.firstName && campaign.creator.lastName
                  ? `${campaign.creator.firstName} ${campaign.creator.lastName}`
                  : campaign.creator.email}
              </p>
              <p className="text-xs text-muted-foreground">Creator</p>
            </div>
          </div>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Duration
            </span>
            <span>
              {format(new Date(campaign.startDate), 'MMM dd')} - {format(new Date(campaign.endDate), 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Total Budget
            </span>
            <span className="font-semibold">₹{campaign.totalBudget.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Creators
            </span>
            <span>{slotsFilled} selected</span>
          </div>
          {campaign.status === 'OPEN' && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                Applications
              </span>
              <span className="font-semibold">{applicationsCount}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Deliverables</span>
            <span>{campaign.deliverables.length} items</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-2 min-w-0">
        <Button variant="outline" size="sm" className="flex-1 min-w-0" asChild>
          <Link href={`/campaigns/${campaign.id}`}>
            <Eye className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">View Details</span>
          </Link>
        </Button>
        {campaign.creator && (
          <Button variant="outline" size="sm" className="flex-1 min-w-0">
            <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">Message</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}


