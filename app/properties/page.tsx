import { SectionContainer } from '@/components/ui/section-container';
import { PropertyGrid } from '@/components/properties/property-grid';
import { PropertyFilters } from '@/components/properties/property-filters';
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
    <SectionContainer className="space-y-6 py-10 sm:space-y-8 sm:py-14 lg:py-20">
      <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">Property Listing</h1>
      <PropertyFilters
        defaults={{
          keyword: first(params.keyword),
          location: first(params.location),
          purpose: first(params.purpose),
          propertyType: first(params.propertyType),
          minPrice: first(params.minPrice),
          maxPrice: first(params.maxPrice),
          bedrooms: first(params.bedrooms),
        }}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#616977]">Showing <span className="font-semibold text-[#111111]">{properties.length}</span> {properties.length === 1 ? 'listing' : 'listings'}</p>
      </div>
      <PropertyGrid properties={properties} />
    </SectionContainer>
  );
}
