'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { CampaignFormData } from '@/lib/types';
import { useRouter } from 'next/navigation';

const campaignSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  objective: z.string().min(10, 'Objective must be at least 10 characters'),
  budget: z.number().min(1000, 'Budget must be at least ₹1,000'),
  type: z.enum(['PAID', 'BARTER']),
  deliverables: z.array(z.string()).min(1, 'At least one deliverable is required'),
  deadline: z.string().min(1, 'Deadline is required'),
  creatorId: z.string().optional(),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

export default function CampaignForm() {
  const router = useRouter();
  const [deliverables, setDeliverables] = useState<string[]>(['']);
  const [deliverableInput, setDeliverableInput] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      type: 'PAID',
      deliverables: [],
    },
  });

  const type = watch('type');

  const addDeliverable = () => {
    if (deliverableInput.trim()) {
      const newDeliverables = [...deliverables, deliverableInput.trim()];
      setDeliverables(newDeliverables);
      setValue('deliverables', newDeliverables, { shouldValidate: true });
      setDeliverableInput('');
    }
  };

  const removeDeliverable = (index: number) => {
    const newDeliverables = deliverables.filter((_, i) => i !== index);
    setDeliverables(newDeliverables);
    setValue('deliverables', newDeliverables, { shouldValidate: true });
  };

  const onSubmit = async (data: CampaignFormValues) => {
    try {
      // TODO: Call API to create campaign
      console.log('Campaign data:', data);
      toast.success('Campaign created successfully');
      router.push('/campaigns');
    } catch (error) {
      toast.error('Failed to create campaign');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Campaign</CardTitle>
        <CardDescription>Fill in the details to create a new campaign</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Campaign Title *</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="e.g., Product Launch Campaign"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="objective">Campaign Objective *</Label>
            <Textarea
              id="objective"
              {...register('objective')}
              placeholder="Describe your campaign goals and objectives"
              rows={4}
              className={errors.objective ? 'border-red-500' : ''}
            />
            {errors.objective && (
              <p className="text-sm text-red-500">{errors.objective.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (₹) *</Label>
              <Input
                id="budget"
                type="number"
                {...register('budget', { valueAsNumber: true })}
                placeholder="50000"
                className={errors.budget ? 'border-red-500' : ''}
              />
              {errors.budget && (
                <p className="text-sm text-red-500">{errors.budget.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Campaign Type *</Label>
              <Select
                value={type}
                onValueChange={(value) => setValue('type', value as 'PAID' | 'BARTER')}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PAID">Paid</SelectItem>
                  <SelectItem value="BARTER">Barter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline *</Label>
            <Input
              id="deadline"
              type="date"
              {...register('deadline')}
              className={errors.deadline ? 'border-red-500' : ''}
            />
            {errors.deadline && (
              <p className="text-sm text-red-500">{errors.deadline.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Deliverables *</Label>
            <div className="space-y-2">
              {deliverables.map((deliverable, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={deliverable}
                    onChange={(e) => {
                      const newDeliverables = [...deliverables];
                      newDeliverables[index] = e.target.value;
                      setDeliverables(newDeliverables);
                      setValue('deliverables', newDeliverables, { shouldValidate: true });
                    }}
                    placeholder="e.g., 3 Instagram posts"
                  />
                  {deliverables.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDeliverable(index)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={addDeliverable}
              >
                Add Deliverable
              </Button>
            </div>
            {errors.deliverables && (
              <p className="text-sm text-red-500">{errors.deliverables.message}</p>
            )}
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Campaign'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

