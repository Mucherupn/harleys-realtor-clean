import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/ui/section-container';

export function FinalCta() {
  return (
    <section className="mt-20 bg-[#121315] py-18 md:py-24">
      <SectionContainer>
        <div className="mx-auto max-w-4xl text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Begin Your Next Move</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">Ready to execute with confidence in Nairobi?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
            Engage Harleys Realtor for structured sales, lettings, management, and advisory support built for long-term value.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/contact">
              <Button className="h-12 rounded-full px-8">Talk to Us</Button>
            </Link>
            <Link href="/request-quote">
              <Button variant="secondary" className="h-12 rounded-full border-white/20 bg-transparent px-8 text-white hover:bg-white/10">
                Request Quote
              </Button>
            </Link>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
