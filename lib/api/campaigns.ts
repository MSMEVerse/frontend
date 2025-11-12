import apiClient from './client';
import { Campaign, CampaignFormData, ApiResponse, PaginatedResponse } from '../types';

export const campaignsApi = {
  getAll: async (params?: {
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Campaign>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Campaign>>>(
      '/campaigns/',
      { params }
    );
    return response.data.data;
  },

  getById: async (id: string): Promise<Campaign> => {
    const response = await apiClient.get<ApiResponse<Campaign>>(`/campaigns/${id}/`);
    return response.data.data;
  },

  create: async (data: CampaignFormData): Promise<Campaign> => {
    const response = await apiClient.post<ApiResponse<Campaign>>('/campaigns/', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<CampaignFormData>): Promise<Campaign> => {
    const response = await apiClient.put<ApiResponse<Campaign>>(`/campaigns/${id}/`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/campaigns/${id}/`);
  },

  approve: async (id: string): Promise<Campaign> => {
    const response = await apiClient.post<ApiResponse<Campaign>>(`/campaigns/${id}/approve/`);
    return response.data.data;
  },

  reject: async (id: string): Promise<Campaign> => {
    const response = await apiClient.post<ApiResponse<Campaign>>(`/campaigns/${id}/reject/`);
    return response.data.data;
  },
};


