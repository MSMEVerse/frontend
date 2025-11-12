'use client';

import { BarterDeal, BarterDispute } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

interface DisputeDetailsProps {
  dispute: BarterDispute;
  deal: BarterDeal;
}

const statusColors = {
  OPEN: 'bg-red-500',
  IN_REVIEW: 'bg-yellow-500',
  RESOLVED: 'bg-green-500',
  CLOSED: 'bg-gray-500',
};

const statusIcons = {
  OPEN: AlertTriangle,
  IN_REVIEW: Clock,
  RESOLVED: CheckCircle2,
  CLOSED: CheckCircle2,
};

export default function DisputeDetails({ dispute, deal }: DisputeDetailsProps) {
  const StatusIcon = statusIcons[dispute.status] || AlertTriangle;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <StatusIcon className="h-6 w-6 text-red-500" />
              <div>
                <h4 className="font-semibold">Dispute Status</h4>
                <Badge className={statusColors[dispute.status] || 'bg-gray-500'}>
                  {dispute.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Reason</p>
              <p className="font-medium">{dispute.reason.replace('_', ' ')}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Description</p>
              <p className="text-sm">{dispute.description}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Raised By</p>
              <p className="text-sm">
                {dispute.raisedByUser
                  ? `${dispute.raisedByUser.firstName} ${dispute.raisedByUser.lastName}`
                  : 'Unknown'}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Raised On</p>
              <p className="text-sm">{format(new Date(dispute.createdAt), 'MMM dd, yyyy HH:mm')}</p>
            </div>

            {dispute.resolution && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Resolution</p>
                <p className="text-sm">{dispute.resolution}</p>
              </div>
            )}

            {dispute.resolvedAt && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Resolved On</p>
                <p className="text-sm">{format(new Date(dispute.resolvedAt), 'MMM dd, yyyy HH:mm')}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

