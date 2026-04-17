import Link from 'next/link';
import { services } from '@/lib/queries/public';
import { SectionContainer } from '@/components/ui/section-container';
import { buildMetadata } from '@/lib/seo/metadata';

const service = services.find((item) => item.slug === 'letting-and-sales')!;

export const metadata = buildMetadata({ title: 'Letting and Sales', description: service.description, path: '/services/letting-and-sales' });

export default function LettingSalesPage() {
  return (
    <SectionContainer className="space-y-6 py-12 sm:py-16 md:space-y-8 md:py-20">
      <h1 className="text-3xl font-semibold sm:text-4xl">Letting and Sales</h1>
      <p className="max-w-3xl text-sm leading-7 text-[#6b7280] sm:text-base">{service.description}</p>
      <ul className="list-disc space-y-2 pl-5 text-sm text-[#6b7280] sm:text-base">{service.capabilities.map((item) => <li key={item}>{item}</li>)}</ul>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-[#6b7280] sm:text-base">{service.process.map((step) => <li key={step}>{step}</li>)}</ol>
      <Link href="/request-quote" className="text-sm font-semibold text-[#e71212]">Request a quote →</Link>
    </SectionContainer>
  );
}
