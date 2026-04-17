import { notFound } from 'next/navigation';
import { featuredProperties } from '@/lib/queries/public';
import { SectionContainer } from '@/components/ui/section-container';
import { PropertyDetails } from '@/components/properties/property-details';
import { InquiryForm } from '@/components/forms/inquiry-form';

export function generateStaticParams() {
  return featuredProperties.map((property) => ({ slug: property.slug }));
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = featuredProperties.find((item) => item.slug === slug);

  if (!property) {
    notFound();
  }

  return (
    <SectionContainer className="grid gap-8 py-16 lg:grid-cols-[1fr_360px]">
      <PropertyDetails property={property} />
      <div className="space-y-6">
        <InquiryForm propertySlug={property.slug} />
        <div className="rounded-xl border border-[#e5e7eb] p-5">
          <h3 className="font-semibold">Related listings</h3>
          <p className="mt-2 text-sm text-[#6b7280]">Additional recommendations will appear here as the catalog grows.</p>
        </div>
      </div>
    </SectionContainer>
  );
}
