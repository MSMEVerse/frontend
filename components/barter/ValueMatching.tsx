'use client';

import { Card, CardContent } from '@/components/ui/card';
import { IndianRupee, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ValueMatchingProps {
  productValue: number;
  contentValue: number;
}

export default function ValueMatching({ productValue, contentValue }: ValueMatchingProps) {
  const difference = contentValue - productValue;
  const differencePercent = productValue > 0 ? ((difference / productValue) * 100).toFixed(1) : '0';
  const isBalanced = Math.abs(difference) < productValue * 0.1; // Within 10% is considered balanced

  return (
    <Card>
      <CardContent className="pt-6">
        <h4 className="font-semibold mb-4">Value Matching</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Product Value</p>
              <div className="flex items-center mt-1">
                <IndianRupee className="h-5 w-5 mr-1" />
                <span className="text-xl font-bold">{productValue.toLocaleString()}</span>
              </div>
            </div>
            <Minus className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Content Value</p>
              <div className="flex items-center mt-1">
                <IndianRupee className="h-5 w-5 mr-1" />
                <span className="text-xl font-bold">{contentValue.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Difference</span>
              <div className="flex items-center gap-2">
                {difference > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : difference < 0 ? (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                ) : null}
                <span
                  className={`font-semibold ${
                    isBalanced
                      ? 'text-green-500'
                      : difference > 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {difference > 0 ? '+' : ''}
                  {difference.toLocaleString()} ({differencePercent}%)
                </span>
              </div>
            </div>
            {isBalanced && (
              <p className="text-xs text-green-500 mt-2">Values are well balanced!</p>
            )}
            {!isBalanced && difference > 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                Content value is higher than product value
              </p>
            )}
            {!isBalanced && difference < 0 && (
              <p className="text-xs text-muted-foreground mt-2">
                Product value is higher than content value
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

