'use client';

import CreatorDashboardStats from '@/components/creator/DashboardStats';
import SuggestedCampaigns from '@/components/creator/SuggestedCampaigns';
import OngoingCampaigns from '@/components/creator/OngoingCampaigns';
import QuickActions from '@/components/creator/QuickActions';
import { mockCampaigns } from '@/lib/mocks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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

      {/* Chat with Brands Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Chat with Brands</span>
              </CardTitle>
              <CardDescription className="mt-1">
                Connect with brands directly to explore collaboration opportunities
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="/chat-brands">
                Open Chat
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Search for brands by niche, business name, location, or category. Send an initial message to start a conversation. Once a brand replies, you can chat unlimited.
          </p>
        </CardContent>
      </Card>

      <QuickActions />
    </div>
  );
}


