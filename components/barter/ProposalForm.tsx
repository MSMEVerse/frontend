'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { BarterProduct } from '@/lib/types';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { IndianRupee } from 'lucide-react';
import { barterApi } from '@/lib/api/barter';

const proposalSchema = z.object({
  contentValue: z.number().min(1, 'Content value must be at least 1'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  deliverables: z.array(z.string()).min(1, 'Select at least one deliverable'),
});

type ProposalFormData = z.infer<typeof proposalSchema>;

interface ProposalFormProps {
  product: BarterProduct;
  onSuccess: (dealId: string) => void;
  onCancel: () => void;
}

const AVAILABLE_DELIVERABLES = [
  'Instagram Post',
  'Instagram Reel',
  'Instagram Story',
  'YouTube Video',
  'YouTube Short',
  'TikTok Video',
  'Blog Post',
  'LinkedIn Post',
  'Twitter/X Post',
  'Product Review',
  'Unboxing Video',
  'Tutorial Video',
];

export default function ProposalForm({ product, onSuccess, onCancel }: ProposalFormProps) {
  const { user } = useAuth();
  const [selectedDeliverables, setSelectedDeliverables] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<ProposalFormData>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      contentValue: product.estimatedValue,
      message: '',
      deliverables: [],
    },
  });

  const toggleDeliverable = (deliverable: string) => {
    const newDeliverables = selectedDeliverables.includes(deliverable)
      ? selectedDeliverables.filter((d) => d !== deliverable)
      : [...selectedDeliverables, deliverable];
    setSelectedDeliverables(newDeliverables);
    setValue('deliverables', newDeliverables, { shouldValidate: true });
  };

  const onSubmit = async (data: ProposalFormData) => {
    if (!user) {
      toast.error('You must be logged in to propose a barter');
      return;
    }

    try {
      const deal = await barterApi.proposeDeal(
        product.id,
        user.id,
        data.contentValue,
        data.deliverables
      );

      toast.success('Barter proposal submitted successfully!');
      onSuccess(deal.id);
    } catch (error) {
      toast.error('Failed to submit proposal. Please try again.');
      console.error('Proposal submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Product Info Display */}
      <div className="p-4 bg-muted rounded-lg space-y-2">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <div className="flex items-center gap-2">
          <IndianRupee className="h-4 w-4" />
          <span className="font-semibold">Product Value: {product.estimatedValue.toLocaleString()}</span>
        </div>
      </div>

      {/* Proposed Content Value */}
      <div className="space-y-2">
        <Label htmlFor="contentValue">
          Proposed Content Value (₹)
        </Label>
        <Input
          id="contentValue"
          type="number"
          {...register('contentValue', { valueAsNumber: true })}
          placeholder="Enter content value"
          className={errors.contentValue ? 'border-red-500' : ''}
        />
        {errors.contentValue && (
          <p className="text-sm text-red-500">{errors.contentValue.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          This is the value of content you're offering in exchange for the product.
        </p>
      </div>

      {/* Deliverables Selection */}
      <div className="space-y-2">
        <Label>Select Deliverables</Label>
        <div className="grid grid-cols-2 gap-3 p-4 border rounded-lg max-h-60 overflow-y-auto">
          {AVAILABLE_DELIVERABLES.map((deliverable) => (
            <div key={deliverable} className="flex items-center space-x-2">
              <Checkbox
                id={`deliverable-${deliverable}`}
                checked={selectedDeliverables.includes(deliverable)}
                onCheckedChange={() => toggleDeliverable(deliverable)}
              />
              <label
                htmlFor={`deliverable-${deliverable}`}
                className="text-sm font-normal cursor-pointer"
              >
                {deliverable}
              </label>
            </div>
          ))}
        </div>
        {errors.deliverables && (
          <p className="text-sm text-red-500">{errors.deliverables.message}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">Message to Brand</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Tell the brand about your content creation approach and why you'd be a good fit..."
          rows={4}
          className={errors.message ? 'border-red-500' : ''}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
        </Button>
      </div>
    </form>
  );
}

