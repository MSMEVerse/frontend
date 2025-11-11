'use client';

import CreatorDashboardStats from '@/components/creator/DashboardStats';
import SuggestedCampaigns from '@/components/creator/SuggestedCampaigns';
import OngoingCampaigns from '@/components/creator/OngoingCampaigns';
import QuickActions from '@/components/creator/QuickActions';
import { mockCampaigns } from '@/lib/mocks';

export default function CreatorDashboard() {
  // Mock data - in real app, this would come from API
  const suggestedCampaigns = mockCampaigns;
  const ongoingCampaigns = mockCampaigns.filter(
    (c) => c.status === 'ONGOING' || c.status === 'PENDING_REVIEW'
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your account.
        </p>
      </div>

      <CreatorDashboardStats />

      <div className="grid gap-6 lg:grid-cols-2">
        <SuggestedCampaigns campaigns={suggestedCampaigns} />
        <OngoingCampaigns campaigns={ongoingCampaigns} />
      </div>

      <QuickActions />
    </div>
  );
}

