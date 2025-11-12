'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentUploadProps {
  onUpload: (file: File) => void;
  maxSize?: number;
  accept?: string;
  className?: string;
}

export default function DocumentUpload({
  onUpload,
  maxSize = 10 * 1024 * 1024, // 10MB default
  accept = '.pdf,.jpg,.jpeg,.png',
  className,
}: DocumentUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      setUploadedFile(file);

      try {
        // TODO: Upload to server
        await new Promise((resolve) => setTimeout(resolve, 1000));
        onUpload(file);
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        setUploading(false);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept
      ? {
          'application/pdf': ['.pdf'],
          'image/jpeg': ['.jpg', '.jpeg'],
          'image/png': ['.png'],
        }
      : undefined,
    maxSize,
    multiple: false,
  });

  const handleRemove = () => {
    setUploadedFile(null);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {uploadedFile ? (
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-400" />
            <span className="text-sm">{uploadedFile.name}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors',
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-gray-400'
          )}
        >
          <input {...getInputProps()} />
          <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            {isDragActive ? 'Drop the file here' : 'Drag & drop a file here'}
          </p>
          <p className="text-xs text-gray-500 mt-1">or click to select</p>
          <p className="text-xs text-gray-400 mt-1">
            Accepted: {accept} (Max: {(maxSize / 1024 / 1024).toFixed(0)}MB)
          </p>
        </div>
      )}
      {uploading && (
        <p className="text-sm text-muted-foreground">Uploading...</p>
      )}
    </div>
  );
}


