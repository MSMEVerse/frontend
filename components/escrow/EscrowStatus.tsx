import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { EscrowStatus as EscrowStatusType } from '@/lib/types';
import { CheckCircle, Clock, XCircle, Wallet } from 'lucide-react';

interface EscrowStatusProps {
  status: EscrowStatusType;
  amount: number;
  progress?: number;
}

export default function EscrowStatus({ status, amount, progress = 0 }: EscrowStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'RELEASED':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          text: 'Released',
          description: 'Funds have been released',
        };
      case 'COMPLETED':
        return {
          icon: CheckCircle,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          text: 'Completed',
          description: 'Campaign completed, awaiting release',
        };
      case 'ONGOING':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          text: 'Ongoing',
          description: 'Campaign in progress',
        };
      default:
        return {
          icon: Wallet,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          text: 'Pending',
          description: 'Waiting for campaign to start',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Escrow Status</CardTitle>
        <CardDescription>Payment escrow information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${config.bgColor}`}>
              <Icon className={`h-6 w-6 ${config.color}`} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold">{config.text}</h3>
                <Badge className={config.bgColor}>{status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{config.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">₹{amount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Escrow amount</p>
          </div>
        </div>

        {status === 'ONGOING' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

