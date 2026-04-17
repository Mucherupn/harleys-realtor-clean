import Link from 'next/link';
import { Menu } from 'lucide-react';
import { navLinks } from '@/lib/constants/site';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-[#e71212]/95 shadow-[0_8px_24px_rgba(0,0,0,0.16)] backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link href="/" className="text-base font-semibold tracking-wide text-white sm:text-lg">
          Harleys Realtor
        </Link>

        <nav className="hidden items-center gap-4 lg:flex xl:gap-6">
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

        <div className="hidden lg:block">
          <Link href="/request-quote" className="inline-flex">
            <Button
              variant="secondary"
              className="h-10 rounded-lg border-white/20 bg-white px-4 font-medium text-[#161616] shadow-sm hover:bg-white/95"
            >
              Request Quote
            </Button>
          </Link>
        </div>

        <details className="group relative lg:hidden">
          <summary className="flex list-none cursor-pointer items-center gap-2 rounded-md border border-white/25 px-3 py-2 text-sm font-medium text-white marker:content-none">
            <Menu size={16} />
            Menu
          </summary>
          <div className="absolute right-0 mt-2 w-64 rounded-xl border border-white/20 bg-[#be1616] p-3 shadow-2xl">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white/95 transition hover:bg-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/request-quote"
                className="mt-1 rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-[#161616]"
              >
                Request Quote
              </Link>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
