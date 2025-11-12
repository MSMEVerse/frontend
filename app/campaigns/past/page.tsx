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
import { CheckCircle2, DollarSign, TrendingUp, Award } from 'lucide-react';
import { format } from 'date-fns';

export default function PastCampaignsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Check if creator is selected for a campaign
  const isSelected = (campaign: Campaign) => {
    if (!user || !campaign.selectedCreators) return false;
    return campaign.selectedCreators.includes(user.id);
  };

  // Get past campaigns
  const pastCampaigns = useMemo(() => {
    return mockCampaigns.filter((c) => {
      if (!isSelected(c)) return false;
      return c.status === 'COMPLETED' || c.status === 'RELEASED' || c.status === 'CLOSED';
    });
  }, [user]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalEarnings = pastCampaigns.reduce((sum, c) => sum + (c.budgetPerCreator || 0), 0);
    const completed = pastCampaigns.filter((c) => c.status === 'COMPLETED').length;
    const successRate = pastCampaigns.length > 0 ? (completed / pastCampaigns.length) * 100 : 0;
    const avgEarnings = pastCampaigns.length > 0 ? totalEarnings / pastCampaigns.length : 0;

    return {
      count: pastCampaigns.length,
      totalEarnings,
      successRate,
      avgEarnings,
    };
  }, [pastCampaigns]);

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
        title="Past Campaigns"
        description="View your completed and closed campaigns"
        stats={
          <>
            <StatCard
              title="Total Completed"
              value={stats.count}
              icon={CheckCircle2}
              description="Past campaigns"
            />
            <StatCard
              title="Total Earnings"
              value={`₹${(stats.totalEarnings / 1000).toFixed(0)}K`}
              icon={DollarSign}
              description="From all past campaigns"
            />
            <StatCard
              title="Success Rate"
              value={`${Math.round(stats.successRate)}%`}
              icon={TrendingUp}
              description="Completion rate"
            />
            <StatCard
              title="Avg Earnings"
              value={`₹${(stats.avgEarnings / 1000).toFixed(0)}K`}
              icon={Award}
              description="Per campaign"
            />
          </>
        }
      >
        {pastCampaigns.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No past campaigns yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onViewDetails={() => {
                  setSelectedCampaign(campaign);
                  setDetailsModalOpen(true);
                }}
                onApply={() => {}}
              />
            ))}
          </div>
        )}
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

