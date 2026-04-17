import type { PropsWithChildren } from 'react';

export function Badge({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex rounded-full border border-[#f4c7c7] bg-[#fff8f8] px-3 py-1 text-xs font-semibold tracking-wide text-[#b01515]">
      {children}
    </span>
  );
}
