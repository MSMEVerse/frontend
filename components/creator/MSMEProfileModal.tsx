'use client';

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
import { MSMEProfile, User } from '@/lib/types';
import { Verified, Building2, ExternalLink, MapPin, Mail, Phone, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface MSMEProfileModalProps {
  msme: User & { profile: MSMEProfile };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply?: (msmeId: string) => void;
}

export default function MSMEProfileModal({
  msme,
  open,
  onOpenChange,
  onApply,
}: MSMEProfileModalProps) {
  const router = useRouter();

  const handleApply = () => {
    if (onApply) {
      onApply(msme.id);
    } else {
      // Navigate to campaign application or messaging
      router.push(`/campaigns?msmeId=${msme.id}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>{msme.profile.companyName}</span>
            {msme.profile.verified && (
              <Verified className="h-5 w-5 text-blue-500" />
            )}
          </DialogTitle>
          <DialogDescription>
            View company details and available campaigns
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Company Header */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={msme.profile.logo} />
              <AvatarFallback>
                <Building2 className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-bold">{msme.profile.companyName}</h3>
              {msme.profile.tagline && (
                <p className="text-muted-foreground mt-1">{msme.profile.tagline}</p>
              )}
              {msme.profile.city && (
                <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4" />
                  <span>{msme.profile.city}</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                {msme.profile.categories?.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Company Info */}
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {msme.profile.description && (
                <div>
                  <h4 className="font-semibold mb-2">About</h4>
                  <p className="text-muted-foreground">{msme.profile.description}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {msme.profile.pan && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">PAN</h4>
                    <p className="text-sm">{msme.profile.pan}</p>
                  </div>
                )}
                {msme.profile.gst && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-1">GST</h4>
                    <p className="text-sm">{msme.profile.gst}</p>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {msme.profile.socialLinks && (
                <div>
                  <h4 className="font-semibold mb-2">Social Links</h4>
                  <div className="flex flex-wrap gap-2">
                    {msme.profile.socialLinks.website && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={msme.profile.socialLinks.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          Website
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </a>
                      </Button>
                    )}
                    {msme.profile.socialLinks.instagram && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={msme.profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                          Instagram
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </a>
                      </Button>
                    )}
                    {msme.profile.socialLinks.facebook && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={msme.profile.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                          Facebook
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="campaigns">
              <p className="text-muted-foreground">No active campaigns available at the moment.</p>
            </TabsContent>

            <TabsContent value="verification" className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Verification Status</h4>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      msme.profile.kycStatus === 'VERIFIED'
                        ? 'default'
                        : msme.profile.kycStatus === 'PENDING'
                        ? 'secondary'
                        : 'destructive'
                    }
                  >
                    {msme.profile.kycStatus}
                  </Badge>
                  {msme.profile.verified && (
                    <Verified className="h-5 w-5 text-blue-500" />
                  )}
                </div>
              </div>

              {msme.profile.msmeCert && (
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">MSME Certificate</h4>
                  <p className="text-sm">Verified</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="flex space-x-4">
            <Button onClick={handleApply} className="flex-1">
              Apply for Campaign
            </Button>
            <Button variant="outline" className="flex-1">
              Message Brand
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

