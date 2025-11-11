'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CampaignCard from '@/components/msme/CampaignCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { CampaignStatus } from '@/lib/types';
import { mockCampaigns } from '@/lib/mocks';

export default function MSMECampaigns() {
  const [selectedTab, setSelectedTab] = useState<'ongoing' | 'completed' | 'drafts'>('ongoing');

  // Mock data - in real app, this would come from API
  const campaigns = mockCampaigns;

  const getCampaignsByStatus = (status: CampaignStatus[]) => {
    return campaigns.filter((campaign) => status.includes(campaign.status));
  };

  const ongoingCampaigns = getCampaignsByStatus(['ONGOING', 'PENDING_REVIEW']);
  const completedCampaigns = getCampaignsByStatus(['COMPLETED', 'RELEASED']);
  const draftCampaigns = getCampaignsByStatus(['DRAFT', 'PENDING']);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage your influencer marketing campaigns
          </p>
        </div>
        <Button asChild>
          <Link href="/campaigns/create">
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Link>
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
        <TabsList>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing" className="space-y-4">
          {ongoingCampaigns.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No ongoing campaigns</p>
              <Button asChild className="mt-4">
                <Link href="/campaigns/create">Create Your First Campaign</Link>
              </Button>
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

        <TabsContent value="drafts" className="space-y-4">
          {draftCampaigns.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No draft campaigns</p>
              <Button asChild className="mt-4">
                <Link href="/campaigns/create">Create a Campaign</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {draftCampaigns.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

