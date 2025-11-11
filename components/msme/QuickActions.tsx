import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Wallet, Users, Lightbulb } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button asChild className="w-full justify-start" size="lg">
            <Link href="/campaigns/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start" size="lg">
            <Link href="/wallet">
              <Wallet className="mr-2 h-4 w-4" />
              Add Funds to Wallet
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full justify-start" size="lg">
            <Link href="/marketplace">
              <Users className="mr-2 h-4 w-4" />
              Hire Creator
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <span>AI Tip</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Try running a UGC campaign in your local city! Local creators often have
            higher engagement rates and can help you reach your target audience more
            effectively.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

