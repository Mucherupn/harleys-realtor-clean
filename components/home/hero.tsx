import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/ui/section-container';
import { siteConfig } from '@/lib/constants/site';
import { PropertySearchCard } from '@/components/home/property-search-card';

export function Hero() {
  return (
    <section className="relative overflow-hidden text-white">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=80")'
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.85)_0%,rgba(10,10,10,0.64)_48%,rgba(10,10,10,0.5)_100%)]" />

      <SectionContainer className="relative py-22 md:py-30">
        <div className="max-w-3xl space-y-6 md:space-y-7">
          <p className="text-sm uppercase tracking-[0.16em] text-white/80">Nairobi Real Estate Since {siteConfig.establishedYear}</p>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Premium real estate guidance for decisive clients.</h1>
          <p className="max-w-2xl text-base text-white/85 md:text-lg">We support property sales, lettings, management, and consultancy with deep Nairobi market context and practical execution.</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/properties"><Button className="shadow-lg shadow-black/20">View Listings</Button></Link>
            <Link href="/services"><Button variant="secondary" className="border-white/20 bg-white/95">Explore Services</Button></Link>
          </div>
        </div>

        <PropertySearchCard className="mt-10 p-5 shadow-xl shadow-black/20 md:mt-12 md:p-6" />
      </SectionContainer>
    </section>
  );
}
