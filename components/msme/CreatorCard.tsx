import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Verified, Eye, MessageCircle } from 'lucide-react';
import { CreatorProfile, User as UserType } from '@/lib/types';

interface CreatorCardProps {
  creator: UserType & { profile: CreatorProfile };
  onViewProfile?: (creatorId: string) => void;
  onStartCampaign?: (creatorId: string) => void;
}

export default function CreatorCard({
  creator,
  onViewProfile,
  onStartCampaign,
}: CreatorCardProps) {
  const getInitials = (user: UserType) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return user.email[0].toUpperCase();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={creator.avatar} />
            <AvatarFallback>{getInitials(creator)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold truncate">
                {creator.firstName && creator.lastName
                  ? `${creator.firstName} ${creator.lastName}`
                  : creator.email}
              </h3>
              {creator.profile.verified && (
                <Verified className="h-4 w-4 text-blue-500 flex-shrink-0" />
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {creator.profile.niche?.slice(0, 2).map((niche, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {niche}
                </Badge>
              ))}
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span>
                  {creator.profile.followerCount?.toLocaleString() || 0} followers
                </span>
                <span>{creator.profile.engagementRate || 0}% engagement</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-foreground">
                  Starting at ₹{creator.profile.startingPrice?.toLocaleString() || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-2 min-w-0">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 min-w-0"
          onClick={() => onViewProfile?.(creator.id)}
        >
          <Eye className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">View Profile</span>
        </Button>
        <Button
          size="sm"
          className="flex-1 min-w-0"
          onClick={() => onStartCampaign?.(creator.id)}
        >
          <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Reach Out</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

