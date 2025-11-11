import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Campaign } from '@/lib/types';
import { format } from 'date-fns';
import Link from 'next/link';
import { Eye, MessageCircle, Upload } from 'lucide-react';

interface OngoingCampaignsProps {
  campaigns?: Campaign[];
}

export default function OngoingCampaigns({ campaigns = [] }: OngoingCampaignsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ongoing Campaigns</CardTitle>
        <CardDescription>Campaigns you're currently working on</CardDescription>
      </CardHeader>
      <CardContent>
        {campaigns.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No ongoing campaigns</p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/campaigns">Find Campaigns</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold">{campaign.title}</h3>
                    <Badge className="bg-blue-100 text-blue-800">
                      {campaign.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {campaign.msme?.profile?.companyName || 'MSME'}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Deadline: {format(new Date(campaign.deadline), 'MMM dd, yyyy')}</span>
                    <span>Deliverables: {campaign.deliverables.length}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/campaigns/${campaign.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/campaigns/${campaign.id}/upload`}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Link>
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

