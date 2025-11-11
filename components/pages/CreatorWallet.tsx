'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpRight } from 'lucide-react';
import { mockTransactions } from '@/lib/mocks';
import { format } from 'date-fns';

export default function CreatorWallet() {
  const balance = 75000;
  const pendingPayouts = 25000;
  const totalEarnings = 250000;

  const earnings = mockTransactions.filter((t) => t.type === 'PAYOUT');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wallet & Earnings</h1>
        <p className="text-muted-foreground">
          Manage your earnings and withdrawals
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{balance.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Available for withdrawal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{pendingPayouts.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">Awaiting release</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{totalEarnings.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">All-time earnings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Withdraw Funds</CardTitle>
            <CardDescription>Request a withdrawal to your bank account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              Withdraw Earnings
            </Button>
            <p className="text-xs text-muted-foreground">
              Minimum withdrawal amount: ₹1,000
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Escrow Status</CardTitle>
            <CardDescription>Funds waiting for release</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Release</span>
                <span className="font-semibold">₹{pendingPayouts.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Expected release date</span>
                <span>Within 7 days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Earnings Summary</CardTitle>
          <CardDescription>Your earnings breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">₹50,000</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">₹{totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your earnings and withdrawals</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {earnings.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(new Date(transaction.createdAt), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell className="font-medium">
                    ₹{transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

