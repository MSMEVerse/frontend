'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MSMECampaigns from '@/components/pages/MSMECampaigns';
import CreatorCampaigns from '@/components/pages/CreatorCampaigns';

export default function CampaignsPage() {
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

  // Render role-specific campaigns page
  switch (user.role) {
    case 'MSME':
      return <MSMECampaigns />;
    case 'CREATOR':
      return <CreatorCampaigns />;
    default:
      return (
        <div className="text-center py-12">
          <p>Campaigns are only available for MSMEs and Creators</p>
        </div>
      );
  }
}

