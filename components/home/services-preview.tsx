import Link from 'next/link';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeading } from '@/components/ui/section-heading';
import { services } from '@/lib/queries/public';
import { Card } from '@/components/ui/card';

export function ServicesPreview() {
  return (
    <SectionContainer className="mt-20 space-y-8">
      <SectionHeading eyebrow="Our Services" title="Structured support for each property stage" />
      <div className="grid gap-5 md:grid-cols-3">
        {services.map((service) => (
          <Card key={service.slug} className="space-y-4">
            <h3 className="text-xl font-semibold text-[#111111]">{service.title}</h3>
            <p className="text-sm text-[#6b7280]">{service.description}</p>
            <Link href={`/services/${service.slug}`} className="text-sm font-semibold text-[#e71212]">Learn more →</Link>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
