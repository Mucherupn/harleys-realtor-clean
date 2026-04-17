import { SectionContainer } from '@/components/ui/section-container';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { PropertyGrid } from '@/components/properties/property-grid';
import { featuredProperties } from '@/lib/queries/public';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({ title: 'Property Listing', description: 'Browse available homes and commercial spaces in Nairobi.', path: '/properties' });

export default function PropertiesPage() {
  return (
    <SectionContainer className="space-y-6 py-12 sm:py-16 md:space-y-8 md:py-20">
      <h1 className="text-3xl font-semibold sm:text-4xl">Property Listing</h1>
      <div className="grid gap-3 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 sm:grid-cols-2 lg:grid-cols-4">
        <Input placeholder="Location" />
        <Select defaultValue=""><option value="">Type</option></Select>
        <Select defaultValue=""><option value="">Status</option></Select>
        <Select defaultValue=""><option value="">Sort by</option><option>Latest</option><option>Price: Low to High</option></Select>
      </div>
      <PropertyGrid properties={featuredProperties} />
    </SectionContainer>
  );
}
