'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatPanel from '@/components/chat/ChatPanel';
import EscrowStatus from '@/components/escrow/EscrowStatus';
import { mockCampaigns } from '@/lib/mocks';
import { Campaign, CampaignStatus } from '@/lib/types';
import { format } from 'date-fns';
import { Check, X, Upload, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function CampaignDetailsPage() {
  const params = useParams();
  const campaignId = params.id as string;
  const { user } = useAuth();

  // Mock data - in real app, fetch from API
  const campaign = mockCampaigns.find((c) => c.id === campaignId);

  if (!campaign) {
    return (
      <div className="text-center py-12">
        <p>Campaign not found</p>
      </div>
    );
  }

  const handleApprove = () => {
    // TODO: Implement approval
    console.log('Approve campaign');
  };

  const handleRequestRevision = () => {
    // TODO: Implement revision request
    console.log('Request revision');
  };

  const isMSME = user?.role === 'MSME';
  const isCreator = user?.role === 'CREATOR';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{campaign.title}</h1>
          <p className="text-muted-foreground">{campaign.objective}</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">{campaign.status}</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Brief</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Duration</p>
                <p className="text-lg">
                  {format(new Date(campaign.startDate), 'MMM dd, yyyy')} - {format(new Date(campaign.endDate), 'MMM dd, yyyy')}
                </p>
              </div>
              {isMSME ? (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                  <p className="text-lg font-semibold">₹{campaign.totalBudget.toLocaleString()}</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Offer</p>
                  <p className="text-lg font-semibold">₹{campaign.budgetPerCreator.toLocaleString()}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-muted-foreground">Deliverables</p>
                <ul className="list-disc list-inside space-y-1">
                  {campaign.deliverables.map((deliverable, index) => (
                    <li key={index}>{deliverable}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {isMSME && campaign.status === 'PENDING_REVIEW' && (
            <Card>
              <CardHeader>
                <CardTitle>Review Deliverables</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Creator has submitted deliverables for review
                  </p>
                  <Button onClick={handleApprove} className="w-full">
                    <Check className="h-4 w-4 mr-2" />
                    Approve & Release Payment
                  </Button>
                  <Button onClick={handleRequestRevision} variant="outline" className="w-full">
                    <X className="h-4 w-4 mr-2" />
                    Request Revision
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {isCreator && campaign.status === 'ONGOING' && (
            <Card>
              <CardHeader>
                <CardTitle>Submit Deliverables</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Deliverables
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {campaign.creator && isMSME && (
            <Card>
              <CardHeader>
                <CardTitle>Creator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">
                  {campaign.creator.firstName && campaign.creator.lastName
                    ? `${campaign.creator.firstName} ${campaign.creator.lastName}`
                    : campaign.creator.email}
                </p>
              </CardContent>
            </Card>
          )}

          {campaign.msme && isCreator && (
            <Card>
              <CardHeader>
                <CardTitle>Brand</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">
                  {campaign.msme.profile?.companyName || 'MSME'}
                </p>
              </CardContent>
            </Card>
          )}

          <EscrowStatus
            status={campaign.status === 'COMPLETED' ? 'COMPLETED' : 'ONGOING'}
            amount={isMSME ? campaign.totalBudget : campaign.budgetPerCreator}
            progress={50}
          />

          {(campaign.creatorId || campaign.msmeId) && (
            <ChatPanel
              campaignId={campaignId}
              recipientId={
                isMSME ? campaign.creatorId || '' : campaign.msmeId || ''
              }
              recipientName={
                isMSME
                  ? campaign.creator
                    ? `${campaign.creator.firstName || ''} ${campaign.creator.lastName || ''}`.trim() ||
                      campaign.creator.email
                    : 'Creator'
                  : campaign.msme?.profile?.companyName || 'Brand'
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}


