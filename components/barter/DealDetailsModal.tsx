'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BarterDeal } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { IndianRupee, Package, User, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DealStatusTimeline from './DealStatusTimeline';
import ValueMatching from './ValueMatching';
import NegotiationPanel from './NegotiationPanel';
import DeliveryTracking from './DeliveryTracking';
import ContentSubmission from './ContentSubmission';
import ContentReview from './ContentReview';
import DisputeForm from './DisputeForm';
import DisputeDetails from './DisputeDetails';
import BarterReview from './BarterReview';
import ReviewDisplay from './ReviewDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DealDetailsModalProps {
  deal: BarterDeal;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DealDetailsModal({
  deal,
  open,
  onOpenChange,
}: DealDetailsModalProps) {
  const { user } = useAuth();
  const isMSME = user?.role === 'MSME';
  const isCreator = user?.role === 'CREATOR';
  const otherParty = isMSME ? deal.creator : deal.brand;

  const statusColors: Record<string, string> = {
    PENDING: 'bg-gray-500',
    NEGOTIATING: 'bg-yellow-500',
    ACCEPTED: 'bg-blue-500',
    PRODUCT_SHIPPED: 'bg-purple-500',
    PRODUCT_DELIVERED: 'bg-indigo-500',
    CONTENT_SUBMITTED: 'bg-orange-500',
    CONTENT_APPROVED: 'bg-green-500',
    COMPLETED: 'bg-green-600',
    DISPUTED: 'bg-red-500',
    CANCELLED: 'bg-gray-600',
  };

  const statusLabels: Record<string, string> = {
    PENDING: 'Pending',
    NEGOTIATING: 'Negotiating',
    ACCEPTED: 'Accepted',
    PRODUCT_SHIPPED: 'Product Shipped',
    PRODUCT_DELIVERED: 'Product Delivered',
    CONTENT_SUBMITTED: 'Content Submitted',
    CONTENT_APPROVED: 'Content Approved',
    COMPLETED: 'Completed',
    DISPUTED: 'Disputed',
    CANCELLED: 'Cancelled',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl mb-2">
                {deal.product?.name || 'Barter Deal'}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Badge className={statusColors[deal.status] || 'bg-gray-500'}>
                  {statusLabels[deal.status] || deal.status}
                </Badge>
                {deal.product?.category && (
                  <Badge variant="outline">{deal.product.category}</Badge>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {deal.status === 'NEGOTIATING' && (
              <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
            )}
            {(deal.status === 'PRODUCT_SHIPPED' || deal.status === 'PRODUCT_DELIVERED' || deal.status === 'IN_TRANSIT') && (
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
            )}
            {(deal.status === 'CONTENT_SUBMITTED' || deal.status === 'CONTENT_APPROVED' || deal.status === 'PENDING_REVIEW') && (
              <TabsTrigger value="content">Content</TabsTrigger>
            )}
            {deal.status === 'DISPUTED' && (
              <TabsTrigger value="dispute">Dispute</TabsTrigger>
            )}
            {deal.status === 'COMPLETED' && (
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{isMSME ? 'Creator' : 'Brand'}</span>
                </div>
                <p className="font-medium">
                  {otherParty
                    ? isMSME
                      ? `${otherParty.firstName} ${otherParty.lastName}`
                      : otherParty.profile?.companyName || `${otherParty.firstName} ${otherParty.lastName}`
                    : 'N/A'}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Created</span>
                </div>
                <p className="font-medium">
                  {format(new Date(deal.createdAt), 'MMM dd, yyyy')}
                </p>
              </div>
            </div>

            <ValueMatching
              productValue={deal.productValue}
              contentValue={deal.contentValue}
            />

            {deal.product && (
              <div className="space-y-2">
                <h4 className="font-semibold">Product Details</h4>
                <p className="text-sm text-muted-foreground">{deal.product.description}</p>
              </div>
            )}

            {deal.deliverables && deal.deliverables.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold">Deliverables</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {deal.deliverables.map((deliverable, idx) => (
                    <li key={idx}>{deliverable}</li>
                  ))}
                </ul>
              </div>
            )}

            <DealStatusTimeline deal={deal} />
          </TabsContent>

          {deal.status === 'NEGOTIATING' && (
            <TabsContent value="negotiation">
              <NegotiationPanel deal={deal} />
            </TabsContent>
          )}

          {(deal.status === 'PRODUCT_SHIPPED' || deal.status === 'PRODUCT_DELIVERED' || deal.delivery) && (
            <TabsContent value="delivery">
              <DeliveryTracking deal={deal} />
            </TabsContent>
          )}

          {(deal.status === 'CONTENT_SUBMITTED' || deal.status === 'CONTENT_APPROVED' || deal.content) && (
            <TabsContent value="content">
              {isCreator && deal.status === 'ACCEPTED' && !deal.content && (
                <ContentSubmission deal={deal} />
              )}
              {isCreator && deal.content && deal.content.status === 'PENDING' && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Content is under review</p>
                </div>
              )}
              {isMSME && deal.content && (
                <ContentReview deal={deal} content={deal.content} />
              )}
              {isCreator && deal.content && deal.content.status === 'REVISION_REQUESTED' && (
                <ContentSubmission deal={deal} existingContent={deal.content} />
              )}
            </TabsContent>
          )}

          {deal.status === 'DISPUTED' && (
            <TabsContent value="dispute">
              {deal.dispute ? (
                <DisputeDetails dispute={deal.dispute} deal={deal} />
              ) : (
                <DisputeForm deal={deal} />
              )}
            </TabsContent>
          )}

          {deal.status === 'COMPLETED' && (
            <TabsContent value="reviews">
              <ReviewDisplay deal={deal} />
              <BarterReview deal={deal} />
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

