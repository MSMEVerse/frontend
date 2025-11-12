'use client';

import { ReactNode } from 'react';

interface CampaignPageLayoutProps {
  title: string;
  description?: string;
  stats?: ReactNode;
  filters?: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
}

export default function CampaignPageLayout({
  title,
  description,
  stats,
  filters,
  children,
  actions,
}: CampaignPageLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight dark:text-[#FFFFFF]">{title}</h1>
          {description && (
            <p className="text-muted-foreground dark:text-[#B9BBBE]">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats}
        </div>
      )}

      {/* Filters */}
      {filters && (
        <div className="border rounded-lg p-4 dark:border-[rgba(255,255,255,0.06)]">
          {filters}
        </div>
      )}

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}

