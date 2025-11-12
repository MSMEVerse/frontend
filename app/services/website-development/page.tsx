'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { mockWebsitePages, mockWebsitePackages } from '@/lib/mocks';
import { WebsitePage } from '@/lib/types';
import WebsitePageLibrary from '@/components/services/website/WebsitePageLibrary';
import SelectedPagesContainer from '@/components/services/website/SelectedPagesContainer';
import WebsitePriceCalculator from '@/components/services/website/WebsitePriceCalculator';
import WebsitePackageInfo from '@/components/services/website/WebsitePackageInfo';
import WebsiteCheckout from '@/components/services/website/WebsiteCheckout';
import { Globe } from 'lucide-react';

export default function WebsiteDevelopmentPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedPages, setSelectedPages] = useState<string[]>(mockWebsitePackages[0]?.basePages || []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const selectedPageObjects = useMemo(() => {
    return selectedPages
      .map((id) => mockWebsitePages.find((p) => p.id === id))
      .filter((p): p is WebsitePage => p !== undefined);
  }, [selectedPages]);

  const totalPrice = useMemo(() => {
    const basePrice = mockWebsitePackages[0]?.totalPrice || 25000;
    const additionalPrice = selectedPageObjects
      .filter((p) => !mockWebsitePackages[0]?.basePages.includes(p.id))
      .reduce((sum, p) => sum + p.price, 0);
    return basePrice + additionalPrice;
  }, [selectedPageObjects]);

  const handlePageSelect = (pageId: string) => {
    if (!selectedPages.includes(pageId)) {
      setSelectedPages([...selectedPages, pageId]);
    }
  };

  const handlePageRemove = (pageId: string) => {
    // Don't allow removing base pages
    if (mockWebsitePackages[0]?.basePages.includes(pageId)) {
      return;
    }
    setSelectedPages(selectedPages.filter((id) => id !== pageId));
  };

  const handlePageReorder = (newOrder: string[]) => {
    setSelectedPages(newOrder);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || user.role !== 'MSME') {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight dark:text-[#FFFFFF]">Fixed Starter Website Development</h1>
        <p className="text-muted-foreground dark:text-[#B9BBBE]">
          Build your website by selecting pages. Base package includes essential pages at ₹25,000.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Available Pages */}
        <div className="lg:col-span-2 space-y-6">
          <WebsitePageLibrary
            pages={mockWebsitePages}
            selectedPageIds={selectedPages}
            onPageSelect={handlePageSelect}
          />
        </div>

        {/* Right Column: Selected Pages & Checkout */}
        <div className="space-y-6">
          <WebsitePackageInfo package={mockWebsitePackages[0]} />
          
          <SelectedPagesContainer
            pages={selectedPageObjects}
            basePageIds={mockWebsitePackages[0]?.basePages || []}
            onPageRemove={handlePageRemove}
            onPageReorder={handlePageReorder}
          />

          <WebsitePriceCalculator
            basePrice={mockWebsitePackages[0]?.totalPrice || 25000}
            selectedPages={selectedPageObjects}
            basePageIds={mockWebsitePackages[0]?.basePages || []}
          />

          <WebsiteCheckout
            selectedPages={selectedPages}
            totalPrice={totalPrice}
            packageId={mockWebsitePackages[0]?.id || ''}
          />
        </div>
      </div>
    </div>
  );
}

