'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, DollarSign, Users, Eye, MessageCircle, Briefcase } from 'lucide-react';
import { mockCampaigns } from '@/lib/mocks';
import { Campaign, CampaignFilters } from '@/lib/types';
import CampaignDetailsModal from '@/components/creator/CampaignDetailsModal';
import CampaignFiltersComponent from '@/components/creator/CampaignFilters';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

export default function BrandMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<CampaignFilters>({});
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const { user } = useAuth();

  // Get open campaigns (status OPEN or PENDING)
  const openCampaigns = useMemo(() => 
    mockCampaigns.filter(
      (campaign) => campaign.status === 'OPEN' || campaign.status === 'PENDING'
    ),
    []
  );

  // Check if creator has applied to a campaign
  const hasApplied = (campaignId: string) => {
    const campaign = mockCampaigns.find((c) => c.id === campaignId);
    if (!campaign || !campaign.applications || !user) return false;
    return campaign.applications.some((app) => app.creatorId === user.id);
  };

  const getApplicationStatus = (campaignId: string): 'PENDING' | 'APPROVED' | 'REJECTED' | undefined => {
    const campaign = mockCampaigns.find((c) => c.id === campaignId);
    if (!campaign || !campaign.applications || !user) return undefined;
    const application = campaign.applications.find((app) => app.creatorId === user.id);
    return application?.status;
  };

  const filteredCampaigns = useMemo(() => {
    return openCampaigns.filter((campaign) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = (
          campaign.title.toLowerCase().includes(query) ||
          campaign.objective.toLowerCase().includes(query) ||
          campaign.msme?.profile?.companyName.toLowerCase().includes(query) ||
          false
        );
        if (!matchesSearch) return false;
      }

      // Campaign type filter
      if (filters.type && campaign.type !== filters.type) {
        return false;
      }

      // Budget range filter
      if (filters.minBudget !== undefined && campaign.budgetPerCreator < filters.minBudget) {
        return false;
      }
      if (filters.maxBudget !== undefined && campaign.budgetPerCreator > filters.maxBudget) {
        return false;
      }

      // Location filters
      if (filters.state && campaign.msme?.profile?.state?.toLowerCase() !== filters.state.toLowerCase()) {
        return false;
      }
      if (filters.city && campaign.msme?.profile?.city?.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // Categories filter
      if (filters.categories && filters.categories.length > 0) {
        const campaignCategories = campaign.msme?.profile?.categories || [];
        const hasMatchingCategory = filters.categories.some((cat) =>
          campaignCategories.some((campCat) => campCat.toLowerCase() === cat.toLowerCase())
        );
        if (!hasMatchingCategory) return false;
      }

      // Date range filter
      if (filters.startDate) {
        const filterStartDate = new Date(filters.startDate);
        const campaignEndDate = new Date(campaign.endDate);
        if (campaignEndDate < filterStartDate) return false;
      }
      if (filters.endDate) {
        const filterEndDate = new Date(filters.endDate);
        const campaignStartDate = new Date(campaign.startDate);
        if (campaignStartDate > filterEndDate) return false;
      }

      return true;
    });
  }, [openCampaigns, searchQuery, filters]);

  const handleViewDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setDetailsModalOpen(true);
  };

  const handleApply = (campaignId: string) => {
    // This will be handled by the modal
    console.log('Apply to campaign:', campaignId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Campaign Marketplace</h1>
        <p className="text-muted-foreground">
          Discover campaigns looking for creators
        </p>
      </div>

      {/* Platform Fee Disclaimer */}
      <div className="p-4 bg-muted/50 border border-border rounded-lg">
        <p className="text-sm text-foreground">
          <strong>Note:</strong> Our platform does not charge any commission or fees on deals. All transactions are between you and the brands directly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <CampaignFiltersComponent filters={filters} onFiltersChange={setFilters} />
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            {searchQuery || Object.keys(filters).length > 0
              ? 'No campaigns match your filters. Try adjusting your search criteria.'
              : 'No open campaigns at the moment'}
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCampaigns.map((campaign) => {
            const applied = hasApplied(campaign.id);
            const applicationStatus = getApplicationStatus(campaign.id);

            return (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg line-clamp-2">{campaign.title}</h3>
                        <Badge variant="outline" className="ml-2 shrink-0">
                          {campaign.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {campaign.objective}
                      </p>
                      {campaign.msme?.profile?.companyName && (
                        <p className="text-xs text-muted-foreground">
                          by {campaign.msme.profile.companyName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {format(new Date(campaign.startDate), 'MMM dd')} -{' '}
                          {format(new Date(campaign.endDate), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          Offer: ₹{campaign.budgetPerCreator.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {campaign.creatorsCount} creators needed
                        </span>
                      </div>
                      <div className="text-muted-foreground">
                        {campaign.deliverables.length} deliverable{campaign.deliverables.length !== 1 ? 's' : ''}
                      </div>
                    </div>

                    {applied && applicationStatus && (
                      <div>
                        {applicationStatus === 'PENDING' && (
                          <Badge variant="secondary">Application Pending</Badge>
                        )}
                        {applicationStatus === 'APPROVED' && (
                          <Badge variant="default" className="bg-green-600">Approved</Badge>
                        )}
                        {applicationStatus === 'REJECTED' && (
                          <Badge variant="destructive">Rejected</Badge>
                        )}
                      </div>
                    )}

                    <div className="flex space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleViewDetails(campaign)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {!applied ? (
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleViewDetails(campaign)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Apply
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleViewDetails(campaign)}
                        >
                          View Application
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {selectedCampaign && (
        <CampaignDetailsModal
          campaign={selectedCampaign}
          open={detailsModalOpen}
          onOpenChange={setDetailsModalOpen}
          onApply={handleApply}
          hasApplied={hasApplied(selectedCampaign.id)}
          applicationStatus={getApplicationStatus(selectedCampaign.id)}
        />
      )}
    </div>
  );
}

