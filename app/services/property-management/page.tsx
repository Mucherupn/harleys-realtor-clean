import Link from 'next/link';
import { services } from '@/lib/queries/public';
import { SectionContainer } from '@/components/ui/section-container';
import { buildMetadata } from '@/lib/seo/metadata';

const service = services.find((item) => item.slug === 'property-management')!;
export const metadata = buildMetadata({ title: 'Property Management', description: service.description, path: '/services/property-management' });

export default function PropertyManagementPage() {
  return (
    <SectionContainer className="space-y-8 py-16">
      <h1 className="text-4xl font-semibold">Property Management</h1>
      <p className="max-w-3xl text-[#6b7280]">{service.description}</p>
      <ul className="list-disc space-y-1 pl-5 text-[#6b7280]">{service.capabilities.map((item) => <li key={item}>{item}</li>)}</ul>
      <ol className="list-decimal space-y-1 pl-5 text-[#6b7280]">{service.process.map((step) => <li key={step}>{step}</li>)}</ol>
      <Link href="/request-quote" className="text-sm font-semibold text-[#e71212]">Request management quote →</Link>
    </SectionContainer>
  );
}
