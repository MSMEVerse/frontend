import CreatorProfileInfo from '@/components/creator/CreatorProfileInfo';
import KYCStatus from '@/components/msme/KYCStatus';

export default function CreatorProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your creator profile information and verification
        </p>
      </div>

      <KYCStatus status="PENDING" progress={33} />

      <CreatorProfileInfo />
    </div>
  );
}

