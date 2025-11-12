import StatCard from '@/components/common/StatCard';
import { Briefcase, Wallet, Clock, TrendingUp } from 'lucide-react';

export default function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Active Campaigns"
        value={3}
        icon={Briefcase}
        description="Currently running"
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Spent This Month"
        value="₹1,25,000"
        icon={Wallet}
        description="Total expenditure"
        trend={{ value: 8, isPositive: false }}
      />
      <StatCard
        title="Pending Payments"
        value="₹50,000"
        icon={Clock}
        description="In escrow"
      />
      <StatCard
        title="Campaign Performance"
        value="4.2"
        icon={TrendingUp}
        description="Average rating"
        trend={{ value: 15, isPositive: true }}
      />
    </div>
  );
}


