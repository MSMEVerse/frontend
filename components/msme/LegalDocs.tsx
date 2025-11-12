'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import DocumentUpload from '@/components/upload/DocumentUpload';
import { FileText, Download, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Document {
  id: string;
  type: 'PAN' | 'GST' | 'MSME_CERT';
  name: string;
  url?: string;
  status: 'PENDING' | 'UPLOADED' | 'VERIFIED' | 'REJECTED';
}

export default function LegalDocs() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', type: 'PAN', name: 'PAN Card', status: 'PENDING' },
    { id: '2', type: 'GST', name: 'GST Certificate', status: 'PENDING' },
    { id: '3', type: 'MSME_CERT', name: 'MSME Certificate', status: 'PENDING' },
  ]);

  const handleUpload = (type: string, file: File) => {
    // TODO: Upload document to server
    setDocuments((docs) =>
      docs.map((doc) =>
        doc.type === type
          ? { ...doc, status: 'UPLOADED', name: file.name }
          : doc
      )
    );
  };

  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <Badge className="bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case 'UPLOADED':
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Uploaded</Badge>
        );
      case 'REJECTED':
        return (
          <Badge className="bg-red-100 text-red-800">
            <X className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal Documents</CardTitle>
        <CardDescription>Upload your business documents for KYC verification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {documents.map((document) => (
          <div key={document.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-gray-400" />
                <Label className="text-base font-medium">{document.name}</Label>
              </div>
              {getStatusBadge(document.status)}
            </div>

            {document.status === 'UPLOADED' && document.url && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={document.url} download target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    View Document
                  </a>
                </Button>
              </div>
            )}

            {document.status === 'PENDING' || document.status === 'REJECTED' ? (
              <DocumentUpload
                onUpload={(file) => handleUpload(document.type, file)}
                accept=".pdf,.jpg,.jpeg,.png"
                maxSize={10 * 1024 * 1024} // 10MB
              />
            ) : null}

            {document.status === 'REJECTED' && (
              <p className="text-sm text-red-600">
                Document was rejected. Please upload a valid document.
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


