'use client';

import { useState } from 'react';
import { BarterDeal, BarterContent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Upload, Plus, X } from 'lucide-react';

interface ContentSubmissionProps {
  deal: BarterDeal;
  existingContent?: BarterContent;
}

export default function ContentSubmission({ deal, existingContent }: ContentSubmissionProps) {
  const [files, setFiles] = useState<string[]>(existingContent?.files || []);
  const [fileUrl, setFileUrl] = useState('');

  const handleAddFile = () => {
    if (fileUrl.trim()) {
      setFiles([...files, fileUrl.trim()]);
      setFileUrl('');
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      toast.error('Please add at least one content file');
      return;
    }

    // TODO: Call API to submit content
    console.log('Submitting content:', { dealId: deal.id, files, deliverables: deal.deliverables });
    toast.success('Content submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">Deliverables</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          {deal.deliverables.map((deliverable, idx) => (
            <li key={idx}>{deliverable}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <Label>Content Files (URLs)</Label>
        <div className="flex gap-2">
          <Input
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            placeholder="Enter file/image/video URL"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddFile();
              }
            }}
          />
          <Button type="button" onClick={handleAddFile}>
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded">
                <Input value={file} readOnly className="flex-1" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {existingContent?.revisionNotes && (
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-sm font-medium mb-1">Revision Requested</p>
          <p className="text-sm text-muted-foreground">{existingContent.revisionNotes}</p>
        </div>
      )}

      <Button type="submit" className="w-full">
        <Upload className="h-4 w-4 mr-2" />
        {existingContent ? 'Resubmit Content' : 'Submit Content'}
      </Button>
    </form>
  );
}

