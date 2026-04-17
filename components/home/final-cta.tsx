import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/ui/section-container';

export function FinalCta() {
  return (
    <SectionContainer className="mt-20">
      <div className="rounded-2xl bg-[#111111] px-6 py-12 text-center text-white md:px-12">
        <h2 className="text-3xl font-semibold">Ready to move with confidence?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/75">Speak with our team about selling, letting, management, or a custom advisory brief in Nairobi.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/contact"><Button>Talk to Us</Button></Link>
          <Link href="/request-quote"><Button variant="secondary">Request Quote</Button></Link>
        </div>
      </div>
    </SectionContainer>
  );
}
