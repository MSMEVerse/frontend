'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Download } from 'lucide-react';
import { mockTransactions } from '@/lib/mocks';
import { Transaction, TransactionStatus, TransactionType } from '@/lib/types';
import { format } from 'date-fns';

export default function AdminTransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const transactions = mockTransactions;

  const filteredTransactions = transactions.filter((transaction) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        transaction.purpose.toLowerCase().includes(query) ||
        transaction.id.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'PENDING':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'FAILED':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeLabel = (type: TransactionType) => {
    return type.charAt(0) + type.slice(1).toLowerCase();
  };

  const exportToCSV = () => {
    // TODO: Implement CSV export
    console.log('Exporting to CSV');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transaction Management</h1>
        <p className="text-muted-foreground">
          View and manage all platform transactions
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>All platform transactions</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm" onClick={exportToCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(new Date(transaction.createdAt), 'MMM dd, yyyy HH:mm')}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {transaction.userId}
                  </TableCell>
                  <TableCell>{getTypeLabel(transaction.type)}</TableCell>
                  <TableCell className="font-medium">
                    ₹{transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{transaction.purpose}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

