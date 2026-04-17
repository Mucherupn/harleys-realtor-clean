import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils/cn';

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn('rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm', className)}>{children}</div>;
}
