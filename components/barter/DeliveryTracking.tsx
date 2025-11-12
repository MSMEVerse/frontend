'use client';

import { BarterDeal } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import ShippingForm from './ShippingForm';
import DeliveryProofUpload from './DeliveryProofUpload';
import { useState } from 'react';

interface DeliveryTrackingProps {
  deal: BarterDeal;
}

const statusIcons = {
  PENDING: Clock,
  SHIPPED: Package,
  IN_TRANSIT: Truck,
  DELIVERED: CheckCircle2,
};

const statusColors = {
  PENDING: 'bg-gray-500',
  SHIPPED: 'bg-blue-500',
  IN_TRANSIT: 'bg-purple-500',
  DELIVERED: 'bg-green-500',
};

export default function DeliveryTracking({ deal }: DeliveryTrackingProps) {
  const { user } = useAuth();
  const isMSME = user?.role === 'MSME';
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [showProofUpload, setShowProofUpload] = useState(false);
  const delivery = deal.delivery;

  if (!delivery) {
    if (isMSME) {
      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Product has not been shipped yet.
          </p>
          <ShippingForm deal={deal} onSuccess={() => setShowShippingForm(false)} />
        </div>
      );
    } else {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Waiting for product to be shipped</p>
        </div>
      );
    }
  }

  const StatusIcon = statusIcons[delivery.status] || Clock;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <StatusIcon className={`h-6 w-6 ${statusColors[delivery.status]?.replace('bg-', 'text-') || 'text-gray-500'}`} />
              <div>
                <h4 className="font-semibold">Delivery Status</h4>
                <Badge className={statusColors[delivery.status] || 'bg-gray-500'}>
                  {delivery.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          </div>

          {delivery.trackingNumber && (
            <div className="space-y-2 mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Tracking Number</p>
                <p className="font-mono font-semibold">{delivery.trackingNumber}</p>
              </div>
              {delivery.carrier && (
                <div>
                  <p className="text-sm text-muted-foreground">Carrier</p>
                  <p className="font-medium">{delivery.carrier}</p>
                </div>
              )}
            </div>
          )}

          {delivery.shippedAt && (
            <div className="mb-2">
              <p className="text-sm text-muted-foreground">Shipped On</p>
              <p className="text-sm">{format(new Date(delivery.shippedAt), 'MMM dd, yyyy HH:mm')}</p>
            </div>
          )}

          {delivery.deliveredAt && (
            <div className="mb-2">
              <p className="text-sm text-muted-foreground">Delivered On</p>
              <p className="text-sm">{format(new Date(delivery.deliveredAt), 'MMM dd, yyyy HH:mm')}</p>
            </div>
          )}

          {delivery.deliveryProof && delivery.deliveryProof.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Delivery Proof</p>
              <div className="grid grid-cols-2 gap-2">
                {delivery.deliveryProof.map((proof, idx) => (
                  <img
                    key={idx}
                    src={proof}
                    alt={`Delivery proof ${idx + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {isMSME && delivery.status === 'PENDING' && (
        <ShippingForm deal={deal} onSuccess={() => setShowShippingForm(false)} />
      )}

      {!isMSME && delivery.status === 'SHIPPED' && !delivery.deliveredAt && (
        <DeliveryProofUpload deal={deal} onSuccess={() => setShowProofUpload(false)} />
      )}
    </div>
  );
}

