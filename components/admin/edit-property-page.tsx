'use client';

import { notFound } from 'next/navigation';
import { useAdmin } from '@/lib/admin/admin-context';
import { PageHeading } from './page-heading';
import { PropertyForm } from './property-form';

export function EditPropertyPage({ id }: { id: string }) {
  const { properties } = useAdmin();
  const property = properties.find((entry) => entry.id === id);

  if (!property) {
    return notFound();
  }

  return (
    <div>
      <PageHeading title="Edit property" description={`Update listing details for ${property.title}.`} />
      <PropertyForm property={property} />
    </div>
  );
}
