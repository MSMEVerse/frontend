import apiClient from './client';
import { EscrowWallet, Transaction, ApiResponse } from '../types';

export const escrowApi = {
  getWallet: async (): Promise<{ balance: number }> => {
    const response = await apiClient.get<ApiResponse<{ balance: number }>>('/escrow/wallet/');
    return response.data.data;
  },

  getEscrowWallet: async (campaignId: string): Promise<EscrowWallet> => {
    const response = await apiClient.get<ApiResponse<EscrowWallet>>(
      `/escrow/wallet/${campaignId}/`
    );
    return response.data.data;
  },

  deposit: async (amount: number): Promise<Transaction> => {
    const response = await apiClient.post<ApiResponse<Transaction>>('/escrow/deposit/', {
      amount,
    });
    return response.data.data;
  },

  getTransactions: async (): Promise<Transaction[]> => {
    const response = await apiClient.get<ApiResponse<Transaction[]>>('/escrow/transactions/');
    return response.data.data;
  },

  releasePayment: async (campaignId: string): Promise<EscrowWallet> => {
    const response = await apiClient.post<ApiResponse<EscrowWallet>>(
      `/escrow/release/${campaignId}/`
    );
    return response.data.data;
  },
};


