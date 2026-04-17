import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeading } from '@/components/ui/section-heading';
import { focusLocations } from '@/lib/queries/public';

export function LocationsPreview() {
  return (
    <SectionContainer className="mt-20 space-y-8">
      <SectionHeading eyebrow="Nairobi Focus" title="Neighborhoods we actively cover" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {focusLocations.map((location) => (
          <article key={location.name} className="rounded-xl border border-[#e5e7eb] p-5">
            <h3 className="font-semibold text-[#111111]">{location.name}</h3>
            <p className="mt-2 text-sm text-[#6b7280]">{location.summary}</p>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}
