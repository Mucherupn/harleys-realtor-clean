import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeading } from '@/components/ui/section-heading';
import { focusLocations } from '@/lib/queries/public';

export function LocationsPreview() {
  return (
    <SectionContainer className="mt-12 space-y-8 sm:mt-16 md:mt-20 md:space-y-10">
      <SectionHeading
        eyebrow="Nairobi Focus"
        title="Explore prime locations with active demand"
        description="Neighborhood-level guidance for buyers, landlords, and investors looking at Nairobi's most resilient residential and mixed-use zones."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {focusLocations.map((location, index) => (
          <article
            key={location.name}
            className="group relative overflow-hidden rounded-2xl border border-[#dde2ea] bg-[linear-gradient(130deg,#ffffff_0%,#f4f6fa_100%)] p-6 sm:p-8 shadow-[0_8px_24px_rgba(17,17,17,0.05)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#7f8794]">Area {index + 1}</p>
            <h3 className="mt-3 text-2xl font-semibold text-[#121826] sm:text-3xl">{location.name}</h3>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#5f6773]">{location.summary}</p>
            <Link
              href="/properties"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#111111] transition-colors group-hover:text-[#a11414]"
            >
              Browse {location.name} listings <MoveRight size={15} />
            </Link>
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-[#e71212]/8 blur-2xl" />
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}
