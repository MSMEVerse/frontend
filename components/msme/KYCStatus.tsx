import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

interface KYCStatusProps {
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  progress?: number;
}

export default function KYCStatus({ status, progress = 0 }: KYCStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'VERIFIED':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          text: 'Verified',
          description: 'Your KYC verification is complete',
        };
      case 'REJECTED':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          text: 'Rejected',
          description: 'Please review and resubmit your documents',
        };
      default:
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          text: 'Pending',
          description: 'Your documents are under review',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  const pendingDocuments = [
    { name: 'PAN Card', uploaded: true },
    { name: 'GST Certificate', uploaded: false },
    { name: 'MSME Certificate', uploaded: false },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>KYC Status</CardTitle>
        <CardDescription>Verification status of your business</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${config.bgColor}`}>
            <Icon className={`h-6 w-6 ${config.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">{config.text}</h3>
              <Badge className={config.bgColor}>{status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{config.description}</p>
          </div>
        </div>

        {status === 'PENDING' && (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Verification Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Pending Documents</h4>
              <ul className="space-y-2">
                {pendingDocuments.map((doc, index) => (
                  <li key={index} className="flex items-center space-x-2 text-sm">
                    {doc.uploaded ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    )}
                    <span className={doc.uploaded ? 'text-muted-foreground' : ''}>
                      {doc.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {status === 'REJECTED' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">
              Your KYC verification was rejected. Please review the feedback and
              resubmit your documents.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

