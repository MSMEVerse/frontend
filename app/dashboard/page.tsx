'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MSMEDashboard from '@/components/pages/MSMEDashboard';
import CreatorDashboard from '@/components/pages/CreatorDashboard';
import AdminDashboard from '@/components/pages/AdminDashboard';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Render role-specific dashboard
  switch (user.role) {
    case 'MSME':
      return <MSMEDashboard />;
    case 'CREATOR':
      return <CreatorDashboard />;
    case 'ADMIN':
      return <AdminDashboard />;
    default:
      return (
        <div className="text-center py-12">
          <p>Invalid user role</p>
        </div>
      );
  }
}

