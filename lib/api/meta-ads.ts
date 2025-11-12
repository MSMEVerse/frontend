import { MetaAdsCampaign, MetaAdsPerformance } from '../types';
import { mockMetaAdsCampaigns } from '../mocks';

export const metaAdsApi = {
  getCampaigns: async (msmeId?: string): Promise<MetaAdsCampaign[]> => {
    // Mock implementation
    let campaigns = [...mockMetaAdsCampaigns];
    if (msmeId) {
      campaigns = campaigns.filter((c) => c.msmeId === msmeId);
    }
    return campaigns;
  },

  getCampaign: async (id: string): Promise<MetaAdsCampaign> => {
    const campaign = mockMetaAdsCampaigns.find((c) => c.id === id);
    if (!campaign) throw new Error('Campaign not found');
    return campaign;
  },

  createCampaign: async (data: Omit<MetaAdsCampaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<MetaAdsCampaign> => {
    const newCampaign: MetaAdsCampaign = {
      ...data,
      id: `ma${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockMetaAdsCampaigns.push(newCampaign);
    return newCampaign;
  },

  updateCampaign: async (id: string, data: Partial<MetaAdsCampaign>): Promise<MetaAdsCampaign> => {
    const index = mockMetaAdsCampaigns.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Campaign not found');
    mockMetaAdsCampaigns[index] = {
      ...mockMetaAdsCampaigns[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockMetaAdsCampaigns[index];
  },

  updateCampaignStatus: async (id: string, status: MetaAdsCampaign['status']): Promise<MetaAdsCampaign> => {
    const index = mockMetaAdsCampaigns.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Campaign not found');
    mockMetaAdsCampaigns[index] = {
      ...mockMetaAdsCampaigns[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    return mockMetaAdsCampaigns[index];
  },

  getPerformance: async (campaignId: string): Promise<MetaAdsPerformance | null> => {
    const campaign = mockMetaAdsCampaigns.find((c) => c.id === campaignId);
    return campaign?.performance || null;
  },

  getAnalytics: async (msmeId: string, dateRange?: { start: string; end: string }): Promise<any> => {
    // Mock analytics data
    const campaigns = mockMetaAdsCampaigns.filter((c) => c.msmeId === msmeId);
    return {
      totalSpend: campaigns.reduce((sum, c) => sum + (c.performance?.spend || 0), 0),
      totalImpressions: campaigns.reduce((sum, c) => sum + (c.performance?.impressions || 0), 0),
      totalClicks: campaigns.reduce((sum, c) => sum + (c.performance?.clicks || 0), 0),
      totalReach: campaigns.reduce((sum, c) => sum + (c.performance?.reach || 0), 0),
      totalConversions: campaigns.reduce((sum, c) => sum + (c.performance?.conversions || 0), 0),
    };
  },

  startCampaign: async (id: string): Promise<MetaAdsCampaign> => {
    return metaAdsApi.updateCampaignStatus(id, 'ACTIVE');
  },

  pauseCampaign: async (id: string): Promise<MetaAdsCampaign> => {
    return metaAdsApi.updateCampaignStatus(id, 'PAUSED');
  },

  stopCampaign: async (id: string): Promise<MetaAdsCampaign> => {
    return metaAdsApi.updateCampaignStatus(id, 'COMPLETED');
  },
};

