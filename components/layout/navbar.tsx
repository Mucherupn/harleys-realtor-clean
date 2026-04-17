import Link from 'next/link';
import { navLinks } from '@/lib/constants/site';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-[#e71212]/95 shadow-[0_8px_24px_rgba(0,0,0,0.16)] backdrop-blur">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-semibold tracking-wide text-white">
          Harleys Realtor
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/90 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/request-quote" className="hidden md:inline-flex">
          <Button
            variant="secondary"
            className="h-10 rounded-lg border-white/20 bg-white px-4 font-medium text-[#161616] shadow-sm hover:bg-white/95"
          >
            Request Quote
          </Button>
        </Link>
      </div>
    </header>
  );
}
