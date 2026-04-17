import Link from 'next/link';
import { siteConfig } from '@/lib/constants/site';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[#e5e7eb] bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[#111111]">{siteConfig.name}</h3>
          <p className="text-sm text-[#6b7280]">Turning dreams into addresses. Trusted Nairobi advisory and execution across sales, lettings, and management.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#111111]">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-[#6b7280]">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/properties">Property Listing</Link></li>
            <li><Link href="/team">Team</Link></li>
            <li><Link href="/blog">News & Insights</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#111111]">Services</h4>
          <ul className="mt-3 space-y-2 text-sm text-[#6b7280]">
            <li><Link href="/services/letting-and-sales">Letting and Sales</Link></li>
            <li><Link href="/services/property-management">Property Management</Link></li>
            <li><Link href="/services/consultancy">Consultancy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-[#111111]">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-[#6b7280]">
            <li>{siteConfig.location}</li>
            <li>{siteConfig.phone}</li>
            <li>{siteConfig.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#e5e7eb] py-5 text-center text-sm text-[#6b7280]">© {new Date().getFullYear()} Harleys Realtor. All rights reserved.</div>
    </footer>
  );
}
