'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import BrandMarketplacePage from '@/app/(creator)/brands/page';
import MSMEMarketplacePage from '@/components/pages/MSMEMarketplacePage';

export default function MarketplacePage() {
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

  // For creators, show campaign marketplace
  if (user.role === 'CREATOR') {
    return <BrandMarketplacePage />;
  }

  // For MSMEs, show creator marketplace
  if (user.role === 'MSME') {
    return <MSMEMarketplacePage />;
  }

  return null;
}

