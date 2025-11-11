'use client';

import { useState } from 'react';
import DashboardStats from '@/components/msme/DashboardStats';
import RecentCampaigns from '@/components/msme/RecentCampaigns';
import SuggestedCreators from '@/components/msme/SuggestedCreators';
import QuickActions from '@/components/msme/QuickActions';
import WebsiteAnalytics from '@/components/msme/WebsiteAnalytics';
import { mockCampaigns, mockCreatorProfiles, mockUsers } from '@/lib/mocks';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, LayoutDashboard } from 'lucide-react';

export default function MSMEDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // For development, use mock data
  const campaigns = mockCampaigns;
  const creators = mockUsers
    .filter((u) => u.role === 'CREATOR')
    .map((user) => ({
      ...user,
      profile: mockCreatorProfiles.find((p) => p.userId === user.id) || {
        id: '1',
        userId: user.id,
        kycStatus: 'PENDING',
        verified: false,
      },
    }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your account.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center space-x-2">
            <LayoutDashboard className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Website Analytics</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <DashboardStats />

          <div className="grid gap-6 lg:grid-cols-2">
            <RecentCampaigns campaigns={campaigns} />
            <SuggestedCreators creators={creators as any} />
          </div>

          <QuickActions />
        </TabsContent>

        <TabsContent value="analytics">
          <WebsiteAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}

