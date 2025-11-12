'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, MSMEProfile, Conversation } from '@/lib/types';
import { Verified, Building2, Eye, MessageCircle, MapPin } from 'lucide-react';

interface BrandSearchResultsProps {
  brands: (User & { profile: MSMEProfile })[];
  conversations?: Conversation[];
  onViewProfile: (brand: User & { profile: MSMEProfile }) => void;
  onStartChat: (brand: User & { profile: MSMEProfile }) => void;
  loading?: boolean;
}

export default function BrandSearchResults({
  brands,
  conversations = [],
  onViewProfile,
  onStartChat,
  loading = false,
}: BrandSearchResultsProps) {
  const getInitials = (user: User) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user.email[0].toUpperCase();
  };

  const getConversationStatus = (brandId: string): { status: 'none' | 'sent' | 'chatting'; conversation?: Conversation } => {
    const conversation = conversations.find((conv) => conv.brandId === brandId);
    if (!conversation) return { status: 'none' };
    if (conversation.canCreatorReply) return { status: 'chatting', conversation };
    return { status: 'sent', conversation };
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading brands...</p>
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="text-center py-12">
        <Building2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">No brands found matching your criteria</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        {brands.length} {brands.length === 1 ? 'brand' : 'brands'} found
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brands.map((brand) => {
          const chatStatus = getConversationStatus(brand.id);
          return (
            <Card key={brand.id} className="hover:shadow-lg transition-all duration-200 flex flex-col h-full">
              <CardContent className="pt-6 pb-4 flex-1">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16 flex-shrink-0 border-2 border-border">
                      <AvatarImage src={brand.profile.logo || brand.avatar} />
                      <AvatarFallback className="text-lg font-semibold">
                        {brand.profile.companyName?.[0]?.toUpperCase() || getInitials(brand)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-base truncate">{brand.profile.companyName}</h3>
                        {brand.profile.verified && (
                          <Verified className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                      {chatStatus.status !== 'none' && (
                        <div className="mb-2">
                          {chatStatus.status === 'sent' && (
                            <Badge variant="secondary" className="text-xs">
                              Message sent
                            </Badge>
                          )}
                          {chatStatus.status === 'chatting' && (
                            <Badge className="bg-green-600 hover:bg-green-600 text-xs dark:bg-green-600 dark:text-white">
                              Chatting
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {brand.profile.tagline && (
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {brand.profile.tagline}
                    </p>
                  )}
                  
                  {brand.profile.categories && brand.profile.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {brand.profile.categories.slice(0, 3).map((category, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                      {brand.profile.categories.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{brand.profile.categories.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {(brand.profile.city || brand.profile.state) && (
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground pt-1">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="truncate">
                        {[brand.profile.city, brand.profile.state].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex space-x-2 pt-0 pb-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onViewProfile(brand)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => onStartChat(brand)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {chatStatus.status === 'none' ? 'Start Chat' : 'Open Chat'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

