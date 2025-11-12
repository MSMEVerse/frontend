'use client';

import { useState } from 'react';
import { BarterDeal } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';

interface DeliveryProofUploadProps {
  deal: BarterDeal;
  onSuccess: () => void;
}

export default function DeliveryProofUpload({ deal, onSuccess }: DeliveryProofUploadProps) {
  const [proofUrls, setProofUrls] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState('');

  const handleAddUrl = () => {
    if (urlInput.trim()) {
      setProofUrls([...proofUrls, urlInput.trim()]);
      setUrlInput('');
    }
  };

  const handleRemoveUrl = (index: number) => {
    setProofUrls(proofUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (proofUrls.length === 0) {
      toast.error('Please add at least one delivery proof');
      return;
    }

    // TODO: Call API to confirm delivery
    console.log('Confirming delivery with proof:', proofUrls);
    toast.success('Delivery confirmed successfully!');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <h4 className="font-semibold">Confirm Product Delivery</h4>
      <p className="text-sm text-muted-foreground">
        Upload proof that you have received the product
      </p>

      <div className="space-y-2">
        <Label>Delivery Proof (Image URLs)</Label>
        <div className="flex gap-2">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Enter image URL"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddUrl();
              }
            }}
          />
          <Button type="button" onClick={handleAddUrl}>
            Add
          </Button>
        </div>

        {proofUrls.length > 0 && (
          <div className="space-y-2">
            {proofUrls.map((url, index) => (
              <div key={index} className="flex items-center gap-2">
                <img src={url} alt={`Proof ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                <Input value={url} readOnly className="flex-1" />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveUrl(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" className="w-full">
        <Upload className="h-4 w-4 mr-2" />
        Confirm Delivery
      </Button>
    </form>
  );
}

