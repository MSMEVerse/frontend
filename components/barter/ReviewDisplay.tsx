'use client';

import { BarterDeal } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { format } from 'date-fns';
import { mockBarterReviews } from '@/lib/mocks';
import { useAuth } from '@/contexts/AuthContext';

interface ReviewDisplayProps {
  deal: BarterDeal;
}

export default function ReviewDisplay({ deal }: ReviewDisplayProps) {
  const { user } = useAuth();
  const reviews = mockBarterReviews.filter((r) => r.dealId === deal.id);
  const otherParty = user?.role === 'MSME' ? deal.creator : deal.brand;

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Reviews</h4>
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium">
                  {review.reviewer?.firstName} {review.reviewer?.lastName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                </p>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
              </div>
            </div>
            {review.comment && (
              <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

