import type { Property } from '@/types/property';
import { PropertyCard } from '@/components/properties/property-card';
import { EmptyState } from '@/components/shared/empty-state';

export function PropertyGrid({ properties }: { properties: Property[] }) {
  if (properties.length === 0) {
    return <EmptyState title="No listings found" description="Adjust your filters or contact us for off-market opportunities." />;
  }

  return (
    <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
