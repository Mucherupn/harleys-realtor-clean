import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        'h-11 w-full rounded-md border border-[#e5e7eb] bg-white px-3 text-sm text-[#111111] outline-none focus:ring-2 focus:ring-[#e71212]/20',
        props.className
      )}
    />
  );
}
