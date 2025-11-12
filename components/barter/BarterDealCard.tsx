'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarterDeal } from '@/lib/types';
import { format } from 'date-fns';
import { Eye, IndianRupee, Package, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import DealDetailsModal from './DealDetailsModal';

interface BarterDealCardProps {
  deal: BarterDeal;
}

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

export default function BarterDealCard({ deal }: BarterDealCardProps) {
  const { user } = useAuth();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const isMSME = user?.role === 'MSME';
  const otherParty = isMSME ? deal.creator : deal.brand;

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-2">
                {deal.product?.name || 'Product Deal'}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {otherParty && (
                  <>
                    <User className="h-4 w-4" />
                    <span>
                      {isMSME
                        ? `${otherParty.firstName} ${otherParty.lastName}`
                        : otherParty.profile?.companyName || `${otherParty.firstName} ${otherParty.lastName}`}
                    </span>
                  </>
                )}
              </div>
            </div>
            <Badge className={statusColors[deal.status] || 'bg-gray-500'}>
              {statusLabels[deal.status] || deal.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Product Value</p>
              <div className="flex items-center">
                <IndianRupee className="h-4 w-4 mr-1" />
                <span className="font-semibold">{deal.productValue.toLocaleString()}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Content Value</p>
              <div className="flex items-center">
                <IndianRupee className="h-4 w-4 mr-1" />
                <span className="font-semibold">{deal.contentValue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {deal.deliverables && deal.deliverables.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Deliverables</p>
              <ul className="text-sm list-disc list-inside">
                {deal.deliverables.slice(0, 3).map((deliverable, idx) => (
                  <li key={idx}>{deliverable}</li>
                ))}
                {deal.deliverables.length > 3 && (
                  <li className="text-muted-foreground">
                    +{deal.deliverables.length - 3} more
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            Created: {format(new Date(deal.createdAt), 'MMM dd, yyyy')}
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setDetailsOpen(true)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </CardContent>
      </Card>

      <DealDetailsModal
        deal={deal}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
}

