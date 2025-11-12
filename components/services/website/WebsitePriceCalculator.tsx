'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WebsitePage } from '@/lib/types';
import { IndianRupee } from 'lucide-react';

interface WebsitePriceCalculatorProps {
  basePrice: number;
  selectedPages: WebsitePage[];
  basePageIds: string[];
}

export default function WebsitePriceCalculator({
  basePrice,
  selectedPages,
  basePageIds,
}: WebsitePriceCalculatorProps) {
  const additionalPages = selectedPages.filter((p) => !basePageIds.includes(p.id));
  const additionalPrice = additionalPages.reduce((sum, p) => sum + p.price, 0);
  const totalPrice = basePrice + additionalPrice;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Base Package</span>
            <span className="font-medium">₹{basePrice.toLocaleString()}</span>
          </div>
          {additionalPages.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Additional Pages:</p>
              {additionalPages.map((page) => (
                <div key={page.id} className="flex items-center justify-between text-sm pl-4">
                  <span className="text-muted-foreground">{page.name}</span>
                  <span className="font-medium">+₹{page.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Total Price</span>
            <div className="flex items-center gap-1">
              <IndianRupee className="h-5 w-5" />
              <span className="text-2xl font-bold">{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

