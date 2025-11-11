import apiClient from './client';
import { Notification, ApiResponse, PaginatedResponse } from '../types';
import { mockNotifications } from '../mocks';

// Check if we should use mock data (frontend-only mode)
const shouldUseMockData = () => {
  // In development, use mock data by default unless API is explicitly enabled
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_MOCK_API !== 'false') {
    return true;
  }
  return false;
};

export const notificationsApi = {
  getAll: async (): Promise<PaginatedResponse<Notification>> => {
    // In frontend-only mode, return mock data immediately without making API call
    if (shouldUseMockData()) {
      return {
        data: mockNotifications,
        total: mockNotifications.length,
        page: 1,
        limit: 50,
        totalPages: 1,
      };
    }

    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Notification>>>(
        '/notifications/'
      );
      return response.data.data;
    } catch (error: any) {
      // If network error, return mock data as fallback
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK' || !error.response) {
        return {
          data: mockNotifications,
          total: mockNotifications.length,
          page: 1,
          limit: 50,
          totalPages: 1,
        };
      }
      throw error;
    }
  },

  markAsRead: async (id: string): Promise<void> => {
    // In frontend-only mode, just return without making API call
    if (shouldUseMockData()) {
      return;
    }

    try {
      await apiClient.post(`/notifications/${id}/read/`);
    } catch (error: any) {
      // If network error, silently fail in development
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK' || !error.response) {
        return;
      }
      throw error;
    }
  },

  markAllAsRead: async (): Promise<void> => {
    // In frontend-only mode, just return without making API call
    if (shouldUseMockData()) {
      return;
    }

    try {
      await apiClient.post('/notifications/read-all/');
    } catch (error: any) {
      // If network error, silently fail in development
      if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK' || !error.response) {
        return;
      }
      throw error;
    }
  },
};
