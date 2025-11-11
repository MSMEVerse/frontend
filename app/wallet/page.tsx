'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MSMEWallet from '@/components/pages/MSMEWallet';
import CreatorWallet from '@/components/pages/CreatorWallet';

export default function WalletPage() {
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

  // Render role-specific wallet page
  switch (user.role) {
    case 'MSME':
      return <MSMEWallet />;
    case 'CREATOR':
      return <CreatorWallet />;
    default:
      return (
        <div className="text-center py-12">
          <p>Wallet is only available for MSMEs and Creators</p>
        </div>
      );
  }
}

