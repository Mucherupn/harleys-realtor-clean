import type { PropsWithChildren } from 'react';

export function Badge({ children }: PropsWithChildren) {
  return <span className="inline-flex rounded-full bg-[#fef2f2] px-3 py-1 text-xs font-medium text-[#e71212]">{children}</span>;
}
