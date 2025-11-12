import { User, Campaign, Transaction, Message, Notification, CreatorProfile, MSMEProfile, CampaignApplication, Conversation } from '../types';

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
  {
    id: '4',
    email: 'fashion@example.com',
    role: 'MSME',
    firstName: 'Priya',
    lastName: 'Sharma',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    email: 'foodie@example.com',
    role: 'MSME',
    firstName: 'Raj',
    lastName: 'Kumar',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    email: 'beauty@example.com',
    role: 'MSME',
    firstName: 'Anita',
    lastName: 'Patel',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    email: 'fitness@example.com',
    role: 'MSME',
    firstName: 'Vikram',
    lastName: 'Singh',
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
    description: 'We provide cutting-edge technology solutions for businesses of all sizes',
    kycStatus: 'VERIFIED',
    verified: true,
    city: 'Mumbai',
    categories: ['Technology', 'Software'],
  },
  {
    id: '2',
    userId: '4',
    companyName: 'Fashion Forward',
    tagline: 'Trendy Fashion for Everyone',
    description: 'A leading fashion brand offering trendy and affordable clothing',
    kycStatus: 'VERIFIED',
    verified: true,
    city: 'Delhi',
    categories: ['Fashion', 'Lifestyle'],
  },
  {
    id: '3',
    userId: '5',
    companyName: 'Foodie Delights',
    tagline: 'Delicious Food, Delivered Fresh',
    description: 'Premium food delivery service specializing in healthy and delicious meals',
    kycStatus: 'VERIFIED',
    verified: true,
    city: 'Bangalore',
    categories: ['Food & Beverage', 'Lifestyle'],
  },
  {
    id: '4',
    userId: '6',
    companyName: 'Beauty Essentials',
    tagline: 'Your Beauty, Our Priority',
    description: 'Premium beauty and skincare products for all skin types',
    kycStatus: 'VERIFIED',
    verified: true,
    city: 'Pune',
    categories: ['Beauty', 'Lifestyle'],
  },
  {
    id: '5',
    userId: '7',
    companyName: 'FitLife Gym',
    tagline: 'Transform Your Body, Transform Your Life',
    description: 'State-of-the-art fitness center with expert trainers and modern equipment',
    kycStatus: 'PENDING',
    verified: false,
    city: 'Hyderabad',
    categories: ['Fitness', 'Lifestyle'],
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

// Mock Campaign Applications
export const mockCampaignApplications: CampaignApplication[] = [
  {
    id: '1',
    campaignId: '2',
    creatorId: '2',
    proposal: 'I have extensive experience in tech product reviews and have worked with several tech brands. My audience is highly engaged with technology content, and I can create authentic, informative content that will resonate with your target audience. I propose creating 3 detailed Instagram posts with high-quality visuals and 1 comprehensive YouTube video review.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      ...mockUsers[1],
      profile: mockCreatorProfiles[0],
    },
  },
  {
    id: '2',
    campaignId: '2',
    creatorId: '3',
    proposal: 'As a fashion and lifestyle influencer, I can bring a unique perspective to your product launch. My audience trusts my recommendations, and I have a proven track record of driving engagement and conversions. I will create visually stunning content that showcases your product in real-life scenarios.',
    status: 'PENDING',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    creator: {
      ...mockUsers[2],
      profile: mockCreatorProfiles[1],
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
    objective: 'Increase brand awareness for our new tech product',
    budget: 50000, // Deprecated
    status: 'ONGOING',
    type: 'PAID',
    deliverables: ['3 Instagram posts', '1 YouTube video', '5 Stories'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Deprecated
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    totalBudget: 100000,
    budgetPerCreator: 5000,
    creatorsCount: 20,
    selectedCreators: ['2'],
    applications: [],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    msme: {
      ...mockUsers[0],
      profile: mockMSMEProfiles[0],
    },
  },
  {
    id: '2',
    msmeId: '1',
    title: 'Summer Collection Launch',
    objective: 'Promote our new summer fashion collection to a wider audience',
    budget: 75000, // Deprecated
    status: 'OPEN',
    type: 'PAID',
    deliverables: ['5 Instagram posts', '10 Stories', '1 Reel'],
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    totalBudget: 100000,
    budgetPerCreator: 5000,
    creatorsCount: 20,
    selectedCreators: [],
    applications: mockCampaignApplications.filter(app => app.campaignId === '2'),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    msme: {
      ...mockUsers[0],
      profile: mockMSMEProfiles[0],
    },
  },
  {
    id: '3',
    msmeId: '1',
    title: 'Tech Review Campaign',
    objective: 'Get authentic reviews for our latest smartphone',
    budget: 60000, // Deprecated
    status: 'OPEN',
    type: 'PAID',
    deliverables: ['3 Instagram posts', '1 YouTube unboxing video', '1 detailed review video'],
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    totalBudget: 150000,
    budgetPerCreator: 7500,
    creatorsCount: 20,
    selectedCreators: [],
    applications: [],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    msme: {
      ...mockUsers[0],
      profile: mockMSMEProfiles[0],
    },
  },
  {
    id: '4',
    msmeId: '1',
    title: 'Brand Awareness Campaign',
    objective: 'Increase brand visibility and reach new audiences',
    budget: 80000, // Deprecated
    status: 'OPEN',
    type: 'BARTER',
    deliverables: ['Product unboxing', '3 Instagram posts', '1 collaboration post'],
    startDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString(),
    totalBudget: 0, // Barter campaign
    budgetPerCreator: 0, // Barter campaign
    creatorsCount: 15,
    selectedCreators: [],
    applications: [],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
    msme: {
      ...mockUsers[0],
      profile: mockMSMEProfiles[0],
    },
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

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    creatorId: '2',
    brandId: '1',
    lastMessage: {
      id: 'msg-1',
      conversationId: 'conv-1',
      senderId: '2',
      receiverId: '1',
      content: 'Hi! I\'m interested in collaborating with your brand. I have experience in tech content creation.',
      read: false,
      isInitialMessage: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    lastMessageAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    unreadCount: 0,
    canCreatorReply: false, // Brand hasn't replied yet
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    brand: {
      ...mockUsers[0],
      profile: mockMSMEProfiles[0],
    },
  },
  {
    id: 'conv-2',
    creatorId: '2',
    brandId: '4',
    lastMessage: {
      id: 'msg-2',
      conversationId: 'conv-2',
      senderId: '4',
      receiverId: '2',
      content: 'Thanks for reaching out! We\'d love to work with you. Let\'s discuss the details.',
      read: false,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    lastMessageAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    unreadCount: 0,
    canCreatorReply: true, // Brand has replied
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    brand: {
      ...mockUsers.find(u => u.id === '4') || mockUsers[0],
      profile: mockMSMEProfiles[1],
    },
  },
];

// Mock Direct Messages (non-campaign messages)
export const mockDirectMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: '2',
    receiverId: '1',
    content: 'Hi! I\'m interested in collaborating with your brand. I have experience in tech content creation.',
    read: false,
    isInitialMessage: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg-2',
    conversationId: 'conv-2',
    senderId: '2',
    receiverId: '4',
    content: 'Hello! I love your fashion brand and would like to collaborate on some content.',
    read: true,
    isInitialMessage: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg-3',
    conversationId: 'conv-2',
    senderId: '4',
    receiverId: '2',
    content: 'Thanks for reaching out! We\'d love to work with you. Let\'s discuss the details.',
    read: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'msg-4',
    conversationId: 'conv-2',
    senderId: '2',
    receiverId: '4',
    content: 'Great! I can create 3 Instagram posts and 1 Reel showcasing your latest collection. What\'s your budget range?',
    read: true,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
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

