import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Campaign } from '@/lib/types';
import { format } from 'date-fns';
import Link from 'next/link';
import { Briefcase, Calendar, DollarSign } from 'lucide-react';

interface SuggestedCampaignsProps {
  campaigns?: Campaign[];
}

export default function SuggestedCampaigns({ campaigns = [] }: SuggestedCampaignsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggested Campaigns</CardTitle>
        <CardDescription>Campaigns that match your profile</CardDescription>
      </CardHeader>
      <CardContent>
        {campaigns.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p>No suggested campaigns at the moment</p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/campaigns">Browse All Campaigns</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {campaigns.slice(0, 3).map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold">{campaign.title}</h3>
                    <Badge>{campaign.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {campaign.objective}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <DollarSign className="h-3 w-3 mr-1" />
                      Offer: ₹{campaign.budgetPerCreator.toLocaleString()}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {format(new Date(campaign.endDate), 'MMM dd, yyyy')}
                    </span>
                  </div>
                </div>
                <Button size="sm" asChild>
                  <Link href={`/campaigns/${campaign.id}`}>Apply</Link>
                </Button>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link href="/campaigns">View All Campaigns</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}


