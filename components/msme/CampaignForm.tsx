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
  totalBudget: z.number().min(1000, 'Total budget must be at least ₹1,000'),
  budgetPerCreator: z.number().min(100, 'Budget per creator must be at least ₹100'),
  type: z.enum(['PAID', 'BARTER']),
  deliverables: z.array(z.string()).min(1, 'At least one deliverable is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return new Date(data.endDate) > new Date(data.startDate);
  }
  return true;
}, {
  message: 'End date must be after start date',
  path: ['endDate'],
}).refine((data) => {
  return data.totalBudget >= data.budgetPerCreator;
}, {
  message: 'Total budget must be greater than or equal to budget per creator',
  path: ['totalBudget'],
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
  const totalBudget = watch('totalBudget');
  const budgetPerCreator = watch('budgetPerCreator');
  
  // Calculate creators count
  const creatorsCount = totalBudget && budgetPerCreator && budgetPerCreator > 0
    ? Math.floor(totalBudget / budgetPerCreator)
    : 0;

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
      // Calculate creatorsCount
      const creatorsCount = Math.floor(data.totalBudget / data.budgetPerCreator);
      
      // Prepare campaign data
      const campaignData = {
        ...data,
        creatorsCount,
        selectedCreators: [],
        status: 'OPEN' as const,
      };
      
      // TODO: Call API to create campaign
      console.log('Campaign data:', campaignData);
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
        <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> Our platform does not charge any commission or fees on deals. All transactions are between you and the creators directly.
          </p>
        </div>
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
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                {...register('startDate')}
                className={errors.startDate ? 'border-red-500' : ''}
              />
              {errors.startDate && (
                <p className="text-sm text-red-500">{errors.startDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                {...register('endDate')}
                className={errors.endDate ? 'border-red-500' : ''}
              />
              {errors.endDate && (
                <p className="text-sm text-red-500">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalBudget">Total Budget (₹) *</Label>
              <Input
                id="totalBudget"
                type="number"
                {...register('totalBudget', { valueAsNumber: true })}
                placeholder="100000"
                className={errors.totalBudget ? 'border-red-500' : ''}
              />
              {errors.totalBudget && (
                <p className="text-sm text-red-500">{errors.totalBudget.message}</p>
              )}
              <p className="text-xs text-muted-foreground">Total amount allocated for this campaign</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budgetPerCreator">Budget per Creator (₹) *</Label>
              <Input
                id="budgetPerCreator"
                type="number"
                {...register('budgetPerCreator', { valueAsNumber: true })}
                placeholder="5000"
                className={errors.budgetPerCreator ? 'border-red-500' : ''}
              />
              {errors.budgetPerCreator && (
                <p className="text-sm text-red-500">{errors.budgetPerCreator.message}</p>
              )}
              <p className="text-xs text-muted-foreground">Amount offered to each creator</p>
            </div>
          </div>

          {creatorsCount > 0 && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Number of Creators:</span>
                <span className="text-lg font-bold text-primary">{creatorsCount}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Based on total budget ÷ budget per creator
              </p>
            </div>
          )}

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

