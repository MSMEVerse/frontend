'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Campaign, CampaignApplication } from '@/lib/types';
import { format } from 'date-fns';
import { Search, Check, X, Eye, Users, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import CreatorProfileModal from './CreatorProfileModal';
import { User, CreatorProfile } from '@/lib/types';

interface CampaignApplicantsProps {
  campaign: Campaign;
  onApplicationUpdate?: () => void;
}

export default function CampaignApplicants({
  campaign,
  onApplicationUpdate,
}: CampaignApplicantsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCreator, setSelectedCreator] = useState<(User & { profile: CreatorProfile }) | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const applications = campaign.applications || [];
  const selectedCount = campaign.selectedCreators?.length || 0;
  const slotsRemaining = campaign.creatorsCount - selectedCount;

  const filteredApplications = applications.filter((app) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const creatorName = app.creator
        ? `${app.creator.firstName || ''} ${app.creator.lastName || ''}`.toLowerCase()
        : '';
      const proposal = app.proposal.toLowerCase();
      return creatorName.includes(query) || proposal.includes(query);
    }
    return true;
  });

  const handleApprove = async (application: CampaignApplication) => {
    try {
      // TODO: Call API to approve application
      console.log('Approve application:', application.id);
      
      // Update local state (in real app, this would come from API response)
      if (selectedCount < campaign.creatorsCount) {
        toast.success('Application approved! Creator added to campaign.');
        onApplicationUpdate?.();
      } else {
        toast.error('All slots are filled. Please remove a creator first.');
      }
    } catch (error) {
      toast.error('Failed to approve application');
    }
  };

  const handleReject = async (application: CampaignApplication) => {
    try {
      // TODO: Call API to reject application
      console.log('Reject application:', application.id);
      toast.success('Application rejected');
      onApplicationUpdate?.();
    } catch (error) {
      toast.error('Failed to reject application');
    }
  };

  const handleViewProfile = (application: CampaignApplication) => {
    if (application.creator && application.creator.profile) {
      setSelectedCreator(application.creator as User & { profile: CreatorProfile });
      setProfileModalOpen(true);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return <Badge variant="default" className="bg-green-600">Approved</Badge>;
      case 'REJECTED':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Applicants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Applications</p>
              <p className="text-2xl font-bold">{applications.length}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Selected Creators</p>
              <p className="text-2xl font-bold">
                {selectedCount}/{campaign.creatorsCount}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Slots Remaining</p>
              <p className="text-2xl font-bold">{slotsRemaining}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Note about Chat */}
      <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> Chat functionality will be available only after you approve a creator's application.
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search applicants by name or proposal..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-muted-foreground">
              {searchQuery ? 'No applicants match your search' : 'No applications yet'}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((application) => {
            const creator = application.creator;
            const isApproved = application.status === 'APPROVED';
            const isRejected = application.status === 'REJECTED';
            const isPending = application.status === 'PENDING';
            const canApprove = isPending && selectedCount < campaign.creatorsCount;

            return (
              <Card key={application.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Creator Info */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={creator?.avatar} />
                          <AvatarFallback>
                            {creator?.firstName?.[0] || creator?.email[0] || 'C'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">
                              {creator?.firstName && creator?.lastName
                                ? `${creator.firstName} ${creator.lastName}`
                                : creator?.email || 'Unknown Creator'}
                            </h3>
                            {getStatusBadge(application.status)}
                          </div>
                          {creator?.profile && (
                            <div className="space-y-1 text-sm text-muted-foreground">
                              {creator.profile.niche && creator.profile.niche.length > 0 && (
                                <p>Niche: {creator.profile.niche.join(', ')}</p>
                              )}
                              {creator.profile.followerCount && (
                                <p>
                                  {creator.profile.followerCount.toLocaleString()} followers
                                  {creator.profile.engagementRate && (
                                    <> • {creator.profile.engagementRate}% engagement</>
                                  )}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Proposal */}
                    <div>
                      <p className="text-sm font-medium mb-2">Proposal</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {application.proposal}
                      </p>
                    </div>

                    {/* Application Date */}
                    <div className="text-xs text-muted-foreground">
                      Applied on {format(new Date(application.createdAt), 'MMM dd, yyyy')}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 pt-2 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProfile(application)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                      {isApproved && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-600"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Chat Available
                        </Button>
                      )}
                      <div className="flex-1" />
                      {canApprove && (
                        <Button
                          size="sm"
                          onClick={() => handleApprove(application)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      )}
                      {isPending && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleReject(application)}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Reject
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

      {/* Creator Profile Modal */}
      {selectedCreator && (
        <CreatorProfileModal
          creator={selectedCreator}
          open={profileModalOpen}
          onOpenChange={setProfileModalOpen}
          onLaunchCampaign={() => {
            // Not applicable here
          }}
        />
      )}
    </div>
  );
}

