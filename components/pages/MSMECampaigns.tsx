'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CampaignCard from '@/components/msme/CampaignCard';
import CampaignApplicants from '@/components/msme/CampaignApplicants';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Users, Play } from 'lucide-react';
import Link from 'next/link';
import { CampaignStatus, Campaign } from '@/lib/types';
import { mockCampaigns } from '@/lib/mocks';
import { toast } from 'sonner';

export default function MSMECampaigns() {
  const [selectedTab, setSelectedTab] = useState<'open' | 'ongoing' | 'completed' | 'drafts'>('open');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [applicantsModalOpen, setApplicantsModalOpen] = useState(false);

  // Mock data - in real app, this would come from API
  const campaigns = mockCampaigns;

  const getCampaignsByStatus = (status: CampaignStatus[]) => {
    return campaigns.filter((campaign) => status.includes(campaign.status));
  };

  const openCampaigns = getCampaignsByStatus(['OPEN', 'PENDING']);
  const ongoingCampaigns = getCampaignsByStatus(['ONGOING', 'PENDING_REVIEW']);
  const completedCampaigns = getCampaignsByStatus(['COMPLETED', 'RELEASED', 'CLOSED']);
  const draftCampaigns = getCampaignsByStatus(['DRAFT']);

  const handleViewApplicants = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setApplicantsModalOpen(true);
  };

  const handleStartCampaign = async (campaign: Campaign) => {
    try {
      // TODO: Call API to start campaign
      console.log('Start campaign:', campaign.id);
      toast.success('Campaign started successfully!');
    } catch (error) {
      toast.error('Failed to start campaign');
    }
  };

  const canStartCampaign = (campaign: Campaign) => {
    const selectedCount = campaign.selectedCreators?.length || 0;
    return selectedCount > 0; // Can start if at least one creator is selected
  };

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
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="space-y-4">
          {openCampaigns.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No open campaigns</p>
              <Button asChild className="mt-4">
                <Link href="/campaigns/create">Create Your First Campaign</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {openCampaigns.map((campaign) => {
                const applicationsCount = campaign.applications?.length || 0;
                const selectedCount = campaign.selectedCreators?.length || 0;
                const canStart = canStartCampaign(campaign);

                return (
                  <div key={campaign.id} className="relative">
                    <CampaignCard campaign={campaign} />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      {applicationsCount > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewApplicants(campaign)}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          View Applicants ({applicationsCount})
                        </Button>
                      )}
                      {canStart && (
                        <Button
                          size="sm"
                          onClick={() => handleStartCampaign(campaign)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start Campaign
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>

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

      {/* Applicants Modal */}
      <Dialog open={applicantsModalOpen} onOpenChange={setApplicantsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedCampaign?.title} - Applicants
            </DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <CampaignApplicants
              campaign={selectedCampaign}
              onApplicationUpdate={() => {
                // Refresh campaigns data
                setApplicantsModalOpen(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}


