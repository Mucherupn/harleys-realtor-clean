import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MessageCircle, Phone } from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import { PropertyDetails } from '@/components/properties/property-details';
import { InquiryForm } from '@/components/forms/inquiry-form';
import { getPropertyBySlugPublic } from '@/lib/queries/public';

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlugPublic(slug);

  if (!property) notFound();

  return (
    <SectionContainer className="grid gap-6 py-12 sm:gap-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:py-20 xl:grid-cols-[minmax(0,1fr)_360px]">
      <PropertyDetails property={property} />
      <aside className="space-y-6 lg:sticky lg:top-24">
        <div className="space-y-4 rounded-xl border border-[#e5e7eb] bg-white p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-[#111111]">Interested in this property?</h2>
          <p className="text-sm leading-6 text-[#5f6876]">
            Speak to our team for pricing guidance, viewings, and full availability details.
          </p>
          <div className="space-y-2 text-sm">
            <a className="inline-flex items-center gap-2 font-medium text-[#111111] hover:text-[#c01717]" href="tel:+254732364851">
              <Phone size={16} /> +254 732 364 851
            </a>
            <a className="inline-flex items-center gap-2 font-medium text-[#111111] hover:text-[#c01717]" href="https://wa.me/254732364851" target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> WhatsApp us
            </a>
          </div>
          <Link href="/contact" className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#e71212] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#c81010]">
            Contact our team
          </Link>
        </div>
        <InquiryForm propertySlug={property.slug} propertyTitle={property.title} />
      </aside>
    </SectionContainer>
  );
}
