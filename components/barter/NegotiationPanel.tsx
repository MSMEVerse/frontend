'use client';

import { useState } from 'react';
import { BarterDeal } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Send, Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import NegotiationOffer from './NegotiationOffer';

interface NegotiationPanelProps {
  deal: BarterDeal;
}

export default function NegotiationPanel({ deal }: NegotiationPanelProps) {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [proposedContentValue, setProposedContentValue] = useState(deal.contentValue.toString());
  const negotiations = deal.negotiationHistory || [];

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }

    // TODO: Send negotiation message via API
    console.log('Sending negotiation:', { message, proposedContentValue });
    toast.success('Negotiation message sent!');
    setMessage('');
  };

  const handleAccept = () => {
    // TODO: Accept deal via API
    console.log('Accepting deal:', deal.id);
    toast.success('Deal accepted!');
  };

  const handleReject = () => {
    // TODO: Reject deal via API
    console.log('Rejecting deal:', deal.id);
    toast.success('Deal rejected');
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {negotiations.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No negotiation messages yet
          </p>
        ) : (
          negotiations.map((negotiation) => (
            <NegotiationOffer
              key={negotiation.id}
              negotiation={negotiation}
              deal={deal}
            />
          ))
        )}
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contentValue">Proposed Content Value (₹)</Label>
            <Input
              id="contentValue"
              type="number"
              value={proposedContentValue}
              onChange={(e) => setProposedContentValue(e.target.value)}
              placeholder="Enter proposed value"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your negotiation message..."
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSendMessage} className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            {user?.id === deal.brandId && (
              <>
                <Button onClick={handleAccept} variant="default" className="flex-1">
                  <Check className="h-4 w-4 mr-2" />
                  Accept Deal
                </Button>
                <Button onClick={handleReject} variant="destructive" className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

