import Link from 'next/link';
import { services } from '@/lib/queries/public';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({ title: 'Our Services', description: 'Letting and sales, property management, and consultancy services for Nairobi property clients.', path: '/services' });

export default function ServicesPage() {
  return (
    <SectionContainer className="space-y-10 py-16">
      <SectionHeading title="Services designed for real market conditions" description="We combine local market knowledge with tailored execution from listing strategy to tenant handling and advisory." />
      <div className="grid gap-5 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service.slug} className="space-y-3">
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <p className="text-sm text-[#6b7280]">{service.description}</p>
            <ul className="list-disc space-y-1 pl-5 text-sm text-[#6b7280]">{service.capabilities.slice(0,3).map((item) => <li key={item}>{item}</li>)}</ul>
            <Link href={`/services/${service.slug}`} className="text-sm font-semibold text-[#e71212]">View service →</Link>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
