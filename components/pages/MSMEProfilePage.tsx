import CompanyInfo from '@/components/msme/CompanyInfo';
import LegalDocs from '@/components/msme/LegalDocs';
import KYCStatus from '@/components/msme/KYCStatus';

export default function MSMEProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your company information and documents
        </p>
      </div>

      <KYCStatus status="PENDING" progress={33} />

      <CompanyInfo />

      <LegalDocs />
    </div>
  );
}

