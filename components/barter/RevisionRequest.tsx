'use client';

import { useState } from 'react';
import { BarterDeal, BarterContent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface RevisionRequestProps {
  deal: BarterDeal;
  content: BarterContent;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function RevisionRequest({
  deal,
  content,
  onSuccess,
  onCancel,
}: RevisionRequestProps) {
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!notes.trim()) {
      toast.error('Please provide revision notes');
      return;
    }

    // TODO: Call API to request revision
    console.log('Requesting revision:', { contentId: content.id, notes });
    toast.success('Revision requested!');
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="notes">Revision Notes *</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Explain what needs to be revised..."
          rows={6}
          required
        />
        <p className="text-xs text-muted-foreground">
          Be specific about what changes are needed in the content
        </p>
      </div>

      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          Request Revision
        </Button>
      </div>
    </form>
  );
}

