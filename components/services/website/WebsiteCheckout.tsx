'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ShoppingCart } from 'lucide-react';

interface WebsiteCheckoutProps {
  selectedPages: string[];
  totalPrice: number;
  packageId: string;
}

export default function WebsiteCheckout({
  selectedPages,
  totalPrice,
  packageId,
}: WebsiteCheckoutProps) {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error('You must be logged in to place an order');
      return;
    }

    if (selectedPages.length === 0) {
      toast.error('Please select at least one page');
      return;
    }

    setIsProcessing(true);
    try {
      // TODO: Call API to create order
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Order placed successfully! Our team will contact you soon.');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Button
          className="w-full"
          size="lg"
          onClick={handleCheckout}
          disabled={isProcessing || selectedPages.length === 0}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3">
          By placing an order, you agree to our terms and conditions
        </p>
      </CardContent>
    </Card>
  );
}

