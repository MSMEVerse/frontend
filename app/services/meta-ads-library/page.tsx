'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Library, TrendingUp, BarChart3, Lightbulb } from 'lucide-react';
import { mockMetaAdsInsights, mockMarketTrends, mockAdRecommendations } from '@/lib/mocks';
import CompanyPerformance from '@/components/services/meta-ads-library/CompanyPerformance';
import MarketTrends from '@/components/services/meta-ads-library/MarketTrends';
import AdRecommendations from '@/components/services/meta-ads-library/AdRecommendations';
import InsightsDashboard from '@/components/services/meta-ads-library/InsightsDashboard';

export default function MetaAdsLibraryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'insights' | 'company' | 'trends' | 'recommendations'>('insights');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight dark:text-[#FFFFFF]">Meta Ads Library</h1>
        <p className="text-muted-foreground dark:text-[#B9BBBE]">
          Insights, analytics, and recommendations powered by Facebook Graph API
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
        <TabsList>
          <TabsTrigger value="insights">
            <BarChart3 className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="company">
            <TrendingUp className="h-4 w-4 mr-2" />
            Company Insights
          </TabsTrigger>
          <TabsTrigger value="trends">
            <Library className="h-4 w-4 mr-2" />
            Market Trends
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            <Lightbulb className="h-4 w-4 mr-2" />
            Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="mt-6">
          <InsightsDashboard insights={mockMetaAdsInsights} />
        </TabsContent>

        <TabsContent value="company" className="mt-6">
          <CompanyPerformance insights={mockMetaAdsInsights.filter((i) => i.category === 'COMPANY_PERFORMANCE')} />
        </TabsContent>

        <TabsContent value="trends" className="mt-6">
          <MarketTrends trends={mockMarketTrends} />
        </TabsContent>

        <TabsContent value="recommendations" className="mt-6">
          <AdRecommendations recommendations={mockAdRecommendations} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

