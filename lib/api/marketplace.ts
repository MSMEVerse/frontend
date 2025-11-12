import apiClient from './client';
import { CreatorProfile, MSMEProfile, User, ApiResponse, PaginatedResponse, CreatorFilters } from '../types';

export const marketplaceApi = {
  getCreators: async (filters?: CreatorFilters): Promise<PaginatedResponse<User & { profile: CreatorProfile }>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User & { profile: CreatorProfile }>>>(
      '/marketplace/creators/',
      { params: filters }
    );
    return response.data.data;
  },

  getCreatorById: async (id: string): Promise<User & { profile: CreatorProfile }> => {
    const response = await apiClient.get<ApiResponse<User & { profile: CreatorProfile }>>(
      `/marketplace/creators/${id}/`
    );
    return response.data.data;
  },

  getBrands: async (filters?: any): Promise<PaginatedResponse<User & { profile: MSMEProfile }>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<User & { profile: MSMEProfile }>>>(
      '/marketplace/brands/',
      { params: filters }
    );
    return response.data.data;
  },

  getBrandById: async (id: string): Promise<User & { profile: MSMEProfile }> => {
    const response = await apiClient.get<ApiResponse<User & { profile: MSMEProfile }>>(
      `/marketplace/brands/${id}/`
    );
    return response.data.data;
  },
};


