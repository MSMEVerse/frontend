import apiClient from './client';
import { ApiResponse, PaginatedResponse } from '../types';

export const searchApi = {
  search: async (query: string, type?: 'creators' | 'brands' | 'campaigns'): Promise<any> => {
    const response = await apiClient.get<ApiResponse<any>>('/search/', {
      params: { q: query, type },
    });
    return response.data.data;
  },
};


