import apiClient from './client';
import { Message, ApiResponse, PaginatedResponse } from '../types';

export const messagesApi = {
  getMessages: async (campaignId: string): Promise<PaginatedResponse<Message>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Message>>>(
      `/messages/?campaign_id=${campaignId}`
    );
    return response.data.data;
  },

  sendMessage: async (data: {
    campaignId: string;
    receiverId: string;
    content: string;
    attachments?: string[];
  }): Promise<Message> => {
    const response = await apiClient.post<ApiResponse<Message>>('/messages/', data);
    return response.data.data;
  },

  markAsRead: async (messageId: string): Promise<void> => {
    await apiClient.post(`/messages/${messageId}/read/`);
  },
};

