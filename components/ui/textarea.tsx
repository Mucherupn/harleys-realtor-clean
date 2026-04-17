import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#111111] outline-none placeholder:text-[#6b7280] focus:ring-2 focus:ring-[#e71212]/20',
        props.className
      )}
    />
  );
}
