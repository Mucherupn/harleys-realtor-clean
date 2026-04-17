'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils/cn';

const links = [
  { href: '/stream/dashboard', label: 'Dashboard' },
  { href: '/stream/properties', label: 'Properties' },
  { href: '/stream/articles', label: 'Articles' },
  { href: '/stream/team', label: 'Team' },
  { href: '/stream/settings', label: 'Settings' },
  { href: '/stream/media', label: 'Media' },
];

export function AdminShell({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const title = links.find((link) => pathname.startsWith(link.href))?.label ?? 'Admin';

  return (
    <div className="min-h-screen bg-[#f6f7f8]">
      <div className="mx-auto flex w-full max-w-[1400px] gap-4 p-4 lg:gap-6 lg:p-6">
        <aside className="sticky top-4 h-[calc(100vh-2rem)] w-64 shrink-0 rounded-2xl border border-[#ececec] bg-white p-4 shadow-sm max-lg:hidden">
          <div className="mb-6 border-b border-[#f0f0f0] pb-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#6b7280]">Harleys</p>
            <p className="text-lg font-semibold text-[#111111]">Admin Stream</p>
          </div>
          <nav className="space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href as Route}
                  className={cn(
                    'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-[#e71212] text-white' : 'text-[#111111] hover:bg-[#f4f4f5]'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 space-y-4">
          <header className="rounded-2xl border border-[#ececec] bg-white px-4 py-3 shadow-sm sm:px-6 sm:py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#6b7280]">Admin Panel</p>
                <h1 className="text-2xl font-semibold text-[#111111]">{title}</h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="rounded-full bg-[#fff1f1] px-3 py-1 text-xs font-semibold text-[#e71212]">Admin User</span>
                <Link href="/stream/login" className="text-sm font-medium text-[#6b7280] hover:text-[#111111]">
                  Logout
                </Link>
              </div>
            </div>
          </header>

          <div className="rounded-2xl border border-[#ececec] bg-white p-4 shadow-sm sm:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
