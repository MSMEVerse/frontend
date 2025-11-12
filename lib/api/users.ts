import apiClient from './client';
import { User, MSMEProfile, CreatorProfile, ApiResponse } from '../types';

export const usersApi = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/users/profile/');
    return response.data.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>('/users/profile/', data);
    return response.data.data;
  },

  getMSMEProfile: async (): Promise<MSMEProfile> => {
    const response = await apiClient.get<ApiResponse<MSMEProfile>>('/users/msme-profile/');
    return response.data.data;
  },

  updateMSMEProfile: async (data: Partial<MSMEProfile>): Promise<MSMEProfile> => {
    const response = await apiClient.put<ApiResponse<MSMEProfile>>('/users/msme-profile/', data);
    return response.data.data;
  },

  getCreatorProfile: async (): Promise<CreatorProfile> => {
    const response = await apiClient.get<ApiResponse<CreatorProfile>>('/users/creator-profile/');
    return response.data.data;
  },

  updateCreatorProfile: async (data: Partial<CreatorProfile>): Promise<CreatorProfile> => {
    const response = await apiClient.put<ApiResponse<CreatorProfile>>('/users/creator-profile/', data);
    return response.data.data;
  },
};


