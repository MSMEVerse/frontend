import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { User, Verified, Eye } from 'lucide-react';
import { CreatorProfile, User as UserType } from '@/lib/types';

interface SuggestedCreatorsProps {
  creators?: (UserType & { profile: CreatorProfile })[];
}

export default function SuggestedCreators({ creators = [] }: SuggestedCreatorsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggested Creators</CardTitle>
        <CardDescription>Top creators for your campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        {creators.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No suggested creators at the moment</p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/marketplace">Browse Marketplace</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {creators.slice(0, 3).map((creator) => (
              <div
                key={creator.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={creator.avatar} />
                    <AvatarFallback>
                      {creator.firstName?.[0] || creator.email[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">
                        {creator.firstName && creator.lastName
                          ? `${creator.firstName} ${creator.lastName}`
                          : creator.email}
                      </h3>
                      {creator.profile.verified && (
                        <Verified className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {creator.profile.niche?.join(', ')}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                      <span>
                        {creator.profile.followerCount?.toLocaleString()} followers
                      </span>
                      <span>
                        {creator.profile.engagementRate}% engagement
                      </span>
                      <span>₹{creator.profile.startingPrice?.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/marketplace/${creator.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
            <Button asChild variant="outline" className="w-full">
              <Link href="/marketplace">View All in Marketplace</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

