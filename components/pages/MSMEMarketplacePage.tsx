'use client';

import { useState } from 'react';
import MarketplaceFilters from '@/components/msme/MarketplaceFilters';
import CreatorCard from '@/components/msme/CreatorCard';
import CreatorProfileModal from '@/components/msme/CreatorProfileModal';
import SearchBar from '@/components/search/SearchBar';
import { CreatorFilters } from '@/lib/types';
import { mockUsers, mockCreatorProfiles } from '@/lib/mocks';
import { User, CreatorProfile } from '@/lib/types';

export default function MSMEMarketplacePage() {
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
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const name = `${creator.firstName || ''} ${creator.lastName || ''}`.toLowerCase();
      const email = creator.email.toLowerCase();
      if (!name.includes(query) && !email.includes(query)) {
        return false;
      }
    }

    // Location filters
    if (filters.state && creator.profile.state?.toLowerCase() !== filters.state.toLowerCase()) {
      return false;
    }
    if (filters.city && creator.profile.city?.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }

    // Deal type filter
    if (filters.dealType && filters.dealType !== 'BOTH') {
      if (!creator.profile.dealType || creator.profile.dealType !== filters.dealType) {
        return false;
      }
    }

    // Follower range filter
    if (filters.followerRange) {
      const followers = creator.profile.followerCount || 0;
      const [min, max] = filters.followerRange;
      if (followers < min * 1000 || followers > max * 1000) {
        return false;
      }
    }

    // Budget range filter
    if (filters.budgetRange) {
      const avgBudget = creator.profile.avgBudget || creator.profile.startingPrice || 0;
      const [min, max] = filters.budgetRange;
      if (avgBudget < min || avgBudget > max) {
        return false;
      }
    }

    // Niche filter
    if (filters.niche && filters.niche.length > 0) {
      const creatorNiches = creator.profile.niche || [];
      const hasMatchingNiche = filters.niche.some((niche) =>
        creatorNiches.some((creatorNiche) => creatorNiche.toLowerCase() === niche.toLowerCase())
      );
      if (!hasMatchingNiche) return false;
    }

    // Platform filter
    if (filters.platform && filters.platform.length > 0) {
      const creatorPlatforms = creator.profile.platforms || [];
      const hasMatchingPlatform = filters.platform.some((platform) =>
        creatorPlatforms.some((creatorPlatform) => creatorPlatform.toLowerCase() === platform.toLowerCase())
      );
      if (!hasMatchingPlatform) return false;
    }

    // Engagement rate filter
    if (filters.engagementRateRange) {
      const engagementRate = creator.profile.engagementRate || 0;
      const [min, max] = filters.engagementRateRange;
      if (engagementRate < min || engagementRate > max) {
        return false;
      }
    }

    // Verified only filter
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
        {filteredCreators.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery || Object.keys(filters).length > 0
                ? 'No creators match your filters. Try adjusting your search criteria.'
                : 'No creators available at the moment'}
            </p>
          </div>
        ) : (
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
                // Navigate to chat or reach out to creator
                console.log('Reach out to creator:', id);
                // TODO: Open chat or navigate to messaging
              }}
            />
            ))}
          </div>
        )}
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

