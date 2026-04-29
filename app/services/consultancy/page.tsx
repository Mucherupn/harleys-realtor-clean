import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SectionContainer } from '@/components/ui/section-container';
import { buildMetadata } from '@/lib/seo/metadata';
import { getPublishedServices } from '@/lib/queries/public';

export const metadata = buildMetadata({ title: 'Consultancy', description: 'Strategic advisory for acquisition, disposal, and portfolio decisions.', path: '/services/consultancy' });

export default async function ConsultancyPage() {
  const service = (await getPublishedServices()).find((item) => item.slug === 'consultancy');
  if (!service) notFound();
  return <SectionContainer className="space-y-6 py-12 sm:py-16 md:space-y-8 md:py-20"><h1 className="text-3xl font-semibold sm:text-4xl">Consultancy</h1><p className="max-w-3xl text-sm leading-7 text-[#6b7280] sm:text-base">{service.description}</p><ul className="list-disc space-y-2 pl-5 text-sm text-[#6b7280] sm:text-base">{service.capabilities.map((item) => <li key={item}>{item}</li>)}</ul><ol className="list-decimal space-y-2 pl-5 text-sm text-[#6b7280] sm:text-base">{service.process.map((step) => <li key={step}>{step}</li>)}</ol><Link href="/contact" className="text-sm font-semibold text-[#e71212]">Book a consultation →</Link></SectionContainer>;
}
