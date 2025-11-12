'use client';

import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Clock, CheckCircle2, FileText, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { mockCampaigns } from '@/lib/mocks';
import type { Campaign } from '@/lib/types';
import CampaignCard from '@/components/creator/CampaignCard';
import CampaignDetailsModal from '@/components/creator/CampaignDetailsModal';
import { useAuth } from '@/contexts/AuthContext';
import { format, differenceInDays, isAfter, isBefore } from 'date-fns';

export default function CreatorCampaigns() {
  const [selectedTab, setSelectedTab] = useState<'browse' | 'ongoing' | 'past' | 'applied'>('browse');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const { user } = useAuth();

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

  // Check if creator is selected/approved for a campaign
  const isSelected = (campaign: Campaign) => {
    if (!user || !campaign.selectedCreators) return false;
    return campaign.selectedCreators.includes(user.id);
  };

  // Browse campaigns: All open campaigns that creator hasn't been selected for yet
  const browseCampaigns = useMemo(() => {
    return mockCampaigns.filter((c) => {
      if (c.status !== 'OPEN' && c.status !== 'PENDING') return false;
      if (isSelected(c)) return false; // Don't show campaigns where creator is already selected
      return true;
    });
  }, [user]);

  // Ongoing campaigns: campaigns where creator is selected and status is ONGOING or PENDING_REVIEW
  const ongoingCampaigns = useMemo(() => {
    return mockCampaigns.filter((c) => {
      if (!isSelected(c)) return false;
      return c.status === 'ONGOING' || c.status === 'PENDING_REVIEW';
    });
  }, [user]);

  // Past campaigns: campaigns that are COMPLETED/CLOSED/RELEASED where creator was selected
  const pastCampaigns = useMemo(() => {
    return mockCampaigns.filter((c) => {
      if (!isSelected(c)) return false;
      return c.status === 'COMPLETED' || c.status === 'RELEASED' || c.status === 'CLOSED';
    });
  }, [user]);

  // Applied campaigns: campaigns where creator has applied (regardless of status)
  const appliedCampaigns = useMemo(() => {
    return mockCampaigns.filter((c) => {
      return hasApplied(c.id);
    });
  }, [user]);

  // Calculate stats for ongoing campaigns
  const ongoingStats = useMemo(() => {
    const totalEarnings = ongoingCampaigns.reduce((sum, c) => sum + (c.budgetPerCreator || 0), 0);
    const activeDays = ongoingCampaigns.reduce((sum, c) => {
      const days = differenceInDays(new Date(), new Date(c.startDate));
      return sum + Math.max(0, days);
    }, 0);
    return { count: ongoingCampaigns.length, totalEarnings, activeDays };
  }, [ongoingCampaigns]);

  // Calculate stats for past campaigns
  const pastStats = useMemo(() => {
    const totalEarnings = pastCampaigns.reduce((sum, c) => sum + (c.budgetPerCreator || 0), 0);
    return { count: pastCampaigns.length, totalEarnings };
  }, [pastCampaigns]);

  // Calculate stats for applied campaigns
  const appliedStats = useMemo(() => {
    const pending = appliedCampaigns.filter((c) => getApplicationStatus(c.id) === 'PENDING').length;
    const approved = appliedCampaigns.filter((c) => getApplicationStatus(c.id) === 'APPROVED').length;
    const rejected = appliedCampaigns.filter((c) => getApplicationStatus(c.id) === 'REJECTED').length;
    return { count: appliedCampaigns.length, pending, approved, rejected };
  }, [appliedCampaigns]);

  // Get campaign progress (for ongoing campaigns)
  const getCampaignProgress = (campaign: Campaign) => {
    const now = new Date();
    const start = new Date(campaign.startDate);
    const end = new Date(campaign.endDate);
    const totalDays = differenceInDays(end, start);
    const daysElapsed = differenceInDays(now, start);
    const progress = Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100));
    return { progress, daysElapsed, totalDays, isOverdue: isAfter(now, end) };
  };

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
        <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
        <p className="text-muted-foreground">
          Browse and manage your campaigns
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="browse" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>Browse</span>
            {browseCampaigns.length > 0 && (
              <Badge variant="secondary" className="ml-1">{browseCampaigns.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="ongoing" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Ongoing</span>
            {ongoingCampaigns.length > 0 && (
              <Badge variant="secondary" className="ml-1">{ongoingCampaigns.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Past</span>
            {pastCampaigns.length > 0 && (
              <Badge variant="secondary" className="ml-1">{pastCampaigns.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="applied" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Applied</span>
            {appliedCampaigns.length > 0 && (
              <Badge variant="secondary" className="ml-1">{appliedCampaigns.length}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          {browseCampaigns.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">No campaigns available</p>
                <p className="text-sm text-muted-foreground">New campaigns will appear here when they're posted</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {browseCampaigns.length} campaign{browseCampaigns.length !== 1 ? 's' : ''} available
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {browseCampaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    hasApplied={hasApplied(campaign.id)}
                    applicationStatus={getApplicationStatus(campaign.id)}
                    onViewDetails={() => handleViewDetails(campaign)}
                    onApply={() => handleViewDetails(campaign)}
                  />
                ))}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="ongoing" className="space-y-4">
          {ongoingCampaigns.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">No ongoing campaigns</p>
                <p className="text-sm text-muted-foreground">Campaigns you're currently working on will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Active Campaigns</p>
                        <p className="text-2xl font-bold">{ongoingStats.count}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                        <p className="text-2xl font-bold">₹{ongoingStats.totalEarnings.toLocaleString()}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Active Days</p>
                        <p className="text-2xl font-bold">{ongoingStats.activeDays}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ongoingCampaigns.map((campaign) => {
                  const progress = getCampaignProgress(campaign);
                  return (
                    <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-lg line-clamp-2">{campaign.title}</h3>
                              <Badge variant={campaign.status === 'PENDING_REVIEW' ? 'secondary' : 'default'}>
                                {campaign.status === 'PENDING_REVIEW' ? 'Under Review' : 'Active'}
                              </Badge>
                            </div>
                            {campaign.msme?.profile?.companyName && (
                              <p className="text-xs text-muted-foreground mb-3">
                                by {campaign.msme.profile.companyName}
                              </p>
                            )}
                            {progress.isOverdue && (
                              <Badge variant="destructive" className="mb-2">Overdue</Badge>
                            )}
                            <div className="space-y-2 mt-3">
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>Progress</span>
                                <span>{Math.round(progress.progress)}%</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all ${
                                    progress.isOverdue ? 'bg-destructive' : 'bg-primary'
                                  }`}
                                  style={{ width: `${Math.min(100, progress.progress)}%` }}
                                />
                              </div>
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{progress.daysElapsed} days elapsed</span>
                                <span>{progress.totalDays - progress.daysElapsed} days remaining</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div>
                              <p className="text-xs text-muted-foreground">Earnings</p>
                              <p className="font-semibold">₹{campaign.budgetPerCreator.toLocaleString()}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(campaign)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastCampaigns.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">No past campaigns</p>
                <p className="text-sm text-muted-foreground">Completed campaigns will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Completed Campaigns</p>
                        <p className="text-2xl font-bold">{pastStats.count}</p>
                      </div>
                      <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                        <p className="text-2xl font-bold">₹{pastStats.totalEarnings.toLocaleString()}</p>
                      </div>
                      <DollarSign className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastCampaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    hasApplied={hasApplied(campaign.id)}
                    applicationStatus={getApplicationStatus(campaign.id)}
                    onViewDetails={() => handleViewDetails(campaign)}
                  />
                ))}
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="applied" className="space-y-4">
          {appliedCampaigns.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">No applications yet</p>
                <p className="text-sm text-muted-foreground">Campaigns you've applied to will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Applications</p>
                        <p className="text-2xl font-bold">{appliedStats.count}</p>
                      </div>
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Pending</p>
                        <p className="text-2xl font-bold">{appliedStats.pending}</p>
                      </div>
                      <Clock className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Approved</p>
                        <p className="text-2xl font-bold text-green-600">{appliedStats.approved}</p>
                      </div>
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Rejected</p>
                        <p className="text-2xl font-bold text-destructive">{appliedStats.rejected}</p>
                      </div>
                      <FileText className="h-8 w-8 text-destructive" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {appliedCampaigns.map((campaign) => {
                  const status = getApplicationStatus(campaign.id);
                  return (
                    <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-lg line-clamp-2">{campaign.title}</h3>
                              {status && (
                                <Badge
                                  variant={
                                    status === 'APPROVED'
                                      ? 'default'
                                      : status === 'REJECTED'
                                      ? 'destructive'
                                      : 'secondary'
                                  }
                                  className={status === 'APPROVED' ? 'bg-green-600' : ''}
                                >
                                  {status === 'APPROVED'
                                    ? 'Approved'
                                    : status === 'REJECTED'
                                    ? 'Rejected'
                                    : 'Pending'}
                                </Badge>
                              )}
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
                                Applied: {format(new Date(campaign.startDate), 'MMM dd, yyyy')}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">
                                Offer: ₹{campaign.budgetPerCreator.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() => handleViewDetails(campaign)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>

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


