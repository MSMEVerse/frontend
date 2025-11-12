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
import { Clock, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { format, differenceInDays, isAfter } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function OngoingCampaignsPage() {
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

  // Get ongoing campaigns
  const ongoingCampaigns = useMemo(() => {
    return mockCampaigns.filter((c) => {
      if (!isSelected(c)) return false;
      return c.status === 'ONGOING' || c.status === 'PENDING_REVIEW';
    });
  }, [user]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalEarnings = ongoingCampaigns.reduce((sum, c) => sum + (c.budgetPerCreator || 0), 0);
    const activeDays = ongoingCampaigns.reduce((sum, c) => {
      const days = differenceInDays(new Date(), new Date(c.startDate));
      return sum + Math.max(0, days);
    }, 0);
    const avgDays = ongoingCampaigns.length > 0 ? activeDays / ongoingCampaigns.length : 0;
    const pendingReview = ongoingCampaigns.filter((c) => c.status === 'PENDING_REVIEW').length;

    return {
      count: ongoingCampaigns.length,
      totalEarnings,
      activeDays: avgDays,
      pendingReview,
    };
  }, [ongoingCampaigns]);

  // Get campaign progress
  const getCampaignProgress = (campaign: Campaign) => {
    const now = new Date();
    const start = new Date(campaign.startDate);
    const end = new Date(campaign.endDate);
    const totalDays = differenceInDays(end, start);
    const daysElapsed = differenceInDays(now, start);
    const progress = Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100));
    return { progress, daysElapsed, totalDays, isOverdue: isAfter(now, end) };
  };

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
        title="Ongoing Campaigns"
        description="Track your active campaigns and their progress"
        stats={
          <>
            <StatCard
              title="Active Campaigns"
              value={stats.count}
              icon={Clock}
              description="Currently running"
            />
            <StatCard
              title="Total Earnings"
              value={`₹${(stats.totalEarnings / 1000).toFixed(0)}K`}
              icon={DollarSign}
              description="From active campaigns"
            />
            <StatCard
              title="Avg Days Active"
              value={Math.round(stats.activeDays)}
              icon={Calendar}
              description="Average campaign duration"
            />
            <StatCard
              title="Pending Review"
              value={stats.pendingReview}
              icon={TrendingUp}
              description="Awaiting approval"
            />
          </>
        }
      >
        {ongoingCampaigns.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No ongoing campaigns at the moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {ongoingCampaigns.map((campaign) => {
              const progress = getCampaignProgress(campaign);
              return (
                <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{campaign.title}</h3>
                          <Badge variant={campaign.status === 'ONGOING' ? 'default' : 'secondary'}>
                            {campaign.status === 'PENDING_REVIEW' ? 'Pending Review' : 'Ongoing'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{campaign.objective}</p>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground">Budget</p>
                            <p className="font-semibold">₹{campaign.budgetPerCreator?.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Start Date</p>
                            <p className="font-semibold">{format(new Date(campaign.startDate), 'MMM dd, yyyy')}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">End Date</p>
                            <p className="font-semibold">{format(new Date(campaign.endDate), 'MMM dd, yyyy')}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{Math.round(progress.progress)}%</span>
                          </div>
                          <Progress value={progress.progress} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {progress.daysElapsed} of {progress.totalDays} days elapsed
                            {progress.isOverdue && (
                              <span className="text-red-500 ml-2">(Overdue)</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="ml-4">
                        <button
                          onClick={() => {
                            setSelectedCampaign(campaign);
                            setDetailsModalOpen(true);
                          }}
                          className="text-sm text-primary hover:underline"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
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

