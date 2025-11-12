'use client';

import { useState, useEffect, useMemo } from 'react';
import BrandSearchFilters from './BrandSearchFilters';
import BrandSearchResults from './BrandSearchResults';
import BrandChatPanel from './BrandChatPanel';
import MSMEProfileModal from './MSMEProfileModal';
import { BrandFilters, User, MSMEProfile, Conversation, Message } from '@/lib/types';
import { mockUsers, mockMSMEProfiles, mockConversations, mockDirectMessages } from '@/lib/mocks';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { MessageCircle } from 'lucide-react';

export default function ChatWithBrands() {
  const { user } = useAuth();
  const [filters, setFilters] = useState<BrandFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<(User & { profile: MSMEProfile }) | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get all MSME users with profiles
  const allBrands = useMemo(() => {
    return mockUsers
      .filter((u) => u.role === 'MSME')
      .map((user) => ({
        ...user,
        profile: mockMSMEProfiles.find((p) => p.userId === user.id) || {
          id: user.id,
          userId: user.id,
          companyName: user.email,
          kycStatus: 'PENDING' as const,
          verified: false,
        },
      }));
  }, []);

  // Filter brands based on search and filters
  const filteredBrands = useMemo(() => {
    let filtered = [...allBrands];

    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((brand) => {
        const companyName = brand.profile.companyName?.toLowerCase() || '';
        const tagline = brand.profile.tagline?.toLowerCase() || '';
        const description = brand.profile.description?.toLowerCase() || '';
        return (
          companyName.includes(query) ||
          tagline.includes(query) ||
          description.includes(query)
        );
      });
    }

    // State filter
    if (filters.state) {
      // Note: MSMEProfile doesn't have state field, so we'll skip this for now
      // In real app, you'd filter by brand.profile.state
    }

    // City filter
    if (filters.city) {
      filtered = filtered.filter((brand) => {
        const brandCity = brand.profile.city?.toLowerCase() || '';
        return brandCity === filters.city?.toLowerCase();
      });
    }

    // Niche filter (match with categories)
    if (filters.niche && filters.niche.length > 0) {
      filtered = filtered.filter((brand) => {
        const categories = brand.profile.categories || [];
        return filters.niche!.some((niche) =>
          categories.some((cat) => cat.toLowerCase().includes(niche.toLowerCase()))
        );
      });
    }

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter((brand) => {
        const categories = brand.profile.categories || [];
        return filters.categories!.some((filterCat) =>
          categories.some((cat) => cat.toLowerCase() === filterCat.toLowerCase())
        );
      });
    }

    return filtered;
  }, [allBrands, searchQuery, filters]);

  // Load conversations for current user
  useEffect(() => {
    if (!user) return;
    // TODO: Load conversations from API
    // For now, use mock data filtered by current user
    const userConversations = mockConversations.filter((conv) => conv.creatorId === user.id);
    setConversations(userConversations);
  }, [user]);

  // Load messages when brand is selected
  useEffect(() => {
    if (!selectedBrand || !user) {
      setMessages([]);
      return;
    }

    const conversation = conversations.find((conv) => conv.brandId === selectedBrand.id);
    if (conversation) {
      // TODO: Load messages from API
      // For now, use mock data filtered by conversation
      const conversationMessages = mockDirectMessages.filter(
        (msg) => msg.conversationId === conversation.id
      );
      setMessages(conversationMessages);
    } else {
      setMessages([]);
    }
  }, [selectedBrand, conversations, user]);

  const handleViewProfile = (brand: User & { profile: MSMEProfile }) => {
    setSelectedBrand(brand);
    setProfileModalOpen(true);
  };

  const handleStartChat = (brand: User & { profile: MSMEProfile }) => {
    setSelectedBrand(brand);
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedBrand || !user) return;

    const conversation = conversations.find((conv) => conv.brandId === selectedBrand.id);

    // Check if this is the first message
    if (!conversation) {
      // Create new conversation and send initial message
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: user.id,
        receiverId: selectedBrand.id,
        content,
        read: false,
        createdAt: new Date().toISOString(),
        isInitialMessage: true,
        conversationId: `conv-${Date.now()}`,
      };

      const newConversation: Conversation = {
        id: newMessage.conversationId!,
        creatorId: user.id,
        brandId: selectedBrand.id,
        lastMessage: newMessage,
        lastMessageAt: newMessage.createdAt,
        unreadCount: 0,
        canCreatorReply: false, // Brand hasn't replied yet
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        brand: selectedBrand,
      };

      setConversations((prev) => [...prev, newConversation]);
      setMessages([newMessage]);
      toast.success('Message sent! You can continue chatting once the brand replies.');
    } else {
      // Send message in existing conversation
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: user.id,
        receiverId: selectedBrand.id,
        content,
        read: false,
        createdAt: new Date().toISOString(),
        conversationId: conversation.id,
      };

      setMessages((prev) => [...prev, newMessage]);
      // TODO: Update conversation lastMessage via API
    }

    // TODO: Send message via API
  };

  const currentConversation = selectedBrand
    ? conversations.find((conv) => conv.brandId === selectedBrand.id)
    : undefined;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight dark:text-[#FFFFFF]">Chat with Brands</h1>
        <p className="text-muted-foreground dark:text-[#B9BBBE]">
          Search for brands and start conversations to explore collaboration opportunities
        </p>
      </div>

      <div className="space-y-6">
        {/* Search and Filters */}
        <BrandSearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          onSearchChange={setSearchQuery}
        />
        
        {/* Main Content: Brands List and Chat Panel */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column: Brand Results */}
          <div className="space-y-4">
            <BrandSearchResults
              brands={filteredBrands}
              conversations={conversations}
              onViewProfile={handleViewProfile}
              onStartChat={handleStartChat}
              loading={loading}
            />
          </div>

          {/* Right Column: Chat Panel */}
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]">
            {selectedBrand ? (
              <BrandChatPanel
                brand={selectedBrand}
                conversation={currentConversation}
                onSendMessage={handleSendMessage}
                messages={messages}
                loading={loading}
              />
            ) : (
              <div className="border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground h-full flex items-center justify-center dark:border-[rgba(255,255,255,0.06)] dark:text-[#B9BBBE]">
                <div className="space-y-2">
                  <MessageCircle className="h-12 w-12 mx-auto opacity-50" />
                  <p className="font-medium">Select a brand to start chatting</p>
                  <p className="text-sm">Choose a brand from the list to view conversation history or start a new chat</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {selectedBrand && (
        <MSMEProfileModal
          msme={selectedBrand}
          open={profileModalOpen}
          onOpenChange={setProfileModalOpen}
        />
      )}
    </div>
  );
}

