import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Search, Wallet, DollarSign } from 'lucide-react';

export default function CreatorQuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button asChild className="w-full justify-start" size="lg">
          <Link href="/campaigns">
            <Search className="mr-2 h-4 w-4" />
            Find New Campaigns
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start" size="lg">
          <Link href="/wallet">
            <Wallet className="mr-2 h-4 w-4" />
            Withdraw Earnings
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start" size="lg">
          <Link href="/profile">
            <DollarSign className="mr-2 h-4 w-4" />
            Update Pricing
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

