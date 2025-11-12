'use client';

import { MetaAdsCampaign } from '@/lib/types';
import MetaAdsCampaignCard from './MetaAdsCampaignCard';

interface MetaAdsCampaignListProps {
  campaigns: MetaAdsCampaign[];
  onEdit: (campaign: MetaAdsCampaign) => void;
  onViewDetails: (campaign: MetaAdsCampaign) => void;
}

export default function MetaAdsCampaignList({
  campaigns,
  onEdit,
  onViewDetails,
}: MetaAdsCampaignListProps) {
  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <p className="text-muted-foreground">No campaigns found. Create your first campaign to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {campaigns.map((campaign) => (
        <MetaAdsCampaignCard
          key={campaign.id}
          campaign={campaign}
          onEdit={onEdit}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}

