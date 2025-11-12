'use client';

import { useState } from 'react';
import { BarterDeal } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface ShippingFormProps {
  deal: BarterDeal;
  onSuccess: () => void;
}

const CARRIERS = ['BlueDart', 'FedEx', 'DTDC', 'India Post', 'Delhivery', 'Other'];

export default function ShippingForm({ deal, onSuccess }: ShippingFormProps) {
  const [formData, setFormData] = useState({
    trackingNumber: '',
    carrier: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.trackingNumber || !formData.carrier) {
      toast.error('Please fill in all fields');
      return;
    }

    // TODO: Call API to add shipping info
    console.log('Adding shipping info:', formData);
    toast.success('Shipping information added successfully!');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <h4 className="font-semibold">Add Shipping Information</h4>
      <div className="space-y-2">
        <Label htmlFor="trackingNumber">Tracking Number *</Label>
        <Input
          id="trackingNumber"
          value={formData.trackingNumber}
          onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
          placeholder="Enter tracking number"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="carrier">Carrier *</Label>
        <Select
          value={formData.carrier}
          onValueChange={(value) => setFormData({ ...formData, carrier: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select carrier" />
          </SelectTrigger>
          <SelectContent>
            {CARRIERS.map((carrier) => (
              <SelectItem key={carrier} value={carrier}>
                {carrier}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full">
        Mark as Shipped
      </Button>
    </form>
  );
}

