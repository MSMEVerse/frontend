'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PaymentButtonProps {
  amount?: number;
  onSuccess?: (amount: number) => void;
}

export default function PaymentButton({ amount = 0, onSuccess }: PaymentButtonProps) {
  const [open, setOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(amount.toString());
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    const amountNum = parseFloat(paymentAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      // TODO: Integrate with Razorpay
      // For now, simulate payment
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Payment successful!');
      onSuccess?.(amountNum);
      setOpen(false);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Funds
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Funds to Wallet</DialogTitle>
          <DialogDescription>
            Add funds to your wallet to create campaigns and make payments
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
            />
          </div>
          <Button
            onClick={handlePayment}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Proceed to Payment'
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Secure payment powered by Razorpay
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

