'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  User,
  Users,
  Briefcase,
  Wallet,
  Settings,
  MessageSquare,
  FileText,
  BarChart3,
  Package,
  ShoppingBag,
  Image,
  Building2,
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const msmeNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'My Profile', href: '/profile', icon: User },
  { title: 'Creator Marketplace', href: '/marketplace', icon: Users },
  { title: 'Campaigns', href: '/campaigns', icon: Briefcase },
  { title: 'Wallet & Transactions', href: '/wallet', icon: Wallet },
  { title: 'Settings', href: '/settings', icon: Settings },
  { title: 'Support', href: '/support', icon: MessageSquare },
];

const creatorNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Profile', href: '/profile', icon: User },
  { title: 'Brands Marketplace', href: '/marketplace', icon: ShoppingBag },
  { title: 'Chat with Brands', href: '/chat-brands', icon: MessageSquare },
  { title: 'Campaigns', href: '/campaigns', icon: Briefcase },
  { title: 'Wallet & Earnings', href: '/wallet', icon: Wallet },
  { title: 'Settings', href: '/settings', icon: Settings },
  { title: 'Support', href: '/support', icon: MessageSquare },
];

const adminNavItems: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'User Management', href: '/users', icon: Users },
  { title: 'Campaign Management', href: '/campaigns', icon: Briefcase },
  { title: 'Transactions', href: '/transactions', icon: Wallet },
  { title: 'Reports & Analytics', href: '/reports', icon: BarChart3 },
  { title: 'Support Tickets', href: '/support', icon: MessageSquare },
  { title: 'CMS', href: '/cms', icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  const getNavItems = (): NavItem[] => {
    switch (user.role) {
      case 'MSME':
        return msmeNavItems;
      case 'CREATOR':
        return creatorNavItems;
      case 'ADMIN':
        return adminNavItems;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 lg:border-r bg-background dark:bg-[#2F3136] dark:border-[rgba(255,255,255,0.06)]">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group',
                  isActive
                    ? 'bg-primary text-primary-foreground dark:bg-[#5865F2] dark:text-[#FFFFFF]'
                    : 'text-foreground/80 hover:bg-muted dark:text-[#B9BBBE] dark:hover:text-[#FFFFFF] dark:hover:bg-[rgba(255,255,255,0.1)]'
                )}
              >
                <Icon className={cn('mr-3 h-5 w-5 transition-colors', isActive ? 'text-primary-foreground dark:text-[#FFFFFF]' : 'text-muted-foreground dark:text-[#B9BBBE] dark:group-hover:text-[#FFFFFF]')} />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t dark:border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center space-x-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-[#FFFFFF]">
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.email}
              </p>
              <p className="text-xs text-gray-500 truncate dark:text-[#B9BBBE]">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

