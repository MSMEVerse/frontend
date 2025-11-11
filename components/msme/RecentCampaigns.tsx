import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Campaign, CampaignStatus } from '@/lib/types';
import { format } from 'date-fns';
import Link from 'next/link';
import { Eye, MessageCircle } from 'lucide-react';

interface RecentCampaignsProps {
  campaigns?: Campaign[];
}

export default function RecentCampaigns({ campaigns = [] }: RecentCampaignsProps) {
  const getStatusColor = (status: CampaignStatus) => {
    switch (status) {
      case 'ONGOING':
        return 'bg-blue-100 text-blue-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Campaigns</CardTitle>
        <CardDescription>Your latest campaign activities</CardDescription>
      </CardHeader>
      <CardContent>
        {campaigns.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No campaigns yet</p>
            <Button asChild className="mt-4">
              <Link href="/campaigns/create">Create Your First Campaign</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold">{campaign.title}</h3>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {campaign.objective}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Budget: ₹{campaign.budget.toLocaleString()}</span>
                    <span>
                      Deadline: {format(new Date(campaign.deadline), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/campaigns/${campaign.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

