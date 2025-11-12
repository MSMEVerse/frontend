'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import TopNav from './TopNav';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const isAuthPage = pathname === '/login' || pathname === '/register';
  
  // Hide footer for creator and MSME dashboards
  const shouldHideFooter = user && (user.role === 'CREATOR' || user.role === 'MSME');

  if (isAuthPage) {
    return <>{children}</>;
  }

  // Apply dark theme for creators, light theme for MSME
  const isCreator = user?.role === 'CREATOR';
  const isMSME = user?.role === 'MSME';

  return (
    <div className={`flex flex-col min-h-screen ${isCreator ? 'dark' : ''}`}>
      <TopNav />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 lg:ml-64 pt-16 min-h-screen">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}

