'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MetaAdsCampaign, MetaAdsPlatform, MetaAdsObjective, MetaAdsStatus } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const campaignSchema = z.object({
  name: z.string().min(1, 'Campaign name is required'),
  objective: z.enum(['AWARENESS', 'TRAFFIC', 'ENGAGEMENT', 'LEADS', 'CONVERSIONS', 'SALES']),
  platform: z.enum(['FACEBOOK', 'INSTAGRAM', 'BOTH']),
  budget: z.number().min(1, 'Budget must be at least 1'),
  dailyBudget: z.number().optional(),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

interface MetaAdsCampaignFormProps {
  campaign?: MetaAdsCampaign | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function MetaAdsCampaignForm({
  campaign,
  onSuccess,
  onCancel,
}: MetaAdsCampaignFormProps) {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: campaign
      ? {
          name: campaign.name,
          objective: campaign.objective,
          platform: campaign.platform,
          budget: campaign.budget,
          dailyBudget: campaign.dailyBudget,
          startDate: campaign.startDate.split('T')[0],
          endDate: campaign.endDate?.split('T')[0],
        }
      : {
          name: '',
          objective: 'AWARENESS',
          platform: 'BOTH',
          budget: 0,
          dailyBudget: undefined,
          startDate: new Date().toISOString().split('T')[0],
          endDate: undefined,
        },
  });

  const onSubmit = async (data: CampaignFormData) => {
    if (!user) {
      toast.error('You must be logged in to create a campaign');
      return;
    }

    try {
      // TODO: Call API to create/update campaign
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(campaign ? 'Campaign updated successfully!' : 'Campaign created successfully!');
      onSuccess();
    } catch (error) {
      toast.error('Failed to save campaign. Please try again.');
      console.error('Campaign save error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Campaign Name</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="Enter campaign name"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="objective">Objective</Label>
          <Select
            value={watch('objective')}
            onValueChange={(value) => setValue('objective', value as MetaAdsObjective)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AWARENESS">Awareness</SelectItem>
              <SelectItem value="TRAFFIC">Traffic</SelectItem>
              <SelectItem value="ENGAGEMENT">Engagement</SelectItem>
              <SelectItem value="LEADS">Leads</SelectItem>
              <SelectItem value="CONVERSIONS">Conversions</SelectItem>
              <SelectItem value="SALES">Sales</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="platform">Platform</Label>
          <Select
            value={watch('platform')}
            onValueChange={(value) => setValue('platform', value as MetaAdsPlatform)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FACEBOOK">Facebook</SelectItem>
              <SelectItem value="INSTAGRAM">Instagram</SelectItem>
              <SelectItem value="BOTH">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Total Budget (₹)</Label>
          <Input
            id="budget"
            type="number"
            {...register('budget', { valueAsNumber: true })}
            placeholder="Enter total budget"
            className={errors.budget ? 'border-red-500' : ''}
          />
          {errors.budget && (
            <p className="text-sm text-red-500">{errors.budget.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dailyBudget">Daily Budget (₹) - Optional</Label>
          <Input
            id="dailyBudget"
            type="number"
            {...register('dailyBudget', { valueAsNumber: true })}
            placeholder="Enter daily budget"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
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
          <Label htmlFor="endDate">End Date - Optional</Label>
          <Input
            id="endDate"
            type="date"
            {...register('endDate')}
          />
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : campaign ? 'Update Campaign' : 'Create Campaign'}
        </Button>
      </div>
    </form>
  );
}

