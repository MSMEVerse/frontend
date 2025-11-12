import { MetaAdsInsight, MarketTrend, AdRecommendation } from '../types';
import { mockMetaAdsInsights, mockMarketTrends, mockAdRecommendations } from '../mocks';

export const metaAdsLibraryApi = {
  getCompanyInsights: async (msmeId: string, dateRange?: { start: string; end: string }): Promise<MetaAdsInsight[]> => {
    // Mock implementation - simulates Facebook Graph API
    let insights = mockMetaAdsInsights.filter((i) => i.category === 'COMPANY_PERFORMANCE');
    
    if (dateRange) {
      insights = insights.filter((i) => {
        const insightStart = new Date(i.dateRange.start);
        const insightEnd = new Date(i.dateRange.end);
        const rangeStart = new Date(dateRange.start);
        const rangeEnd = new Date(dateRange.end);
        return insightStart >= rangeStart && insightEnd <= rangeEnd;
      });
    }
    
    return insights;
  },

  getMarketTrends: async (category?: string): Promise<MarketTrend[]> => {
    // Mock implementation - simulates market research API
    let trends = [...mockMarketTrends];
    
    if (category) {
      trends = trends.filter((t) => t.category.toLowerCase() === category.toLowerCase());
    }
    
    return trends;
  },

  getAdRecommendations: async (msmeId: string): Promise<AdRecommendation[]> => {
    // Mock implementation - simulates AI-powered recommendations
    return mockAdRecommendations;
  },

  getAnalytics: async (msmeId: string, dateRange?: { start: string; end: string }): Promise<any> => {
    // Mock implementation - simulates Facebook Graph API /me/insights
    return {
      impressions: 450000,
      reach: 320000,
      clicks: 12500,
      spend: 150000,
      conversions: 650,
      ctr: 2.78,
      cpc: 12.0,
      cpm: 333,
      roas: 3.2,
      dateRange: dateRange || {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
      },
    };
  },

  getAudienceInsights: async (msmeId: string): Promise<any> => {
    // Mock implementation - simulates Facebook Graph API audience insights
    return {
      demographics: {
        age: {
          '18-24': 15,
          '25-34': 35,
          '35-44': 30,
          '45-54': 15,
          '55+': 5,
        },
        gender: {
          male: 45,
          female: 55,
        },
        locations: {
          'Mumbai': 30,
          'Delhi': 25,
          'Bangalore': 20,
          'Pune': 15,
          'Other': 10,
        },
      },
      interests: [
        { name: 'Technology', percentage: 40 },
        { name: 'Fashion', percentage: 30 },
        { name: 'Lifestyle', percentage: 25 },
        { name: 'Food', percentage: 20 },
      ],
    };
  },

  getCompetitorAnalysis: async (msmeId: string, category?: string): Promise<any> => {
    // Mock implementation - simulates competitor analysis
    return {
      competitors: [
        {
          name: 'Competitor A',
          avgCTR: 3.2,
          avgCPC: 10.5,
          avgROAS: 3.8,
        },
        {
          name: 'Competitor B',
          avgCTR: 2.8,
          avgCPC: 12.0,
          avgROAS: 3.5,
        },
      ],
      industryBenchmarks: {
        avgCTR: 2.5,
        avgCPC: 15.0,
        avgROAS: 3.0,
      },
    };
  },
};

