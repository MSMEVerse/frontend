import { User, Campaign, Transaction, Message, Notification, CreatorProfile, MSMEProfile } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'msme@example.com',
    role: 'MSME',
    firstName: 'John',
    lastName: 'Doe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'creator@example.com',
    role: 'CREATOR',
    firstName: 'Jane',
    lastName: 'Smith',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'creator2@example.com',
    role: 'CREATOR',
    firstName: 'Sarah',
    lastName: 'Johnson',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock MSME Profiles
export const mockMSMEProfiles: MSMEProfile[] = [
  {
    id: '1',
    userId: '1',
    companyName: 'Tech Solutions Inc',
    tagline: 'Innovative Tech Solutions',
    description: 'We provide cutting-edge technology solutions',
    kycStatus: 'VERIFIED',
    verified: true,
    city: 'Mumbai',
    categories: ['Technology', 'Software'],
  },
];

// Mock Creator Profiles
export const mockCreatorProfiles: CreatorProfile[] = [
  {
    id: '1',
    userId: '2',
    bio: 'Content creator specializing in tech reviews',
    niche: ['Technology', 'Lifestyle'],
    platforms: ['Instagram', 'YouTube'],
    followerCount: 50000,
    engagementRate: 4.5,
    startingPrice: 10000,
    kycStatus: 'VERIFIED',
    verified: true,
    city: 'Delhi',
    state: 'Delhi',
    dealType: 'BOTH',
    avgBudget: 25000,
    performanceMetrics: {
      reach: 125000,
      impressions: 450000,
      clicks: 12500,
      ctr: 2.78,
      cpc: 12.5,
      cpm: 150,
      conversions: 850,
      leads: 1200,
      addToCart: 650,
      purchases: 420,
      totalSpend: 156250,
      totalBudget: 200000,
      roas: 3.2,
      conversionRate: 6.8,
      attributionWindow: {
        '1dayClick': 520,
        '7dayClick': 750,
        '1dayView': 180,
        '7dayView': 320,
      },
      period: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
        type: 'last30days',
      },
    },
  },
  {
    id: '2',
    userId: '3',
    bio: 'Fashion and lifestyle influencer',
    niche: ['Fashion', 'Beauty'],
    platforms: ['Instagram', 'TikTok'],
    followerCount: 75000,
    engagementRate: 5.2,
    startingPrice: 15000,
    kycStatus: 'VERIFIED',
    verified: true,
    city: 'Mumbai',
    state: 'Maharashtra',
    dealType: 'PAID',
    avgBudget: 35000,
    performanceMetrics: {
      reach: 180000,
      impressions: 620000,
      clicks: 18600,
      ctr: 3.0,
      cpc: 10.8,
      cpm: 135,
      conversions: 1120,
      leads: 1650,
      addToCart: 890,
      purchases: 680,
      totalSpend: 200880,
      totalBudget: 250000,
      roas: 3.8,
      conversionRate: 6.0,
      attributionWindow: {
        '1dayClick': 720,
        '7dayClick': 980,
        '1dayView': 240,
        '7dayView': 420,
      },
      period: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
        type: 'last30days',
      },
    },
  },
];

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    msmeId: '1',
    creatorId: '2',
    title: 'Product Launch Campaign',
    objective: 'Increase brand awareness',
    budget: 50000,
    status: 'ONGOING',
    type: 'PAID',
    deliverables: ['3 Instagram posts', '1 YouTube video', '5 Stories'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    userId: '1',
    type: 'DEPOSIT',
    amount: 50000,
    purpose: 'Wallet top-up',
    status: 'COMPLETED',
    createdAt: new Date().toISOString(),
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: '1',
    campaignId: '1',
    senderId: '1',
    receiverId: '2',
    content: 'Hello, when can we schedule the content delivery?',
    read: false,
    createdAt: new Date().toISOString(),
  },
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'CAMPAIGN_UPDATE',
    title: 'Campaign Update',
    message: 'Your campaign has been approved',
    read: false,
    createdAt: new Date().toISOString(),
  },
];

// Mock API functions
export const mockApi = {
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
  
  login: async (email: string, password: string) => {
    await mockApi.delay(1000);
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') {
      return {
        user,
        token: 'mock-jwt-token',
      };
    }
    throw new Error('Invalid credentials');
  },
  
  register: async (email: string, password: string, role: string) => {
    await mockApi.delay(1000);
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email,
      role: role as any,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockUsers.push(newUser);
    return {
      user: newUser,
      token: 'mock-jwt-token',
    };
  },
};

