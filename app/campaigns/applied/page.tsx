'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { mockCampaigns } from '@/lib/mocks';
import type { Campaign } from '@/lib/types';
import CampaignPageLayout from '@/components/campaigns/CampaignPageLayout';
import { StatCard } from '@/components/campaigns/CampaignStats';
import CampaignCard from '@/components/creator/CampaignCard';
import CampaignDetailsModal from '@/components/creator/CampaignDetailsModal';
import { FileText, Clock, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function AppliedCampaignsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'all' | 'PENDING' | 'APPROVED' | 'REJECTED'>('all');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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

  // Get applied campaigns
  const appliedCampaigns = useMemo(() => {
    let filtered = mockCampaigns.filter((c) => hasApplied(c.id));
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter((c) => getApplicationStatus(c.id) === statusFilter);
    }
    
    return filtered;
  }, [user, statusFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const allApplied = mockCampaigns.filter((c) => hasApplied(c.id));
    const pending = allApplied.filter((c) => getApplicationStatus(c.id) === 'PENDING').length;
    const approved = allApplied.filter((c) => getApplicationStatus(c.id) === 'APPROVED').length;
    const rejected = allApplied.filter((c) => getApplicationStatus(c.id) === 'REJECTED').length;
    const approvalRate = allApplied.length > 0 ? (approved / allApplied.length) * 100 : 0;

    return {
      count: allApplied.length,
      pending,
      approved,
      rejected,
      approvalRate,
    };
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <CampaignPageLayout
        title="Applied Campaigns"
        description="Track the status of your campaign applications"
        stats={
          <>
            <StatCard
              title="Total Applications"
              value={stats.count}
              icon={FileText}
              description="All time"
            />
            <StatCard
              title="Pending"
              value={stats.pending}
              icon={Clock}
              description="Awaiting response"
            />
            <StatCard
              title="Approved"
              value={stats.approved}
              icon={CheckCircle2}
              description="Accepted applications"
            />
            <StatCard
              title="Approval Rate"
              value={`${Math.round(stats.approvalRate)}%`}
              icon={TrendingUp}
              description="Success rate"
            />
          </>
        }
      >
        <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)} className="w-full">
          <TabsList>
            <TabsTrigger value="all">All ({stats.count})</TabsTrigger>
            <TabsTrigger value="PENDING">Pending ({stats.pending})</TabsTrigger>
            <TabsTrigger value="APPROVED">Approved ({stats.approved})</TabsTrigger>
            <TabsTrigger value="REJECTED">Rejected ({stats.rejected})</TabsTrigger>
          </TabsList>

          <TabsContent value={statusFilter} className="mt-6">
            {appliedCampaigns.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {statusFilter === 'all'
                    ? 'You haven\'t applied to any campaigns yet.'
                    : `No ${statusFilter.toLowerCase()} applications.`}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {appliedCampaigns.map((campaign) => {
                  const status = getApplicationStatus(campaign.id);
                  return (
                    <div key={campaign.id} className="relative">
                      <CampaignCard
                        campaign={campaign}
                        onViewDetails={() => {
                          setSelectedCampaign(campaign);
                          setDetailsModalOpen(true);
                        }}
                        onApply={() => {}}
                      />
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant={
                            status === 'APPROVED'
                              ? 'default'
                              : status === 'REJECTED'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CampaignPageLayout>

      {selectedCampaign && (
        <CampaignDetailsModal
          campaign={selectedCampaign}
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
        />
      )}
    </>
  );
}

