import Link from 'next/link';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { agents } from '@/lib/queries/public';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({ title: 'About Us', description: 'Learn about Harleys Realtor, established in 2019 and focused on Nairobi real estate delivery.', path: '/about' });

export default function AboutPage() {
  return (
    <SectionContainer className="space-y-16 py-16">
      <SectionHeading title="Built for confident property decisions in Nairobi" description="Since 2019, Harleys Realtor has focused on practical, tailored advisory for sellers, landlords, buyers, and investors." />
      <div className="grid gap-5 md:grid-cols-3">
        <Card><h3 className="font-semibold">Mission</h3><p className="mt-2 text-sm text-[#6b7280]">To deliver clear, credible, and accountable real estate outcomes.</p></Card>
        <Card><h3 className="font-semibold">Values</h3><p className="mt-2 text-sm text-[#6b7280]">Integrity, responsiveness, precision, and local market discipline.</p></Card>
        <Card><h3 className="font-semibold">Why Harleys</h3><p className="mt-2 text-sm text-[#6b7280]">Clients trust us for measured advice, strong communication, and execution that protects value.</p></Card>
      </div>
      <div>
        <SectionHeading eyebrow="Team" title="People behind the advisory" />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {agents.map((agent) => <Card key={agent.id}><h4 className="font-semibold">{agent.name}</h4><p className="text-sm text-[#6b7280]">{agent.role}</p></Card>)}
        </div>
      </div>
      <Card className="text-center">
        <h3 className="text-2xl font-semibold">Let’s discuss your next property move.</h3>
        <Link href="/contact" className="mt-3 inline-flex text-sm font-semibold text-[#e71212]">Contact our team →</Link>
      </Card>
    </SectionContainer>
  );
}
