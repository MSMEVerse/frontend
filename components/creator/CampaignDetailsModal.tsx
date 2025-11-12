'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Campaign } from '@/lib/types';
import { format } from 'date-fns';
import { Calendar, DollarSign, Users, FileText, Building2, Eye, MessageCircle } from 'lucide-react';
import CampaignApplicationForm from './CampaignApplicationForm';
import CreatorProfileModal from '@/components/msme/CreatorProfileModal';
import { User, CreatorProfile } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';

interface CampaignDetailsModalProps {
  campaign: Campaign;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply?: (campaignId: string) => void;
  hasApplied?: boolean;
  applicationStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export default function CampaignDetailsModal({
  campaign,
  open,
  onOpenChange,
  onApply,
  hasApplied = false,
  applicationStatus,
}: CampaignDetailsModalProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [showMSMEProfile, setShowMSMEProfile] = useState(false);
  const { user } = useAuth();

  const handleApply = () => {
    setShowApplicationForm(true);
  };

  const handleApplicationSuccess = () => {
    setShowApplicationForm(false);
    onApply?.(campaign.id);
  };

  const getStatusBadge = () => {
    if (!hasApplied) return null;
    switch (applicationStatus) {
      case 'PENDING':
        return <Badge variant="secondary">Application Pending</Badge>;
      case 'APPROVED':
        return <Badge variant="default" className="bg-green-600">Approved</Badge>;
      case 'REJECTED':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{campaign.title}</DialogTitle>
            <DialogDescription>
              Campaign details and application
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Campaign Overview */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Objective</h3>
                    <p className="text-muted-foreground">{campaign.objective}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Start Date</p>
                        <p className="font-medium">
                          {format(new Date(campaign.startDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">End Date</p>
                        <p className="font-medium">
                          {format(new Date(campaign.endDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Offer</p>
                        <p className="font-medium">₹{campaign.budgetPerCreator.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Creators Needed</p>
                        <p className="font-medium">{campaign.creatorsCount}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm font-medium">Deliverables</p>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {campaign.deliverables.map((deliverable, index) => (
                        <li key={index}>{deliverable}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{campaign.type}</Badge>
                    {getStatusBadge()}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MSME Information */}
            {campaign.msme && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={campaign.msme.profile?.logo} />
                        <AvatarFallback>
                          <Building2 className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {campaign.msme.profile?.companyName || 'MSME'}
                        </h3>
                        {campaign.msme.profile?.tagline && (
                          <p className="text-sm text-muted-foreground">
                            {campaign.msme.profile.tagline}
                          </p>
                        )}
                        {campaign.msme.profile?.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {campaign.msme.profile.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowMSMEProfile(true)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Platform Fee Disclaimer */}
            <div className="p-3 bg-muted/50 border border-border rounded-md">
              <p className="text-sm text-foreground">
                <strong>Note:</strong> Our platform does not charge any commission or fees on deals. All transactions are between you and the brand directly.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 min-w-0">
              {!hasApplied ? (
                <Button onClick={handleApply} className="flex-1 min-w-0">
                  <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Apply to Campaign</span>
                </Button>
              ) : (
                <div className="flex-1">
                  {applicationStatus === 'APPROVED' && (
                    <p className="text-sm text-green-600 font-medium">
                      Your application has been approved! You can now chat with the brand.
                    </p>
                  )}
                  {applicationStatus === 'PENDING' && (
                    <p className="text-sm text-muted-foreground">
                      Your application is pending review by the brand.
                    </p>
                  )}
                  {applicationStatus === 'REJECTED' && (
                    <p className="text-sm text-red-600">
                      Your application was not selected for this campaign.
                    </p>
                  )}
                </div>
              )}
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Application Form Modal */}
      <CampaignApplicationForm
        campaign={campaign}
        open={showApplicationForm}
        onOpenChange={setShowApplicationForm}
        onSuccess={handleApplicationSuccess}
      />

      {/* MSME Profile Modal - Note: This uses CreatorProfileModal but we'd need MSMEProfileModal */}
      {/* For now, we'll skip this as it's not critical for the flow */}
    </>
  );
}

