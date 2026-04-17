import { SectionContainer } from '@/components/ui/section-container';

const points = ['Established 2019', 'Nairobi-focused specialists', 'Tailored client handling', 'Disciplined execution'];

export function TrustStrip() {
  return (
    <SectionContainer className="mt-14">
      <div className="grid gap-4 rounded-xl border border-[#e5e7eb] bg-white p-6 md:grid-cols-4">
        {points.map((point) => (
          <p key={point} className="text-center text-sm font-medium text-[#111111]">{point}</p>
        ))}
      </div>
    </SectionContainer>
  );
}
