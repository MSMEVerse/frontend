import StatCard from '@/components/common/StatCard';
import { Users, Briefcase, Wallet, TrendingUp } from 'lucide-react';

export default function AdminDashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Users"
        value="1,234"
        icon={Users}
        description="MSME: 800, Creator: 434"
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Total Campaigns"
        value="456"
        icon={Briefcase}
        description="Active campaigns"
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard
        title="Total Transactions"
        value="₹12,50,000"
        icon={Wallet}
        description="This month"
        trend={{ value: 15, isPositive: true }}
      />
      <StatCard
        title="Revenue"
        value="₹1,25,000"
        icon={TrendingUp}
        description="Platform commission"
        trend={{ value: 20, isPositive: true }}
      />
    </div>
  );
}


