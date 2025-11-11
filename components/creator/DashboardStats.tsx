import StatCard from '@/components/common/StatCard';
import { Briefcase, Wallet, Clock, Star } from 'lucide-react';

export default function CreatorDashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Active Campaigns"
        value={2}
        icon={Briefcase}
        description="Currently working on"
        trend={{ value: 25, isPositive: true }}
      />
      <StatCard
        title="Total Earnings"
        value="₹2,50,000"
        icon={Wallet}
        description="All-time earnings"
        trend={{ value: 30, isPositive: true }}
      />
      <StatCard
        title="Pending Payouts"
        value="₹75,000"
        icon={Clock}
        description="Awaiting release"
      />
      <StatCard
        title="Rating"
        value="4.8"
        icon={Star}
        description="Average rating"
        trend={{ value: 5, isPositive: true }}
      />
    </div>
  );
}

