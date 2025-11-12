import apiClient from './client';
import {
  BarterProduct,
  BarterDeal,
  BarterNegotiation,
  BarterDelivery,
  BarterContent,
  BarterDispute,
  BarterReview,
  ApiResponse,
  PaginatedResponse,
} from '../types';
import {
  mockBarterProducts,
  mockBarterDeals,
  mockBarterNegotiations,
  mockBarterDeliveries,
  mockBarterContent,
  mockBarterDisputes,
  mockBarterReviews,
  mockUsers,
  mockCreatorProfiles,
  mockMSMEProfiles,
} from '../mocks';

// Products API
export const barterProductsApi = {
  getProducts: async (filters?: {
    brandId?: string;
    category?: string;
    minValue?: number;
    maxValue?: number;
    status?: string;
  }): Promise<PaginatedResponse<BarterProduct>> => {
    // Mock implementation
    let products = [...mockBarterProducts];

    if (filters?.brandId) {
      products = products.filter((p) => p.brandId === filters.brandId);
    }
    if (filters?.category) {
      products = products.filter((p) => p.category === filters.category);
    }
    if (filters?.minValue !== undefined) {
      products = products.filter((p) => p.estimatedValue >= filters.minValue!);
    }
    if (filters?.maxValue !== undefined) {
      products = products.filter((p) => p.estimatedValue <= filters.maxValue!);
    }
    if (filters?.status) {
      products = products.filter((p) => p.status === filters.status);
    }

    return {
      data: products,
      total: products.length,
      page: 1,
      limit: 100,
      totalPages: 1,
    };
  },

  getProduct: async (id: string): Promise<BarterProduct> => {
    const product = mockBarterProducts.find((p) => p.id === id);
    if (!product) throw new Error('Product not found');
    return product;
  },

  createProduct: async (data: Omit<BarterProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<BarterProduct> => {
    // Mock implementation
    const newProduct: BarterProduct = {
      ...data,
      id: `bp${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockBarterProducts.push(newProduct);
    return newProduct;
  },

  updateProduct: async (id: string, data: Partial<BarterProduct>): Promise<BarterProduct> => {
    const index = mockBarterProducts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Product not found');
    mockBarterProducts[index] = {
      ...mockBarterProducts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockBarterProducts[index];
  },

  deleteProduct: async (id: string): Promise<void> => {
    const index = mockBarterProducts.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Product not found');
    mockBarterProducts.splice(index, 1);
  },
};

// Deals API
export const barterDealsApi = {
  getDeals: async (filters?: {
    brandId?: string;
    creatorId?: string;
    status?: string;
  }): Promise<PaginatedResponse<BarterDeal>> => {
    let deals = [...mockBarterDeals];

    if (filters?.brandId) {
      deals = deals.filter((d) => d.brandId === filters.brandId);
    }
    if (filters?.creatorId) {
      deals = deals.filter((d) => d.creatorId === filters.creatorId);
    }
    if (filters?.status) {
      deals = deals.filter((d) => d.status === filters.status);
    }

    return {
      data: deals,
      total: deals.length,
      page: 1,
      limit: 100,
      totalPages: 1,
    };
  },

  getDeal: async (id: string): Promise<BarterDeal> => {
    const deal = mockBarterDeals.find((d) => d.id === id);
    if (!deal) throw new Error('Deal not found');
    return deal;
  },

  createDeal: async (data: Omit<BarterDeal, 'id' | 'createdAt' | 'updatedAt'>): Promise<BarterDeal> => {
    const newDeal: BarterDeal = {
      ...data,
      id: `bd${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockBarterDeals.push(newDeal);
    return newDeal;
  },

  updateDealStatus: async (id: string, status: BarterDeal['status']): Promise<BarterDeal> => {
    const index = mockBarterDeals.findIndex((d) => d.id === id);
    if (index === -1) throw new Error('Deal not found');
    mockBarterDeals[index] = {
      ...mockBarterDeals[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    return mockBarterDeals[index];
  },
};

// Negotiations API
export const barterNegotiationsApi = {
  getNegotiations: async (dealId: string): Promise<BarterNegotiation[]> => {
    return mockBarterNegotiations.filter((n) => n.dealId === dealId);
  },

  sendNegotiation: async (data: Omit<BarterNegotiation, 'id' | 'createdAt'>): Promise<BarterNegotiation> => {
    const newNegotiation: BarterNegotiation = {
      ...data,
      id: `bn${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    mockBarterNegotiations.push(newNegotiation);
    return newNegotiation;
  },

  acceptNegotiation: async (id: string): Promise<BarterNegotiation> => {
    const index = mockBarterNegotiations.findIndex((n) => n.id === id);
    if (index === -1) throw new Error('Negotiation not found');
    mockBarterNegotiations[index] = {
      ...mockBarterNegotiations[index],
      status: 'ACCEPTED',
    };
    return mockBarterNegotiations[index];
  },

  rejectNegotiation: async (id: string): Promise<BarterNegotiation> => {
    const index = mockBarterNegotiations.findIndex((n) => n.id === id);
    if (index === -1) throw new Error('Negotiation not found');
    mockBarterNegotiations[index] = {
      ...mockBarterNegotiations[index],
      status: 'REJECTED',
    };
    return mockBarterNegotiations[index];
  },
};

// Delivery API
export const barterDeliveryApi = {
  addTracking: async (
    dealId: string,
    data: { trackingNumber: string; carrier: string }
  ): Promise<BarterDelivery> => {
    const newDelivery: BarterDelivery = {
      id: `bdel${Date.now()}`,
      dealId,
      ...data,
      status: 'SHIPPED',
      shippedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockBarterDeliveries.push(newDelivery);
    return newDelivery;
  },

  updateDeliveryStatus: async (id: string, status: BarterDelivery['status']): Promise<BarterDelivery> => {
    const index = mockBarterDeliveries.findIndex((d) => d.id === id);
    if (index === -1) throw new Error('Delivery not found');
    mockBarterDeliveries[index] = {
      ...mockBarterDeliveries[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    return mockBarterDeliveries[index];
  },

  confirmDelivery: async (id: string, proof: string[]): Promise<BarterDelivery> => {
    const index = mockBarterDeliveries.findIndex((d) => d.id === id);
    if (index === -1) throw new Error('Delivery not found');
    mockBarterDeliveries[index] = {
      ...mockBarterDeliveries[index],
      status: 'DELIVERED',
      deliveredAt: new Date().toISOString(),
      deliveryProof: proof,
      updatedAt: new Date().toISOString(),
    };
    return mockBarterDeliveries[index];
  },
};

// Content API
export const barterContentApi = {
  submitContent: async (
    dealId: string,
    data: { deliverables: string[]; files: string[] }
  ): Promise<BarterContent> => {
    const newContent: BarterContent = {
      id: `bc${Date.now()}`,
      dealId,
      creatorId: '', // Will be set from auth context
      ...data,
      submittedAt: new Date().toISOString(),
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockBarterContent.push(newContent);
    return newContent;
  },

  reviewContent: async (id: string, approved: boolean): Promise<BarterContent> => {
    const index = mockBarterContent.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Content not found');
    mockBarterContent[index] = {
      ...mockBarterContent[index],
      status: approved ? 'APPROVED' : 'REVISION_REQUESTED',
      reviewedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return mockBarterContent[index];
  },

  requestRevision: async (id: string, notes: string): Promise<BarterContent> => {
    const index = mockBarterContent.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Content not found');
    mockBarterContent[index] = {
      ...mockBarterContent[index],
      status: 'REVISION_REQUESTED',
      revisionNotes: notes,
      reviewedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return mockBarterContent[index];
  },
};

// Disputes API
export const barterDisputesApi = {
  createDispute: async (
    dealId: string,
    data: { reason: string; description: string }
  ): Promise<BarterDispute> => {
    const newDispute: BarterDispute = {
      id: `bdis${Date.now()}`,
      dealId,
      raisedBy: '', // Will be set from auth context
      reason: data.reason as any,
      description: data.description,
      status: 'OPEN',
      createdAt: new Date().toISOString(),
    };
    mockBarterDisputes.push(newDispute);
    return newDispute;
  },

  getDisputes: async (dealId?: string): Promise<BarterDispute[]> => {
    if (dealId) {
      return mockBarterDisputes.filter((d) => d.dealId === dealId);
    }
    return mockBarterDisputes;
  },

  resolveDispute: async (id: string, resolution: string): Promise<BarterDispute> => {
    const index = mockBarterDisputes.findIndex((d) => d.id === id);
    if (index === -1) throw new Error('Dispute not found');
    mockBarterDisputes[index] = {
      ...mockBarterDisputes[index],
      status: 'RESOLVED',
      resolution,
      resolvedAt: new Date().toISOString(),
    };
    return mockBarterDisputes[index];
  },
};

// Reviews API
export const barterReviewsApi = {
  createReview: async (
    dealId: string,
    data: { revieweeId: string; rating: number; comment?: string }
  ): Promise<BarterReview> => {
    const newReview: BarterReview = {
      id: `br${Date.now()}`,
      dealId,
      reviewerId: '', // Will be set from auth context
      ...data,
      createdAt: new Date().toISOString(),
    };
    mockBarterReviews.push(newReview);
    return newReview;
  },

  getReviews: async (dealId?: string): Promise<BarterReview[]> => {
    if (dealId) {
      return mockBarterReviews.filter((r) => r.dealId === dealId);
    }
    return mockBarterReviews;
  },
};

// Unified Barter API
export const barterApi = {
  // Products
  ...barterProductsApi,
  
  // Deals
  ...barterDealsApi,
  proposeDeal: async (productId: string, creatorId: string, proposedContentValue: number, deliverables: string[]): Promise<BarterDeal> => {
    const product = mockBarterProducts.find(p => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const creatorUser = mockUsers.find(u => u.id === creatorId);
    const creatorProfile = mockCreatorProfiles.find(p => p.userId === creatorId);
    const brandUser = mockUsers.find(u => u.id === product.brandId);
    const brandProfile = mockMSMEProfiles.find(p => p.userId === product.brandId);

    const newDeal: BarterDeal = {
      id: `bd${Date.now()}`,
      productId,
      creatorId,
      brandId: product.brandId,
      status: 'NEGOTIATING',
      productValue: product.estimatedValue,
      contentValue: proposedContentValue,
      deliverables,
      negotiationHistory: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      product,
      creator: creatorUser && creatorProfile ? { ...creatorUser, profile: creatorProfile } : undefined,
      brand: brandUser && brandProfile ? { ...brandUser, profile: brandProfile } : undefined,
    };
    
    mockBarterDeals.push(newDeal);
    return newDeal;
  },
  
  // Negotiations
  ...barterNegotiationsApi,
  
  // Delivery
  ...barterDeliveryApi,
  
  // Content
  ...barterContentApi,
  
  // Disputes
  ...barterDisputesApi,
  
  // Reviews
  ...barterReviewsApi,
};

