'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreatorProfile, User, Review } from '@/lib/types';
import { Verified, Star, Image as ImageIcon, BarChart3 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CreatorInsights from './CreatorInsights';

interface CreatorProfileModalProps {
  creator: User & { profile: CreatorProfile };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLaunchCampaign?: (creatorId: string) => void;
}

export default function CreatorProfileModal({
  creator,
  open,
  onOpenChange,
  onLaunchCampaign,
}: CreatorProfileModalProps) {
  const router = useRouter();

  const handleLaunchCampaign = () => {
    onOpenChange(false);
    if (onLaunchCampaign) {
      onLaunchCampaign(creator.id);
    } else {
      router.push(`/campaigns/create?creatorId=${creator.id}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[1400px] w-[95vw] max-h-[90vh] overflow-y-auto sm:!max-w-[1400px] md:!max-w-[1600px] lg:!max-w-[1800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Creator Profile</span>
            {creator.profile.verified && (
              <Verified className="h-5 w-5 text-blue-500" />
            )}
          </DialogTitle>
          <DialogDescription>
            View creator details and portfolio
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={creator.avatar} />
              <AvatarFallback>
                {creator.firstName?.[0] || creator.email[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-bold">
                {creator.firstName && creator.lastName
                  ? `${creator.firstName} ${creator.lastName}`
                  : creator.email}
              </h3>
              <p className="text-muted-foreground">{creator.profile.bio}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {creator.profile.niche?.map((niche, index) => (
                  <Badge key={index} variant="secondary">
                    {niche}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">
                {creator.profile.followerCount?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">
                {creator.profile.engagementRate || 0}%
              </p>
              <p className="text-sm text-muted-foreground">Engagement</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">
                ₹{creator.profile.startingPrice?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-muted-foreground">Starting Price</p>
            </div>
          </div>

          <Tabs defaultValue="insights">
            <TabsList>
              <TabsTrigger value="insights" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Insights</span>
              </TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="campaigns">Past Campaigns</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-4">
              <CreatorInsights metrics={creator.profile.performanceMetrics} />
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
                  >
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="campaigns">
              <p className="text-muted-foreground">No past campaigns to display</p>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-2xl font-bold">4.8</span>
                  <span className="text-muted-foreground">(24 reviews)</span>
                </div>
                <p className="text-muted-foreground">No reviews yet</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex space-x-4">
            <Button onClick={handleLaunchCampaign} className="flex-1">
              Launch Campaign
            </Button>
            <Button variant="outline" className="flex-1">
              Message Creator
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

