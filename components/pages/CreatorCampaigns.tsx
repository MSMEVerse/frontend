'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase } from 'lucide-react';
import { mockCampaigns } from '@/lib/mocks';
import type { Campaign } from '@/lib/types';
import CampaignCard from '@/components/creator/CampaignCard';
import CampaignDetailsModal from '@/components/creator/CampaignDetailsModal';
import { useAuth } from '@/contexts/AuthContext';

export default function CreatorCampaigns() {
  const [selectedTab, setSelectedTab] = useState<'ongoing' | 'past' | 'applied'>('ongoing');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const { user } = useAuth();

  // Check if creator has applied to a campaign
  const hasApplied = (campaignId: string) => {
    const campaign = mockCampaigns.find((c) => c.id === campaignId);
    if (!campaign || !campaign.applications || !user) return false;
    return campaign.applications.some((app) => app.creatorId === user.id);
  };

  const getApplicationStatus = (campaignId: string): 'PENDING' | 'APPROVED' | 'REJECTED' | undefined => {
    const campaign = mockCampaigns.find((c) => c.id === campaignId);
    if (!campaign || !campaign.applications || !user) return undefined;
    const application = campaign.applications.find((app) => app.creatorId === user.id);
    return application?.status;
  };

  // Check if creator is selected/approved for a campaign
  const isSelected = (campaign: Campaign) => {
    if (!user || !campaign.selectedCreators) return false;
    return campaign.selectedCreators.includes(user.id);
  };

  // Ongoing campaigns: campaigns where creator is selected and status is ONGOING or PENDING_REVIEW
  const ongoingCampaigns = mockCampaigns.filter((c) => {
    if (!isSelected(c)) return false;
    return c.status === 'ONGOING' || c.status === 'PENDING_REVIEW';
  });

  // Past campaigns: campaigns that are COMPLETED/CLOSED/RELEASED where creator was selected
  const pastCampaigns = mockCampaigns.filter((c) => {
    if (!isSelected(c)) return false;
    return c.status === 'COMPLETED' || c.status === 'RELEASED' || c.status === 'CLOSED';
  });

  // Applied campaigns: campaigns where creator has applied (regardless of status)
  const appliedCampaigns = mockCampaigns.filter((c) => {
    return hasApplied(c.id);
  });

  const handleViewDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setDetailsModalOpen(true);
  };

  const handleApply = (campaignId: string) => {
    // This will be handled by the modal
    console.log('Apply to campaign:', campaignId);
  };

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
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="past">Past Campaigns</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing" className="space-y-4">
          {ongoingCampaigns.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No ongoing campaigns</p>
              <p className="text-sm mt-2">Campaigns you're currently working on will appear here</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ongoingCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  hasApplied={hasApplied(campaign.id)}
                  applicationStatus={getApplicationStatus(campaign.id)}
                  onViewDetails={() => handleViewDetails(campaign)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastCampaigns.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No past campaigns</p>
              <p className="text-sm mt-2">Completed campaigns will appear here</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  hasApplied={hasApplied(campaign.id)}
                  applicationStatus={getApplicationStatus(campaign.id)}
                  onViewDetails={() => handleViewDetails(campaign)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="applied" className="space-y-4">
          {appliedCampaigns.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>No applications yet</p>
              <p className="text-sm mt-2">Campaigns you've applied to will appear here</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appliedCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  hasApplied={hasApplied(campaign.id)}
                  applicationStatus={getApplicationStatus(campaign.id)}
                  onViewDetails={() => handleViewDetails(campaign)}
                  onApply={() => handleViewDetails(campaign)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {selectedCampaign && (
        <CampaignDetailsModal
          campaign={selectedCampaign}
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
          onApply={handleApply}
          hasApplied={hasApplied(selectedCampaign.id)}
          applicationStatus={getApplicationStatus(selectedCampaign.id)}
        />
      )}
    </div>
  );
}


