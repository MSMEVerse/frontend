'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import CampaignForm from '@/components/msme/CampaignForm';

export default function CreateCampaignPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Only MSMEs can create campaigns
  if (user?.role !== 'MSME') {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Campaign</h1>
        <p className="text-muted-foreground">
          Create a new influencer marketing campaign
        </p>
      </div>

      <CampaignForm />
    </div>
  );
}

