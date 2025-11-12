'use client';

import { BarterDeal, BarterNegotiation } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { IndianRupee, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NegotiationOfferProps {
  negotiation: BarterNegotiation;
  deal: BarterDeal;
}

export default function NegotiationOffer({ negotiation, deal }: NegotiationOfferProps) {
  const { user } = useAuth();
  const isFromMe = negotiation.senderId === user?.id;

  return (
    <Card className={isFromMe ? 'bg-primary/5 border-primary/20' : ''}>
      <CardContent className="pt-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-sm">
              {negotiation.sender?.firstName} {negotiation.sender?.lastName}
            </span>
            {isFromMe && <Badge variant="outline" className="text-xs">You</Badge>}
          </div>
          <span className="text-xs text-muted-foreground">
            {format(new Date(negotiation.createdAt), 'MMM dd, HH:mm')}
          </span>
        </div>

        <p className="text-sm mb-3">{negotiation.message}</p>

        {negotiation.proposedContentValue && (
          <div className="flex items-center gap-2 text-sm">
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Proposed Content Value:</span>
            <span className="font-semibold">
              {negotiation.proposedContentValue.toLocaleString()}
            </span>
          </div>
        )}

        <div className="mt-3">
          <Badge
            variant={
              negotiation.status === 'ACCEPTED'
                ? 'default'
                : negotiation.status === 'REJECTED'
                ? 'destructive'
                : 'secondary'
            }
            className="text-xs"
          >
            {negotiation.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

