'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Campaign } from '@/lib/types';
import { format } from 'date-fns';
import { Calendar, DollarSign, Users, FileText } from 'lucide-react';

const applicationSchema = z.object({
  proposal: z.string().min(50, 'Proposal must be at least 50 characters'),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface CampaignApplicationFormProps {
  campaign: Campaign;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function CampaignApplicationForm({
  campaign,
  open,
  onOpenChange,
  onSuccess,
}: CampaignApplicationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    try {
      // TODO: Call API to submit application
      console.log('Application data:', {
        campaignId: campaign.id,
        proposal: data.proposal,
      });
      toast.success('Application submitted successfully!');
      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to submit application');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply to Campaign</DialogTitle>
          <DialogDescription>
            Submit your proposal for this campaign
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Campaign Details */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{campaign.title}</h3>
                  <p className="text-sm text-muted-foreground">{campaign.objective}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Start Date</p>
                      <p className="font-medium">
                        {format(new Date(campaign.startDate), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">End Date</p>
                      <p className="font-medium">
                        {format(new Date(campaign.endDate), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Offer</p>
                      <p className="font-medium">₹{campaign.budgetPerCreator.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground">Creators Needed</p>
                      <p className="font-medium">{campaign.creatorsCount}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium">Deliverables</p>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {campaign.deliverables.map((deliverable, index) => (
                      <li key={index}>{deliverable}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Badge variant="outline">{campaign.type}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Fee Disclaimer */}
          <div className="p-3 bg-muted/50 border border-border rounded-md">
            <p className="text-sm text-foreground">
              <strong>Note:</strong> Our platform does not charge any commission or fees on deals. All transactions are between you and the brand directly.
            </p>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="proposal">Your Proposal *</Label>
              <Textarea
                id="proposal"
                {...register('proposal')}
                placeholder="Describe why you're a good fit for this campaign, your approach, and any relevant experience..."
                rows={8}
                className={errors.proposal ? 'border-red-500' : ''}
              />
              {errors.proposal && (
                <p className="text-sm text-red-500">{errors.proposal.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Minimum 50 characters. Be specific about your approach and experience.
              </p>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

