'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart3,
  Users,
  Eye,
  MousePointerClick,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Zap,
  DollarSign,
  Target,
  ExternalLink,
  Calendar,
  Circle,
} from 'lucide-react';
import { WebsiteAnalytics as WebsiteAnalyticsType } from '@/lib/types/analytics';

// Mock analytics data
const mockAnalytics: WebsiteAnalyticsType = {
  traffic: {
    totalVisitors: 45280,
    uniqueVisitors: 32150,
    pageViews: 125430,
    sessions: 48920,
    avgSessionDuration: 245,
    bounceRate: 42.5,
    pagesPerSession: 2.56,
  },
  period: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    end: new Date().toISOString(),
    type: 'last30days',
  },
  trafficSources: {
    organic: 18500,
    direct: 12500,
    social: 8500,
    referral: 3200,
    email: 2100,
    paid: 480,
    other: 0,
  },
  geographic: [
    { country: 'India', visitors: 32150, percentage: 71 },
    { country: 'United States', visitors: 4520, percentage: 10 },
    { country: 'United Kingdom', visitors: 2890, percentage: 6.4 },
    { country: 'Canada', visitors: 2260, percentage: 5 },
    { country: 'Australia', visitors: 1350, percentage: 3 },
    { country: 'Others', visitors: 2110, percentage: 4.6 },
  ],
  devices: {
    desktop: 18500,
    mobile: 24500,
    tablet: 2280,
  },
  browsers: {
    chrome: 28900,
    safari: 8900,
    firefox: 4520,
    edge: 2890,
    other: 1070,
  },
  conversions: {
    totalConversions: 1250,
    conversionRate: 2.76,
    goalCompletions: 1890,
    revenue: 1250000,
    avgOrderValue: 1000,
  },
  campaignPerformance: [
    {
      campaignId: '1',
      campaignName: 'Summer Sale Campaign',
      visitors: 12500,
      conversions: 450,
      conversionRate: 3.6,
      revenue: 450000,
      roi: 280,
    },
    {
      campaignId: '2',
      campaignName: 'Product Launch',
      visitors: 8500,
      conversions: 320,
      conversionRate: 3.76,
      revenue: 320000,
      roi: 240,
    },
    {
      campaignId: '3',
      campaignName: 'Brand Awareness',
      visitors: 15200,
      conversions: 280,
      conversionRate: 1.84,
      revenue: 280000,
      roi: 180,
    },
  ],
  topPages: [
    { page: '/', views: 45200, uniqueViews: 32150, avgTimeOnPage: 180, bounceRate: 35.2 },
    { page: '/products', views: 28500, uniqueViews: 18900, avgTimeOnPage: 245, bounceRate: 42.5 },
    { page: '/about', views: 15200, uniqueViews: 12500, avgTimeOnPage: 120, bounceRate: 55.8 },
    { page: '/contact', views: 8900, uniqueViews: 7200, avgTimeOnPage: 95, bounceRate: 48.3 },
    { page: '/blog', views: 12630, uniqueViews: 9800, avgTimeOnPage: 320, bounceRate: 38.5 },
  ],
  referralSources: [
    { source: 'google.com', visitors: 18500, conversions: 520 },
    { source: 'facebook.com', visitors: 8500, conversions: 280 },
    { source: 'instagram.com', visitors: 6200, conversions: 190 },
    { source: 'linkedin.com', visitors: 3200, conversions: 95 },
    { source: 'twitter.com', visitors: 2100, conversions: 65 },
  ],
  socialMedia: [
    { platform: 'Facebook', visitors: 8500, conversions: 280, engagement: 1250 },
    { platform: 'Instagram', visitors: 6200, conversions: 190, engagement: 2890 },
    { platform: 'LinkedIn', visitors: 3200, conversions: 95, engagement: 450 },
    { platform: 'Twitter', visitors: 2100, conversions: 65, engagement: 320 },
  ],
};

