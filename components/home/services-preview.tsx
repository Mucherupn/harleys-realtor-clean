import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeading } from '@/components/ui/section-heading';
import { services } from '@/lib/queries/public';

export function ServicesPreview() {
  return (
    <section className="mt-20 bg-[#f5f6f8] py-18 md:py-24">
      <SectionContainer className="space-y-10">
        <SectionHeading
          eyebrow="Our Services"
          title="Structured representation across every property mandate"
          description="From leasing and sales to long-term asset operations, each service line is designed for disciplined execution and trusted reporting."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.slug}
              className="group flex h-full flex-col rounded-2xl border border-[#e2e6ec] bg-white p-7 shadow-[0_6px_20px_rgba(17,17,17,0.05)] transition hover:border-[#d4d9e2] hover:shadow-[0_12px_26px_rgba(17,17,17,0.08)]"
            >
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#111111] text-sm font-semibold text-white">
                0{index + 1}
              </div>
              <h3 className="text-2xl font-semibold text-[#111111]">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#5f6773]">{service.description}</p>
              <Link
                href={`/services/${service.slug}`}
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#a41414] transition-colors group-hover:text-[#7f1010]"
              >
                Learn more <ArrowUpRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
