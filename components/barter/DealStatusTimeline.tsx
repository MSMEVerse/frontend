'use client';

import { BarterDeal } from '@/lib/types';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface DealStatusTimelineProps {
  deal: BarterDeal;
}

const statusSteps = [
  { key: 'PENDING', label: 'Deal Created' },
  { key: 'NEGOTIATING', label: 'Negotiating' },
  { key: 'ACCEPTED', label: 'Deal Accepted' },
  { key: 'PRODUCT_SHIPPED', label: 'Product Shipped' },
  { key: 'PRODUCT_DELIVERED', label: 'Product Delivered' },
  { key: 'CONTENT_SUBMITTED', label: 'Content Submitted' },
  { key: 'CONTENT_APPROVED', label: 'Content Approved' },
  { key: 'COMPLETED', label: 'Completed' },
];

export default function DealStatusTimeline({ deal }: DealStatusTimelineProps) {
  const currentStepIndex = statusSteps.findIndex(step => step.key === deal.status);
  const isCompleted = deal.status === 'COMPLETED';
  const isDisputed = deal.status === 'DISPUTED';
  const isCancelled = deal.status === 'CANCELLED';

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Deal Progress</h4>
      <div className="relative">
        {statusSteps.map((step, index) => {
          const isActive = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isPast = index < currentStepIndex;

          if (isDisputed || isCancelled) {
            return null;
          }

          return (
            <div key={step.key} className="flex items-start gap-4 pb-6 last:pb-0">
              <div className="flex flex-col items-center">
                {isPast ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : isCurrent ? (
                  <Clock className="h-6 w-6 text-blue-500" />
                ) : (
                  <Circle className="h-6 w-6 text-muted-foreground" />
                )}
                {index < statusSteps.length - 1 && (
                  <div
                    className={`w-0.5 h-full min-h-[2rem] mt-2 ${
                      isPast ? 'bg-green-500' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
              <div className="flex-1 pt-1">
                <p
                  className={`font-medium ${
                    isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </p>
                {isCurrent && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Current status
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {isDisputed && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-sm text-red-500 font-medium">Deal is in dispute</p>
        </div>
      )}
      {isCancelled && (
        <div className="p-4 bg-gray-500/10 border border-gray-500/20 rounded-lg">
          <p className="text-sm text-gray-500 font-medium">Deal has been cancelled</p>
        </div>
      )}
    </div>
  );
}

