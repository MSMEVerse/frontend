'use client';

import { useState } from 'react';
import MarketplaceFilters from '@/components/msme/MarketplaceFilters';
import CreatorCard from '@/components/msme/CreatorCard';
import CreatorProfileModal from '@/components/msme/CreatorProfileModal';
import SearchBar from '@/components/search/SearchBar';
import { CreatorFilters } from '@/lib/types';
import { mockUsers, mockCreatorProfiles } from '@/lib/mocks';
import { User, CreatorProfile } from '@/lib/types';

export default function MarketplacePage() {
  const [filters, setFilters] = useState<CreatorFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCreator, setSelectedCreator] = useState<(User & { profile: CreatorProfile }) | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Mock data - in real app, this would come from API
  const creators = mockUsers
    .filter((u) => u.role === 'CREATOR')
    .map((user) => ({
      ...user,
      profile: mockCreatorProfiles.find((p) => p.userId === user.id) || {
        id: '1',
        userId: user.id,
        kycStatus: 'PENDING',
        verified: false,
      },
    }));

  const filteredCreators = creators.filter((creator) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const name = `${creator.firstName || ''} ${creator.lastName || ''}`.toLowerCase();
      const email = creator.email.toLowerCase();
      if (!name.includes(query) && !email.includes(query)) {
        return false;
      }
    }
    if (filters.state && creator.profile.state?.toLowerCase() !== filters.state.toLowerCase()) {
      return false;
    }
    if (filters.city && creator.profile.city?.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }
    if (filters.dealType && filters.dealType !== 'BOTH') {
      if (!creator.profile.dealType || creator.profile.dealType !== filters.dealType) {
        return false;
      }
    }
    if (filters.followerRange) {
      const followers = creator.profile.followerCount || 0;
      const [min, max] = filters.followerRange;
      if (followers < min * 1000 || followers > max * 1000) {
        return false;
      }
    }
    if (filters.budgetRange) {
      const avgBudget = creator.profile.avgBudget || creator.profile.startingPrice || 0;
      const [min, max] = filters.budgetRange;
      if (avgBudget < min || avgBudget > max) {
        return false;
      }
    }
    if (filters.verifiedOnly && !creator.profile.verified) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Creator Marketplace</h1>
        <p className="text-muted-foreground">
          Discover and connect with creators for your campaigns
        </p>
      </div>

      <div className="space-y-4">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search creators..."
          className="max-w-md"
        />

        <MarketplaceFilters filters={filters} onFiltersChange={setFilters} />
      </div>

      <div>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredCreators.length} creators found
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCreators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator as any}
              onViewProfile={(id) => {
                const selected = filteredCreators.find((c) => c.id === id);
                if (selected) {
                  setSelectedCreator(selected as any);
                  setProfileModalOpen(true);
                }
              }}
              onStartCampaign={(id) => {
                // TODO: Navigate to campaign creation
                console.log('Start campaign with creator:', id);
              }}
            />
          ))}
        </div>
      </div>

      {selectedCreator && (
        <CreatorProfileModal
          creator={selectedCreator}
          open={profileModalOpen}
          onOpenChange={setProfileModalOpen}
          onLaunchCampaign={(id) => {
            // Navigate to campaign creation with creator ID
            console.log('Launch campaign with creator:', id);
          }}
        />
      )}
    </div>
  );
}

