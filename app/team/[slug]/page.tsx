import { notFound } from 'next/navigation';
import { agents } from '@/lib/queries/public';
import { SectionContainer } from '@/components/ui/section-container';

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.slug }));
}

export default async function TeamProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = agents.find((item) => item.slug === slug);

  if (!agent) notFound();

  return (
    <SectionContainer className="max-w-3xl space-y-6 py-16">
      <h1 className="text-4xl font-semibold">{agent.name}</h1>
      <p className="text-lg text-[#6b7280]">{agent.role}</p>
      <p className="text-[#6b7280]">{agent.bio}</p>
      <p className="text-sm text-[#111111]"><strong>Focus:</strong> {agent.focus}</p>
      <p className="text-sm text-[#111111]"><strong>Email:</strong> {agent.email}</p>
    </SectionContainer>
  );
}
