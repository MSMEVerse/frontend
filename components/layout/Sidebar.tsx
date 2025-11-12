'use client';

import React, { useState } from 'react';
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
  Repeat,
  ChevronDown,
  ChevronRight,
  Search,
  Clock,
  CheckCircle2,
  FileText as FileTextIcon,
} from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

interface NavSection {
  label?: string;
  items: NavItem[];
}

const msmeNavSections: NavSection[] = [
  {
    items: [
      { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { title: 'My Profile', href: '/profile', icon: User },
    ],
  },
  {
    label: 'Brands',
    items: [
      { title: 'Creator Marketplace', href: '/marketplace', icon: Users },
      { title: 'Campaigns', href: '/campaigns', icon: Briefcase },
      { title: 'Barter', href: '/barter', icon: Repeat },
    ],
  },
  {
    items: [
      { title: 'Wallet & Transactions', href: '/wallet', icon: Wallet },
      { title: 'Settings', href: '/settings', icon: Settings },
      { title: 'Support', href: '/support', icon: MessageSquare },
    ],
  },
];

const creatorNavSections: NavSection[] = [
  {
    items: [
      { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { title: 'Profile', href: '/profile', icon: User },
    ],
  },
  {
    label: 'Brands',
    items: [
      { title: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
      {
        title: 'Campaigns',
        href: '/campaigns',
        icon: Briefcase,
        children: [
          { title: 'Browse Campaigns', href: '/campaigns/browse', icon: Search },
          { title: 'Ongoing Campaigns', href: '/campaigns/ongoing', icon: Clock },
          { title: 'Past Campaigns', href: '/campaigns/past', icon: CheckCircle2 },
          { title: 'Applied', href: '/campaigns/applied', icon: FileTextIcon },
        ],
      },
      { title: 'Barter', href: '/barter', icon: Repeat },
    ],
  },
  {
    items: [
      { title: 'Chat with Brands', href: '/chat-brands', icon: MessageSquare },
      { title: 'Wallet & Earnings', href: '/wallet', icon: Wallet },
      { title: 'Settings', href: '/settings', icon: Settings },
      { title: 'Support', href: '/support', icon: MessageSquare },
    ],
  },
];

const adminNavSections: NavSection[] = [
  {
    items: [
      { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { title: 'User Management', href: '/users', icon: Users },
      { title: 'Campaign Management', href: '/campaigns', icon: Briefcase },
      { title: 'Transactions', href: '/transactions', icon: Wallet },
      { title: 'Reports & Analytics', href: '/reports', icon: BarChart3 },
      { title: 'Support Tickets', href: '/support', icon: MessageSquare },
      { title: 'CMS', href: '/cms', icon: FileText },
    ],
  },
];

function CollapsibleNavItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [isOpen, setIsOpen] = useState(() => {
    // Check if any child is active
    if (item.children) {
      return item.children.some((child) => {
        const childPath = child.href.split('?')[0];
        return pathname === child.href || pathname === childPath || pathname?.startsWith(childPath + '/');
      });
    }
    return false;
  });

  const Icon = item.icon;
  const hrefPath = item.href.split('?')[0];
  const isActive = pathname === item.href || pathname === hrefPath || pathname?.startsWith(hrefPath + '/');
  const hasActiveChild = item.children?.some((child) => {
    const childPath = child.href.split('?')[0];
    return pathname === child.href || pathname === childPath || pathname?.startsWith(childPath + '/');
  });

  if (item.children && item.children.length > 0) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors group',
            (isActive || hasActiveChild)
              ? 'bg-primary text-primary-foreground dark:bg-[#5865F2] dark:text-[#FFFFFF]'
              : 'text-foreground/80 hover:bg-muted dark:text-[#B9BBBE] dark:hover:text-[#FFFFFF] dark:hover:bg-[rgba(255,255,255,0.1)]'
          )}
        >
          <div className="flex items-center">
            <Icon className={cn('mr-3 h-5 w-5 transition-colors', (isActive || hasActiveChild) ? 'text-primary-foreground dark:text-[#FFFFFF]' : 'text-muted-foreground dark:text-[#B9BBBE] dark:group-hover:text-[#FFFFFF]')} />
            {item.title}
          </div>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
        {isOpen && (
          <div className="ml-6 mt-1 space-y-1">
            {item.children.map((child) => {
              const ChildIcon = child.icon;
              const childPath = child.href.split('?')[0];
              const isChildActive = pathname === child.href || pathname === childPath || pathname?.startsWith(childPath + '/');
              
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group',
                    isChildActive
                      ? 'bg-primary text-primary-foreground dark:bg-[#5865F2] dark:text-[#FFFFFF]'
                      : 'text-foreground/80 hover:bg-muted dark:text-[#B9BBBE] dark:hover:text-[#FFFFFF] dark:hover:bg-[rgba(255,255,255,0.1)]'
                  )}
                >
                  <ChildIcon className={cn('mr-3 h-4 w-4 transition-colors', isChildActive ? 'text-primary-foreground dark:text-[#FFFFFF]' : 'text-muted-foreground dark:text-[#B9BBBE] dark:group-hover:text-[#FFFFFF]')} />
                  {child.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
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
}

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  const getNavSections = (): NavSection[] => {
    switch (user.role) {
      case 'MSME':
        return msmeNavSections;
      case 'CREATOR':
        return creatorNavSections;
      case 'ADMIN':
        return adminNavSections;
      default:
        return [];
    }
  };

  const navSections = getNavSections();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16 lg:border-r bg-background dark:bg-[#2F3136] dark:border-[rgba(255,255,255,0.06)]">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-3 py-4 space-y-6">
          {navSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-1">
              {section.label && (
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider dark:text-[#B9BBBE]">
                    {section.label}
                  </h3>
                </div>
              )}
              {section.items.map((item) => (
                <CollapsibleNavItem key={item.href} item={item} pathname={pathname} />
              ))}
            </div>
          ))}
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

