import Link from 'next/link';
import { siteConfig } from '@/lib/constants/site';

const quickLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/properties', label: 'Property Listings' },
  { href: '/blog', label: 'News & Insights' },
  { href: '/contact', label: 'Contact' }
] as const;

const serviceLinks = [
  { href: '/services/letting-and-sales', label: 'Letting and Sales' },
  { href: '/services/property-management', label: 'Property Management' },
  { href: '/services/consultancy', label: 'Consultancy' }
] as const;

export function Footer() {
  return (
    <footer className="bg-[#111214] text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-10 lg:px-8 lg:py-16">
        <div className="space-y-4 lg:col-span-1">
          <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{siteConfig.name}</h3>
          <p className="max-w-sm text-sm leading-6 text-white/68">
            Premium Nairobi real estate advisory and execution across sales, lettings, management, and strategic consultancy.
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/45">Established {siteConfig.establishedYear}</p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">Quick Links</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/78">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">Services</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/78">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-white/78">
            <li>{siteConfig.location}</li>
            <li>
              <a href={`tel:${siteConfig.phone}`} className="transition-colors hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-white break-all">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/55 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Harleys Realtor. All rights reserved.</p>
          <p>Turning dreams into addresses.</p>
        </div>
      </div>
    </footer>
  );
}
