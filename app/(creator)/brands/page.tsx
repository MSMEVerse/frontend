'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Building2, MessageCircle } from 'lucide-react';
import { mockUsers, mockMSMEProfiles } from '@/lib/mocks';
import { User, MSMEProfile } from '@/lib/types';
import MSMEProfileModal from '@/components/creator/MSMEProfileModal';

export default function BrandMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMSME, setSelectedMSME] = useState<(User & { profile: MSMEProfile }) | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Mock data
  const brands = mockUsers
    .filter((u) => u.role === 'MSME')
    .map((user) => ({
      ...user,
      profile: mockMSMEProfiles.find((p) => p.userId === user.id) || {
        id: '1',
        userId: user.id,
        companyName: 'Company Name',
        kycStatus: 'PENDING',
        verified: false,
      },
    }));

  const filteredBrands = brands.filter((brand) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const companyName = brand.profile.companyName.toLowerCase();
      return companyName.includes(query);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Brand Marketplace</h1>
        <p className="text-muted-foreground">
          Discover MSMEs looking for creators
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBrands.map((brand) => (
          <Card key={brand.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={brand.profile.logo} />
                  <AvatarFallback>
                    <Building2 className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">
                    {brand.profile.companyName}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {brand.profile.tagline || 'No tagline'}
                  </p>
                </div>
              </div>
              {brand.profile.categories && brand.profile.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {brand.profile.categories.slice(0, 2).map((category, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedMSME(brand);
                    setProfileModalOpen(true);
                  }}
                >
                  View Profile
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedMSME(brand);
                    setProfileModalOpen(true);
                  }}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedMSME && (
        <MSMEProfileModal
          msme={selectedMSME}
          open={profileModalOpen}
          onOpenChange={setProfileModalOpen}
          onApply={(id) => {
            // Navigate to campaign application or messaging
            console.log('Apply for campaign with MSME:', id);
          }}
        />
      )}
    </div>
  );
}

