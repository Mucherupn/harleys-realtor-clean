import { PageHeading } from '@/components/admin/page-heading';
import { SettingsForm } from '@/components/admin/settings-form';

export default function StreamSettingsPage() {
  return (
    <div>
      <PageHeading title="Site settings" description="Update core company profile fields used throughout the website." />
      <SettingsForm />
    </div>
  );
}
