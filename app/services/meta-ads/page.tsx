'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Megaphone, FileText, CheckCircle2, BarChart3 } from 'lucide-react';
import { mockMetaAdsCampaigns } from '@/lib/mocks';
import { MetaAdsCampaign, MetaAdsStatus } from '@/lib/types';
import MetaAdsDashboard from '@/components/services/meta-ads/MetaAdsDashboard';
import MetaAdsCampaignList from '@/components/services/meta-ads/MetaAdsCampaignList';
import MetaAdsCampaignForm from '@/components/services/meta-ads/MetaAdsCampaignForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function MetaAdsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'active' | 'drafts' | 'completed' | 'analytics'>('active');
  const [campaignFormOpen, setCampaignFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<MetaAdsCampaign | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const activeCampaigns = useMemo(() => {
    if (!user) return [];
    return mockMetaAdsCampaigns.filter(
      (c) => c.msmeId === user.id && (c.status === 'ACTIVE' || c.status === 'PAUSED')
    );
  }, [user]);

  const draftCampaigns = useMemo(() => {
    if (!user) return [];
    return mockMetaAdsCampaigns.filter((c) => c.msmeId === user.id && c.status === 'DRAFT');
  }, [user]);

  const completedCampaigns = useMemo(() => {
    if (!user) return [];
    return mockMetaAdsCampaigns.filter((c) => c.msmeId === user.id && c.status === 'COMPLETED');
  }, [user]);

  const handleCreateCampaign = () => {
    setEditingCampaign(null);
    setCampaignFormOpen(true);
  };

  const handleEditCampaign = (campaign: MetaAdsCampaign) => {
    setEditingCampaign(campaign);
    setCampaignFormOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'MSME') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight dark:text-[#FFFFFF]">Meta Ads Campaigns</h1>
          <p className="text-muted-foreground dark:text-[#B9BBBE]">
            Manage your Facebook and Instagram advertising campaigns
          </p>
        </div>
        <Button onClick={handleCreateCampaign}>
          <Plus className="h-4 w-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
        <TabsList>
          <TabsTrigger value="active">
            <Megaphone className="h-4 w-4 mr-2" />
            Active ({activeCampaigns.length})
          </TabsTrigger>
          <TabsTrigger value="drafts">
            <FileText className="h-4 w-4 mr-2" />
            Drafts ({draftCampaigns.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Completed ({completedCampaigns.length})
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <MetaAdsCampaignList
            campaigns={activeCampaigns}
            onEdit={handleEditCampaign}
            onViewDetails={(campaign) => {
              setEditingCampaign(campaign);
              setCampaignFormOpen(true);
            }}
          />
        </TabsContent>

        <TabsContent value="drafts" className="mt-6">
          <MetaAdsCampaignList
            campaigns={draftCampaigns}
            onEdit={handleEditCampaign}
            onViewDetails={(campaign) => {
              setEditingCampaign(campaign);
              setCampaignFormOpen(true);
            }}
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <MetaAdsCampaignList
            campaigns={completedCampaigns}
            onEdit={handleEditCampaign}
            onViewDetails={(campaign) => {
              setEditingCampaign(campaign);
              setCampaignFormOpen(true);
            }}
          />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <MetaAdsDashboard campaigns={mockMetaAdsCampaigns.filter((c) => c.msmeId === user.id)} />
        </TabsContent>
      </Tabs>

      <Dialog open={campaignFormOpen} onOpenChange={setCampaignFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
            </DialogTitle>
          </DialogHeader>
          <MetaAdsCampaignForm
            campaign={editingCampaign}
            onSuccess={() => {
              setCampaignFormOpen(false);
              setEditingCampaign(null);
            }}
            onCancel={() => {
              setCampaignFormOpen(false);
              setEditingCampaign(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

