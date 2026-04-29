import { notFound } from 'next/navigation';
import { SectionContainer } from '@/components/ui/section-container';
import { PropertyDetails } from '@/components/properties/property-details';
import { InquiryForm } from '@/components/forms/inquiry-form';
import { getPropertyBySlugPublic } from '@/lib/queries/public';

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlugPublic(slug);

  if (!property) notFound();

  return (
    <SectionContainer className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:py-20 xl:grid-cols-[minmax(0,1fr)_360px]">
      <PropertyDetails property={property} />
      <div className="space-y-6 lg:sticky lg:top-24">
        <InquiryForm propertySlug={property.slug} />
      </div>
    </SectionContainer>
  );
}
