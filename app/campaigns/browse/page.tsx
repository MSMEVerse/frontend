'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { mockCampaigns } from '@/lib/mocks';
import type { Campaign, CampaignFilters as CampaignFiltersType } from '@/lib/types';
import CampaignPageLayout from '@/components/campaigns/CampaignPageLayout';
import { StatCard } from '@/components/campaigns/CampaignStats';
import CampaignFilters from '@/components/creator/CampaignFilters';
import CampaignCard from '@/components/creator/CampaignCard';
import CampaignDetailsModal from '@/components/creator/CampaignDetailsModal';
import { Search, Briefcase, DollarSign, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function BrowseCampaignsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CampaignFiltersType>({});
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Check if creator is selected for a campaign
  const isSelected = (campaign: Campaign) => {
    if (!user || !campaign.selectedCreators) return false;
    return campaign.selectedCreators.includes(user.id);
  };

  // Filter campaigns
  const filteredCampaigns = useMemo(() => {
    let filtered = mockCampaigns.filter((c) => {
      if (c.status !== 'OPEN' && c.status !== 'PENDING') return false;
      if (c.type === 'BARTER') return false; // Exclude barter deals
      if (isSelected(c)) return false; // Don't show campaigns where creator is already selected
      return true;
    });

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((c) => {
        return (
          c.title.toLowerCase().includes(query) ||
          c.objective.toLowerCase().includes(query) ||
          c.msme?.profile?.companyName?.toLowerCase().includes(query)
        );
      });
    }

    // Type filter
    if (filters.type) {
      filtered = filtered.filter((c) => c.type === filters.type);
    }

    // Budget filters
    if (filters.minBudget !== undefined) {
      filtered = filtered.filter((c) => (c.budgetPerCreator || 0) >= filters.minBudget!);
    }
    if (filters.maxBudget !== undefined) {
      filtered = filtered.filter((c) => (c.budgetPerCreator || 0) <= filters.maxBudget!);
    }

    // Location filters
    if (filters.state) {
      filtered = filtered.filter((c) => c.msme?.profile?.state === filters.state);
    }
    if (filters.city) {
      filtered = filtered.filter((c) => c.msme?.profile?.city === filters.city);
    }

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter((c) => {
        const campaignCategories = c.msme?.profile?.categories || [];
        return filters.categories!.some((cat) =>
          campaignCategories.some((campCat) => campCat.toLowerCase() === cat.toLowerCase())
        );
      });
    }

    // Date filters
    if (filters.startDate) {
      filtered = filtered.filter((c) => {
        const campaignStart = new Date(c.startDate);
        const filterStart = new Date(filters.startDate!);
        return campaignStart >= filterStart;
      });
    }
    if (filters.endDate) {
      filtered = filtered.filter((c) => {
        const campaignEnd = new Date(c.endDate);
        const filterEnd = new Date(filters.endDate!);
        return campaignEnd <= filterEnd;
      });
    }

    return filtered;
  }, [searchQuery, filters, user]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalCampaigns = filteredCampaigns.length;
    const totalBudget = filteredCampaigns.reduce((sum, c) => sum + (c.totalBudget || 0), 0);
    const avgBudget = totalCampaigns > 0 ? totalBudget / totalCampaigns : 0;
    const paidCampaigns = filteredCampaigns.filter((c) => c.type === 'PAID').length;

    return {
      totalCampaigns,
      totalBudget,
      avgBudget,
      paidCampaigns,
    };
  }, [filteredCampaigns]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <CampaignPageLayout
        title="Browse Campaigns"
        description="Discover and apply to campaigns that match your content style"
        stats={
          <>
            <StatCard
              title="Total Campaigns"
              value={stats.totalCampaigns}
              icon={Briefcase}
              description="Available to apply"
            />
            <StatCard
              title="Total Budget"
              value={`₹${(stats.totalBudget / 100000).toFixed(1)}L`}
              icon={DollarSign}
              description="Combined campaign budget"
            />
            <StatCard
              title="Average Budget"
              value={`₹${(stats.avgBudget / 1000).toFixed(0)}K`}
              icon={TrendingUp}
              description="Per campaign"
            />
            <StatCard
              title="Paid Campaigns"
              value={stats.paidCampaigns}
              icon={Briefcase}
              description="Monetary opportunities"
            />
          </>
        }
        filters={
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <CampaignFilters filters={filters} onFiltersChange={setFilters} />
          </div>
        }
      >
        {filteredCampaigns.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              {searchQuery || Object.keys(filters).length > 0
                ? 'No campaigns match your search criteria. Try adjusting your filters.'
                : 'No campaigns available at the moment. Check back later!'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onViewDetails={() => {
                  setSelectedCampaign(campaign);
                  setDetailsModalOpen(true);
                }}
                onApply={() => {
                  setSelectedCampaign(campaign);
                  setDetailsModalOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </CampaignPageLayout>

      {selectedCampaign && (
        <CampaignDetailsModal
          campaign={selectedCampaign}
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
        />
      )}
    </>
  );
}

