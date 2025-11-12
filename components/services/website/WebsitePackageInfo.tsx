'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WebsitePackage } from '@/lib/types';
import { Check } from 'lucide-react';

interface WebsitePackageInfoProps {
  package: WebsitePackage;
}

export default function WebsitePackageInfo({ package: pkg }: WebsitePackageInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{pkg.name}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Package Features:</p>
          <ul className="space-y-2">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Delivery Time</span>
            <span className="font-medium">{pkg.deliveryTime}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

