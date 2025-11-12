'use client';

import { useState } from 'react';
import { BarterDeal } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { BarterDisputeReason } from '@/lib/types';

interface DisputeFormProps {
  deal: BarterDeal;
}

const DISPUTE_REASONS: { value: BarterDisputeReason; label: string }[] = [
  { value: 'PRODUCT_QUALITY', label: 'Product Quality Issue' },
  { value: 'PRODUCT_NOT_RECEIVED', label: 'Product Not Received' },
  { value: 'CONTENT_QUALITY', label: 'Content Quality Issue' },
  { value: 'CONTENT_NOT_SUBMITTED', label: 'Content Not Submitted' },
  { value: 'VALUE_MISMATCH', label: 'Value Mismatch' },
  { value: 'OTHER', label: 'Other' },
];

export default function DisputeForm({ deal }: DisputeFormProps) {
  const [reason, setReason] = useState<BarterDisputeReason>('OTHER');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      toast.error('Please provide a description');
      return;
    }

    // TODO: Call API to raise dispute
    console.log('Raising dispute:', { dealId: deal.id, reason, description });
    toast.success('Dispute raised successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <p className="text-sm text-muted-foreground">
          Raising a dispute will pause the deal until it is resolved. Please provide detailed information about the issue.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Reason for Dispute *</Label>
        <Select value={reason} onValueChange={(value) => setReason(value as BarterDisputeReason)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {DISPUTE_REASONS.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue in detail..."
          rows={6}
          required
        />
      </div>

      <Button type="submit" variant="destructive" className="w-full">
        Raise Dispute
      </Button>
    </form>
  );
}

