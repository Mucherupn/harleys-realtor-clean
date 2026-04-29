import { SectionContainer } from '@/components/ui/section-container';
import { PropertyGrid } from '@/components/properties/property-grid';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPropertiesPublic } from '@/lib/queries/public';

export const metadata = buildMetadata({ title: 'Property Listing', description: 'Browse available homes and commercial spaces in Nairobi.', path: '/properties' });

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;
  const properties = await getPropertiesPublic({
    location: first(params.location)?.trim(),
    purpose: first(params.purpose)?.trim(),
    propertyType: first(params.propertyType)?.trim(),
    minPrice: Number(first(params.minPrice)) || undefined,
    maxPrice: Number(first(params.maxPrice)) || undefined,
    bedrooms: Number(first(params.bedrooms)) || undefined,
    keyword: first(params.keyword)?.trim(),
  });

  return (
    <SectionContainer className="space-y-6 py-12 sm:py-16 md:space-y-8 md:py-20">
      <h1 className="text-3xl font-semibold sm:text-4xl">Property Listing</h1>
      <PropertyGrid properties={properties} />
    </SectionContainer>
  );
}
