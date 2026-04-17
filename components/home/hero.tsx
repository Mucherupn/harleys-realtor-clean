import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/ui/section-container';
import { siteConfig } from '@/lib/constants/site';

export function Hero() {
  return (
    <section className="bg-[#111111] py-20 text-white md:py-28">
      <SectionContainer className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.16em] text-white/70">Nairobi Real Estate Since {siteConfig.establishedYear}</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">Premium real estate guidance for decisive clients.</h1>
          <p className="max-w-2xl text-base text-white/75 md:text-lg">We support property sales, lettings, management, and consultancy with deep Nairobi market context and practical execution.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/properties"><Button>View Listings</Button></Link>
            <Link href="/services"><Button variant="secondary">Explore Services</Button></Link>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
