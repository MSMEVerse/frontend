'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MSMEProfilePage from '@/components/pages/MSMEProfilePage';
import CreatorProfilePage from '@/components/pages/CreatorProfilePage';

export default function ProfilePage() {
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

  // Render role-specific profile page
  switch (user.role) {
    case 'MSME':
      return <MSMEProfilePage />;
    case 'CREATOR':
      return <CreatorProfilePage />;
    default:
      return (
        <div className="text-center py-12">
          <p>Profile is only available for MSMEs and Creators</p>
        </div>
      );
  }
}