export default function WebsiteAnalytics() {
  const [timeRange, setTimeRange] = useState<'last7days' | 'last30days' | 'last90days'>('last30days');
  const analytics = mockAnalytics;

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const formatCurrency = (num: number) => {
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const totalTrafficSources = Object.values(analytics.trafficSources).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Header with Time Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Website Analytics</h2>
          <p className="text-muted-foreground">
            Comprehensive insights into your website performance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.traffic.totalVisitors)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatNumber(analytics.traffic.uniqueVisitors)} unique
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.traffic.pageViews)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.traffic.pagesPerSession.toFixed(2)} per session
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(analytics.traffic.avgSessionDuration)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Bounce rate: {analytics.traffic.bounceRate}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.conversions.conversionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(analytics.conversions.revenue)} revenue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="devices">Devices & Browsers</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
          <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
          <TabsTrigger value="pages">Top Pages</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Overview</CardTitle>
                <CardDescription>Key traffic metrics for your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Sessions</span>
                  <span className="font-semibold">{formatNumber(analytics.traffic.sessions)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Unique Visitors</span>
                  <span className="font-semibold">{formatNumber(analytics.traffic.uniqueVisitors)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Page Views</span>
                  <span className="font-semibold">{formatNumber(analytics.traffic.pageViews)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. Session Duration</span>
                  <span className="font-semibold">{formatDuration(analytics.traffic.avgSessionDuration)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Bounce Rate</span>
                  <span className="font-semibold">{analytics.traffic.bounceRate}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Metrics</CardTitle>
                <CardDescription>Website conversion performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Conversions</span>
                  <span className="font-semibold">{formatNumber(analytics.conversions.totalConversions)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Conversion Rate</span>
                  <Badge variant="default">{analytics.conversions.conversionRate}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Revenue</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(analytics.conversions.revenue)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. Order Value</span>
                  <span className="font-semibold">{formatCurrency(analytics.conversions.avgOrderValue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Goal Completions</span>
                  <span className="font-semibold">{formatNumber(analytics.conversions.goalCompletions)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Traffic Sources Tab */}
        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(analytics.trafficSources).map(([source, visitors]) => {
                  if (visitors === 0) return null;
                  const percentage = (visitors / totalTrafficSources) * 100;
                  return (
                    <div key={source} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium capitalize">{source}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {formatNumber(visitors)} visitors
                          </span>
                          <Badge variant="secondary">{percentage.toFixed(1)}%</Badge>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media Performance</CardTitle>
              <CardDescription>Traffic and engagement from social platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {analytics.socialMedia.map((social) => (
                  <Card key={social.platform}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{social.platform}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="text-2xl font-bold">{formatNumber(social.visitors)}</div>
                        <p className="text-xs text-muted-foreground">Visitors</p>
                        <div className="text-lg font-semibold text-green-600">
                          {formatNumber(social.conversions)}
                        </div>
                        <p className="text-xs text-muted-foreground">Conversions</p>
                        <div className="text-sm font-medium">
                          {formatNumber(social.engagement)}
                        </div>
                        <p className="text-xs text-muted-foreground">Engagement</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Geographic Tab */}
        <TabsContent value="geographic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Visitors by country</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.geographic.map((geo) => (
                  <div key={geo.country} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{geo.country}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {formatNumber(geo.visitors)} visitors
                        </span>
                        <Badge variant="secondary">{geo.percentage}%</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${geo.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Devices & Browsers Tab */}
        <TabsContent value="devices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Devices</CardTitle>
                <CardDescription>Traffic by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <span>Mobile</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{formatNumber(analytics.devices.mobile)}</span>
                      <Badge>
                        {((analytics.devices.mobile / (analytics.devices.desktop + analytics.devices.mobile + analytics.devices.tablet)) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Monitor className="h-5 w-5 text-muted-foreground" />
                      <span>Desktop</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{formatNumber(analytics.devices.desktop)}</span>
                      <Badge>
                        {((analytics.devices.desktop / (analytics.devices.desktop + analytics.devices.mobile + analytics.devices.tablet)) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Tablet className="h-5 w-5 text-muted-foreground" />
                      <span>Tablet</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{formatNumber(analytics.devices.tablet)}</span>
                      <Badge>
                        {((analytics.devices.tablet / (analytics.devices.desktop + analytics.devices.mobile + analytics.devices.tablet)) * 100).toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Browsers</CardTitle>
                <CardDescription>Traffic by browser</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analytics.browsers).map(([browser, visitors]) => {
                    const total = Object.values(analytics.browsers).reduce((a, b) => a + b, 0);
                    const percentage = (visitors / total) * 100;
                    const icons: Record<string, any> = {
                      chrome: Circle,
                      safari: Circle,
                      firefox: Circle,
                      edge: Circle,
                      other: Globe,
                    };
                    const Icon = icons[browser] || Globe;
                    return (
                      <div key={browser} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <span className="capitalize">{browser}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{formatNumber(visitors)}</span>
                          <Badge>{percentage.toFixed(1)}%</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conversions Tab */}
        <TabsContent value="conversions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Overview</CardTitle>
              <CardDescription>Detailed conversion metrics and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {formatNumber(analytics.conversions.totalConversions)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Total Conversions</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold">
                    {analytics.conversions.conversionRate}%
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Conversion Rate</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {formatCurrency(analytics.conversions.revenue)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaign Performance Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance on Website</CardTitle>
              <CardDescription>How your campaigns are driving website traffic and conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.campaignPerformance.map((campaign) => (
                  <Card key={campaign.campaignId}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{campaign.campaignName}</CardTitle>
                        <Badge variant={campaign.roi > 200 ? 'default' : 'secondary'}>
                          ROI: {campaign.roi}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Visitors</p>
                          <p className="text-xl font-bold">{formatNumber(campaign.visitors)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Conversions</p>
                          <p className="text-xl font-bold">{formatNumber(campaign.conversions)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Conversion Rate</p>
                          <p className="text-xl font-bold">{campaign.conversionRate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Revenue</p>
                          <p className="text-xl font-bold text-green-600">
                            {formatCurrency(campaign.revenue)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Top Pages Tab */}
        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Pages</CardTitle>
              <CardDescription>Most visited pages on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{page.page}</span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <span>{formatNumber(page.views)} views</span>
                        <span>{formatNumber(page.uniqueViews)} unique</span>
                        <span>{formatDuration(page.avgTimeOnPage)} avg time</span>
                        <span>Bounce: {page.bounceRate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

