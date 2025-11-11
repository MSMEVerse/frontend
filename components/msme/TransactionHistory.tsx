import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Transaction, TransactionStatus, TransactionType } from '@/lib/types';
import { format } from 'date-fns';
import { Download } from 'lucide-react';

interface TransactionHistoryProps {
  transactions?: Transaction[];
}

export default function TransactionHistory({ transactions = [] }: TransactionHistoryProps) {
  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: TransactionType) => {
    switch (type) {
      case 'DEPOSIT':
        return 'Deposit';
      case 'WITHDRAWAL':
        return 'Withdrawal';
      case 'ESCROW':
        return 'Escrow';
      case 'COMMISSION':
        return 'Commission';
      case 'PAYOUT':
        return 'Payout';
      default:
        return type;
    }
  };

  const exportToCSV = () => {
    // TODO: Implement CSV export
    console.log('Exporting to CSV');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Your wallet transactions</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No transactions yet</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(new Date(transaction.createdAt), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>{getTypeLabel(transaction.type)}</TableCell>
                  <TableCell className="font-medium">
                    ₹{transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>{transaction.purpose}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

