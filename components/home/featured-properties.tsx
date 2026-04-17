import Link from 'next/link';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeading } from '@/components/ui/section-heading';
import { PropertyGrid } from '@/components/properties/property-grid';
import { featuredProperties } from '@/lib/queries/public';

export function FeaturedProperties() {
  return (
    <SectionContainer className="mt-16 space-y-10 md:mt-20">
      <SectionHeading
        eyebrow="Featured Listings"
        title="Selected opportunities across Nairobi"
        description="A curated shortlist of residential and commercial opportunities shaped by current demand, pricing discipline, and location quality."
        action={
          <Link
            href="/properties"
            className="inline-flex items-center rounded-full border border-[#d9dde5] px-5 py-2 text-sm font-semibold text-[#1c2430] transition-colors hover:border-[#111111] hover:text-[#111111]"
          >
            View All Properties
          </Link>
        }
      />
      <PropertyGrid properties={featuredProperties} />
    </SectionContainer>
  );
}
