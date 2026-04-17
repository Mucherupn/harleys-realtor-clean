import Link from 'next/link';
import { agents } from '@/lib/queries/public';
import { SectionContainer } from '@/components/ui/section-container';
import { Card } from '@/components/ui/card';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({ title: 'Team', description: 'Meet the Harleys Realtor team serving Nairobi property clients.', path: '/team' });

export default function TeamPage() {
  return (
    <SectionContainer className="space-y-8 py-16">
      <h1 className="text-4xl font-semibold">Our Team</h1>
      <div className="grid gap-5 md:grid-cols-2">
        {agents.map((agent) => (
          <Card key={agent.id}>
            <h2 className="text-xl font-semibold">{agent.name}</h2>
            <p className="text-sm text-[#6b7280]">{agent.role}</p>
            <p className="mt-3 text-sm text-[#6b7280]">{agent.bio}</p>
            <Link href={`/team/${agent.slug}`} className="mt-4 inline-flex text-sm font-semibold text-[#e71212]">View profile →</Link>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
