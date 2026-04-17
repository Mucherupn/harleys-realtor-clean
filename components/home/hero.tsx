import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionContainer } from '@/components/ui/section-container';
import { PropertySearchCard } from '@/components/home/property-search-card';

export function Hero() {
  return (
    <section className="relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=80")'
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,7,0.84)_0%,rgba(7,7,7,0.60)_45%,rgba(7,7,7,0.42)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(231,18,18,0.16),transparent_24%)]" />

      <SectionContainer className="relative py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/72">Harleys Realtor</p>

          <h1 className="mt-5 max-w-3xl text-3xl font-medium leading-[1.02] sm:text-4xl md:text-5xl lg:text-6xl">Sales. Letting. Management.</h1>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/properties">
              <Button className="bg-[#e71212] px-5 text-white shadow-lg shadow-black/20 hover:bg-[#cf1010] sm:px-6">View Listings</Button>
            </Link>

            <Link href="/services">
              <Button variant="secondary" className="border-white/15 bg-white text-neutral-900 hover:bg-neutral-100">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>

        <PropertySearchCard className="mt-10 border border-white/10 bg-white/95 p-4 shadow-2xl shadow-black/20 backdrop-blur sm:mt-12 md:mt-14 md:p-6" />
      </SectionContainer>
    </section>
  );
}
