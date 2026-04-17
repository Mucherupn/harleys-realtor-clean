import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils/cn';

export function SectionContainer({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <section className={cn('mx-auto w-full max-w-6xl px-4 md:px-6', className)}>{children}</section>;
}
