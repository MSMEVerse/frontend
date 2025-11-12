import apiClient from './client';
import { Message, Conversation, ApiResponse, PaginatedResponse } from '../types';

export const messagesApi = {
  getMessages: async (campaignId: string): Promise<PaginatedResponse<Message>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Message>>>(
      `/messages/?campaign_id=${campaignId}`
    );
    return response.data.data;
  },

  sendMessage: async (data: {
    campaignId?: string;
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

  // Direct messaging methods
  getConversations: async (): Promise<Conversation[]> => {
    const response = await apiClient.get<ApiResponse<Conversation[]>>('/conversations/');
    return response.data.data;
  },

  getConversation: async (brandId: string): Promise<Conversation | null> => {
    try {
      const response = await apiClient.get<ApiResponse<Conversation>>(
        `/conversations/brand/${brandId}/`
      );
      return response.data.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  sendDirectMessage: async (data: {
    brandId: string;
    content: string;
    attachments?: string[];
  }): Promise<Message> => {
    const response = await apiClient.post<ApiResponse<Message>>('/messages/direct/', data);
    return response.data.data;
  },

  getDirectMessages: async (conversationId: string): Promise<PaginatedResponse<Message>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Message>>>(
      `/messages/?conversation_id=${conversationId}`
    );
    return response.data.data;
  },
};


