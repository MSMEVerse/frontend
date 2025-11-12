'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MSMECampaigns from '@/components/pages/MSMECampaigns';

export default function CampaignsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    // Redirect creators to browse campaigns page
    if (user?.role === 'CREATOR') {
      router.push('/campaigns/browse');
      return;
    }

    // For MSMEs, show the MSME campaigns page (keep existing behavior)
    if (user?.role === 'MSME') {
      // Keep MSME campaigns on the main page for now
      // You can redirect to a specific MSME campaigns page if needed
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

  // For MSMEs, show the MSME campaigns component
  if (user.role === 'MSME') {
    return <MSMECampaigns />;
  }

  // For creators, this should redirect, but show loading just in case
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Redirecting...</div>
    </div>
  );
}

