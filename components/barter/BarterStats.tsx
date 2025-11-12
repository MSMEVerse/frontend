'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Package, Briefcase, MessageSquare, History, AlertTriangle } from 'lucide-react';

interface BarterStatsProps {
  totalProducts: number;
  activeDeals: number;
  negotiations: number;
  completedDeals: number;
  disputes: number;
}

export default function BarterStats({
  totalProducts,
  activeDeals,
  negotiations,
  completedDeals,
  disputes,
}: BarterStatsProps) {
  const stats = [
    {
      label: 'Total Products',
      value: totalProducts,
      icon: Package,
      color: 'text-blue-500',
    },
    {
      label: 'Active Deals',
      value: activeDeals,
      icon: Briefcase,
      color: 'text-green-500',
    },
    {
      label: 'Negotiations',
      value: negotiations,
      icon: MessageSquare,
      color: 'text-yellow-500',
    },
    {
      label: 'Completed',
      value: completedDeals,
      icon: History,
      color: 'text-purple-500',
    },
    {
      label: 'Disputes',
      value: disputes,
      icon: AlertTriangle,
      color: 'text-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

