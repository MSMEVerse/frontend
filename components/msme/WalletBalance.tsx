'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Plus } from 'lucide-react';
import PaymentButton from '@/components/escrow/PaymentButton';

interface WalletBalanceProps {
  balance: number;
  onAddFunds: () => void;
}

export default function WalletBalance({ balance, onAddFunds }: WalletBalanceProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="h-5 w-5" />
          <span>Wallet Balance</span>
        </CardTitle>
        <CardDescription>Your current wallet balance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-4xl font-bold">₹{balance.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Available for campaigns and payments
            </p>
          </div>
          <PaymentButton amount={0} onSuccess={() => {}} />
        </div>
      </CardContent>
    </Card>
  );
}

