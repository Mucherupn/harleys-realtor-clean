import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeading } from '@/components/ui/section-heading';
import { PropertyGrid } from '@/components/properties/property-grid';
import { featuredProperties } from '@/lib/queries/public';

export function FeaturedProperties() {
  return (
    <SectionContainer className="mt-20 space-y-8">
      <SectionHeading eyebrow="Featured Listings" title="Selected opportunities across Nairobi" description="A curated mix of residential and commercial options backed by informed advisory." />
      <PropertyGrid properties={featuredProperties} />
    </SectionContainer>
  );
}
