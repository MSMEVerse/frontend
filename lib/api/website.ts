import { WebsitePage, WebsitePackage, WebsiteOrder } from '../types';
import { mockWebsitePages, mockWebsitePackages, mockWebsiteOrders } from '../mocks';

export const websiteApi = {
  getPages: async (): Promise<WebsitePage[]> => {
    return mockWebsitePages;
  },

  getPackages: async (): Promise<WebsitePackage[]> => {
    return mockWebsitePackages;
  },

  getPackage: async (id: string): Promise<WebsitePackage> => {
    const pkg = mockWebsitePackages.find((p) => p.id === id);
    if (!pkg) throw new Error('Package not found');
    return pkg;
  },

  getOrders: async (msmeId?: string): Promise<WebsiteOrder[]> => {
    let orders = [...mockWebsiteOrders];
    if (msmeId) {
      orders = orders.filter((o) => o.msmeId === msmeId);
    }
    return orders;
  },

  getOrder: async (id: string): Promise<WebsiteOrder> => {
    const order = mockWebsiteOrders.find((o) => o.id === id);
    if (!order) throw new Error('Order not found');
    return order;
  },

  createOrder: async (data: {
    msmeId: string;
    packageId: string;
    selectedPages: string[];
  }): Promise<WebsiteOrder> => {
    const pkg = mockWebsitePackages.find((p) => p.id === data.packageId);
    if (!pkg) throw new Error('Package not found');

    const basePrice = pkg.totalPrice;
    const additionalPages = data.selectedPages
      .filter((id) => !pkg.basePages.includes(id))
      .map((id) => mockWebsitePages.find((p) => p.id === id))
      .filter((p): p is WebsitePage => p !== undefined);
    const additionalPrice = additionalPages.reduce((sum, p) => sum + p.price, 0);
    const totalPrice = basePrice + additionalPrice;

    const newOrder: WebsiteOrder = {
      id: `wo${Date.now()}`,
      msmeId: data.msmeId,
      packageId: data.packageId,
      selectedPages: data.selectedPages,
      status: 'PENDING',
      totalPrice,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockWebsiteOrders.push(newOrder);
    return newOrder;
  },

  updateOrder: async (id: string, data: Partial<WebsiteOrder>): Promise<WebsiteOrder> => {
    const index = mockWebsiteOrders.findIndex((o) => o.id === id);
    if (index === -1) throw new Error('Order not found');
    mockWebsiteOrders[index] = {
      ...mockWebsiteOrders[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockWebsiteOrders[index];
  },

  processPayment: async (orderId: string, paymentData: any): Promise<WebsiteOrder> => {
    const order = await websiteApi.getOrder(orderId);
    // In production, this would integrate with payment gateway
    return websiteApi.updateOrder(orderId, {
      status: 'IN_PROGRESS',
    });
  },
};

