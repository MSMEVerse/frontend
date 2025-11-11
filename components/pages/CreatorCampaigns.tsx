'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import Link from 'next/link';
import { Briefcase, Calendar, DollarSign, Eye } from 'lucide-react';
import { mockCampaigns } from '@/lib/mocks';
import type { Campaign } from '@/lib/types';

export default function CreatorCampaigns() {
  const [selectedTab, setSelectedTab] = useState<'open' | 'ongoing' | 'completed'>('open');

  // Mock data
  const openCampaigns = mockCampaigns.filter((c) => c.status === 'PENDING');
  const ongoingCampaigns = mockCampaigns.filter(
    (c) => c.status === 'ONGOING' || c.status === 'PENDING_REVIEW'
  );
  const completedCampaigns = mockCampaigns.filter(
    (c) => c.status === 'COMPLETED' || c.status === 'RELEASED'
  );

  const CampaignCard = ({ campaign }: { campaign: Campaign }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-lg">{campaign.title}</h3>
              <Badge>{campaign.type}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {campaign.msme?.profile?.companyName || 'MSME'}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              {campaign.objective}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-4">
                <span className="flex items-center text-muted-foreground">
                  <DollarSign className="h-4 w-4 mr-1" />
                  ₹{campaign.budget.toLocaleString()}
                </span>
                <span className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(campaign.deadline), 'MMM dd, yyyy')}
                </span>
              </div>
              <div className="text-muted-foreground">
                Deliverables: {campaign.deliverables.length} items
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/campaigns/${campaign.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </Button>
          {selectedTab === 'open' && (
            <Button size="sm" className="flex-1">
              Apply
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
        <p className="text-muted-foreground">
          Browse and manage your campaigns
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
        <TabsList>
          <TabsTrigger value="open">Open Opportunities</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="space-y-4">
          {openCampaigns.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No open campaigns at the moment</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {openCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="ongoing" className="space-y-4">
          {ongoingCampaigns.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No ongoing campaigns</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ongoingCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedCampaigns.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No completed campaigns</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

