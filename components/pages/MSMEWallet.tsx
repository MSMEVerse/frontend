'use client';

import WalletBalance from '@/components/msme/WalletBalance';
import TransactionHistory from '@/components/msme/TransactionHistory';
import { mockTransactions } from '@/lib/mocks';

export default function MSMEWallet() {
  const balance = 125000; // Mock balance
  const transactions = mockTransactions;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Wallet & Transactions</h1>
        <p className="text-muted-foreground">
          Manage your wallet and view transaction history
        </p>
      </div>

      <WalletBalance balance={balance} onAddFunds={() => {}} />

      <TransactionHistory transactions={transactions} />
    </div>
  );
}

