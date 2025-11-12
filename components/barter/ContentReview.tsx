'use client';

import { BarterDeal, BarterContent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Check, X, RefreshCw } from 'lucide-react';
import RevisionRequest from './RevisionRequest';
import { useState } from 'react';

interface ContentReviewProps {
  deal: BarterDeal;
  content: BarterContent;
}

export default function ContentReview({ deal, content }: ContentReviewProps) {
  const [showRevisionForm, setShowRevisionForm] = useState(false);

  const handleApprove = () => {
    // TODO: Call API to approve content
    console.log('Approving content:', content.id);
    toast.success('Content approved!');
  };

  const handleReject = () => {
    // TODO: Call API to reject content
    console.log('Rejecting content:', content.id);
    toast.error('Content rejected');
  };

  if (showRevisionForm) {
    return (
      <RevisionRequest
        deal={deal}
        content={content}
        onSuccess={() => setShowRevisionForm(false)}
        onCancel={() => setShowRevisionForm(false)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Submitted Deliverables</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
          {content.deliverables.map((deliverable, idx) => (
            <li key={idx}>{deliverable}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">Content Files</h4>
        <div className="grid grid-cols-2 gap-4">
          {content.files.map((file, index) => (
            <Card key={index}>
              <CardContent className="pt-4">
                {file.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                  <img src={file} alt={`Content ${index + 1}`} className="w-full h-48 object-cover rounded" />
                ) : (
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border rounded hover:bg-muted"
                  >
                    <p className="text-sm font-medium truncate">{file}</p>
                    <p className="text-xs text-muted-foreground mt-1">Click to view</p>
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleApprove} className="flex-1">
          <Check className="h-4 w-4 mr-2" />
          Approve Content
        </Button>
        <Button onClick={() => setShowRevisionForm(true)} variant="outline" className="flex-1">
          <RefreshCw className="h-4 w-4 mr-2" />
          Request Revision
        </Button>
        <Button onClick={handleReject} variant="destructive" className="flex-1">
          <X className="h-4 w-4 mr-2" />
          Reject
        </Button>
      </div>
    </div>
  );
}

