import { PageHeading } from '@/components/admin/page-heading';
import { PropertyForm } from '@/components/admin/property-form';

export default function StreamNewPropertyPage() {
  return (
    <div>
      <PageHeading title="New property" description="Create a listing and choose if it should be draft, published, or featured." />
      <PropertyForm />
    </div>
  );
}
