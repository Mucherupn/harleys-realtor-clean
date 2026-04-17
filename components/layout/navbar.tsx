import Link from 'next/link';
import { navLinks } from '@/lib/constants/site';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#111111]/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-semibold tracking-wide text-white">
          Harleys Realtor
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-white/80 transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/request-quote" className="hidden md:inline-flex">
          <Button className="h-10">Request Quote</Button>
        </Link>
      </div>
    </header>
  );
}
