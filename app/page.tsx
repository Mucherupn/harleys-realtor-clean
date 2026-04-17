import { Hero } from '@/components/home/hero';
import { TrustStrip } from '@/components/home/trust-strip';
import { FeaturedProperties } from '@/components/home/featured-properties';
import { ServicesPreview } from '@/components/home/services-preview';
import { LocationsPreview } from '@/components/home/locations-preview';
import { InsightsPreview } from '@/components/home/insights-preview';
import { FinalCta } from '@/components/home/final-cta';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({
  title: 'Nairobi Property Specialists',
  description: 'Harleys Realtor supports serious property decisions in Nairobi through premium sales, lettings, and management services.'
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedProperties />
      <ServicesPreview />
      <LocationsPreview />
      <InsightsPreview />
      <FinalCta />
    </>
  );
}
