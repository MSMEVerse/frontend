// User Types
export type UserRole = 'MSME' | 'CREATOR' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MSMEProfile {
  id: string;
  userId: string;
  companyName: string;
  logo?: string;
  tagline?: string;
  description?: string;
  pan?: string;
  gst?: string;
  msmeCert?: string;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  verified: boolean;
  socialLinks?: {
    instagram?: string;
    website?: string;
    facebook?: string;
  };
  categories?: string[];
  city?: string;
  state?: string;
}

export interface CreatorPerformanceMetrics {
  // Reach & Impressions
  reach?: number; // Unique users who saw ads
  impressions?: number; // Total number of times ads were seen
  clicks?: number; // Link clicks, CTA clicks, etc.
  
  // Rates
  ctr?: number; // Click Through Rate (percentage)
  cpc?: number; // Cost per Click (in INR)
  cpm?: number; // Cost per 1000 Impressions (in INR)
  
  // Conversions
  conversions?: number;
  leads?: number;
  addToCart?: number;
  purchases?: number;
  
  // Financial
  totalSpend?: number; // Total amount spent on ads (in INR)
  totalBudget?: number; // Total budget allocated (in INR)
  roas?: number; // Return on Ad Spend (percentage or ratio)
  
  // Attribution
  conversionRate?: number; // Conversion rate percentage
  attributionWindow?: {
    '1dayClick'?: number;
    '7dayClick'?: number;
    '1dayView'?: number;
    '7dayView'?: number;
  };
  
  // Time period for these metrics
  period?: {
    start: string;
    end: string;
    type: 'last7days' | 'last30days' | 'last90days' | 'custom';
  };
}

export interface CreatorProfile {
  id: string;
  userId: string;
  bio?: string;
  niche?: string[];
  platforms?: string[];
  followerCount?: number;
  engagementRate?: number;
  startingPrice?: number;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  verified: boolean;
  city?: string;
  state?: string;
  dealType?: 'BARTER' | 'PAID' | 'BOTH';
  avgBudget?: number;
  socialHandles?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
  performanceMetrics?: CreatorPerformanceMetrics;
}

// Campaign Types
export type CampaignStatus = 'DRAFT' | 'PENDING' | 'OPEN' | 'ONGOING' | 'PENDING_REVIEW' | 'COMPLETED' | 'RELEASED' | 'CLOSED' | 'CANCELLED';
export type CampaignType = 'PAID' | 'BARTER';

export interface CampaignApplication {
  id: string;
  campaignId: string;
  creatorId: string;
  proposal: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  creator?: User & { profile: CreatorProfile };
}

export interface Campaign {
  id: string;
  msmeId: string;
  creatorId?: string; // Deprecated: use selectedCreators instead
  title: string;
  objective: string;
  budget: number; // Deprecated: use totalBudget instead
  status: CampaignStatus;
  type: CampaignType;
  deliverables: string[];
  deadline?: string; // Deprecated: use startDate and endDate instead
  startDate: string;
  endDate: string;
  totalBudget: number; // Visible only to MSME
  budgetPerCreator: number; // Visible to creators as "offer"
  creatorsCount: number; // Calculated: totalBudget / budgetPerCreator
  selectedCreators: string[]; // Array of creator IDs selected by brand
  applications?: CampaignApplication[]; // Applications from creators
  createdAt: string;
  updatedAt: string;
  msme?: User & { profile: MSMEProfile };
  creator?: User & { profile: CreatorProfile }; // Deprecated: use selectedCreators
}

// Escrow & Transaction Types
export type EscrowStatus = 'PENDING' | 'ONGOING' | 'COMPLETED' | 'RELEASED';
export type TransactionType = 'DEPOSIT' | 'WITHDRAWAL' | 'ESCROW' | 'COMMISSION' | 'PAYOUT';
export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

export interface EscrowWallet {
  id: string;
  campaignId: string;
  amount: number;
  status: EscrowStatus;
  depositedAt?: string;
  releasedAt?: string;
  commission?: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  purpose: string;
  status: TransactionStatus;
  createdAt: string;
  razorpayPaymentId?: string;
}

// Message Types
export interface Message {
  id: string;
  campaignId?: string; // Optional for direct brand-creator chats
  conversationId?: string; // For tracking conversation threads
  senderId: string;
  receiverId: string;
  content: string;
  attachments?: string[];
  read: boolean;
  createdAt: string;
  isInitialMessage?: boolean; // Flag to track first message from creator
  sender?: User;
  receiver?: User;
}

// Conversation Types
export interface Conversation {
  id: string;
  creatorId: string;
  brandId: string; // MSME userId
  lastMessage?: Message;
  lastMessageAt?: string;
  unreadCount?: number;
  canCreatorReply: boolean; // true if brand has replied
  createdAt: string;
  updatedAt: string;
  brand?: User & { profile: MSMEProfile };
  creator?: User & { profile: CreatorProfile };
}

// Notification Types
export type NotificationType = 'CAMPAIGN_UPDATE' | 'MESSAGE' | 'PAYMENT' | 'KYC_STATUS' | 'CAMPAIGN_APPROVED' | 'CAMPAIGN_COMPLETED';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

// Review Types
export interface Review {
  id: string;
  campaignId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  reviewer?: User;
  reviewee?: User;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter Types
export interface CreatorFilters {
  state?: string;
  city?: string;
  dealType?: 'BARTER' | 'PAID' | 'BOTH';
  followerRange?: [number, number];
  budgetRange?: [number, number];
  niche?: string[];
  platform?: string[];
  verifiedOnly?: boolean;
}

export interface CampaignFilters {
  status?: CampaignStatus[];
  type?: CampaignType;
  minBudget?: number;
  maxBudget?: number;
  city?: string;
}

export interface BrandFilters {
  niche?: string[];
  businessName?: string; // For autocomplete
  state?: string;
  categories?: string[];
  city?: string;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  role?: UserRole;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  terms: boolean;
}

export interface CampaignFormData {
  title: string;
  objective: string;
  budget?: number; // Deprecated: use totalBudget instead
  totalBudget: number;
  budgetPerCreator: number;
  type: CampaignType;
  deliverables: string[];
  deadline?: string; // Deprecated: use startDate and endDate instead
  startDate: string;
  endDate: string;
  creatorId?: string; // Deprecated: not used in new system
}

// Export analytics types
export * from './analytics';

