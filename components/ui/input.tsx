import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'h-11 w-full rounded-md border border-[#e5e7eb] bg-white px-3 text-sm text-[#111111] outline-none placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#e71212]/20',
        props.className
      )}
    />
  );
}
