// Website Analytics Types for MSME

export interface WebsiteAnalytics {
  // Traffic Metrics
  traffic: {
    totalVisitors: number;
    uniqueVisitors: number;
    pageViews: number;
    sessions: number;
    avgSessionDuration: number; // in seconds
    bounceRate: number; // percentage
    pagesPerSession: number;
  };

  // Time Period
  period: {
    start: string;
    end: string;
    type: 'last7days' | 'last30days' | 'last90days' | 'custom';
  };

  // Traffic Sources
  trafficSources: {
    organic: number;
    direct: number;
    social: number;
    referral: number;
    email: number;
    paid: number;
    other: number;
  };

  // Geographic Data
  geographic: {
    country: string;
    visitors: number;
    percentage: number;
  }[];

  // Device/Browser Analytics
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };

  browsers: {
    chrome: number;
    safari: number;
    firefox: number;
    edge: number;
    other: number;
  };

  // Conversion Metrics
  conversions: {
    totalConversions: number;
    conversionRate: number; // percentage
    goalCompletions: number;
    revenue: number; // in INR
    avgOrderValue: number; // in INR
  };

  // Campaign Performance on Website
  campaignPerformance: {
    campaignId: string;
    campaignName: string;
    visitors: number;
    conversions: number;
    conversionRate: number;
    revenue: number;
    roi: number; // percentage
  }[];

  // Top Pages
  topPages: {
    page: string;
    views: number;
    uniqueViews: number;
    avgTimeOnPage: number; // in seconds
    bounceRate: number;
  }[];

  // Referral Sources
  referralSources: {
    source: string;
    visitors: number;
    conversions: number;
  }[];

  // Social Media Performance
  socialMedia: {
    platform: string;
    visitors: number;
    conversions: number;
    engagement: number;
  }[];
}

export interface AnalyticsTimeRange {
  start: string;
  end: string;
  type: 'last7days' | 'last30days' | 'last90days' | 'custom';
}

