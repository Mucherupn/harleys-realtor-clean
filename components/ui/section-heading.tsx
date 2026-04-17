import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: 'light' | 'dark';
  centered?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  tone = 'light',
  centered = false
}: SectionHeadingProps) {
  const titleColor = tone === 'dark' ? 'text-white' : 'text-[#111111]';
  const textColor = tone === 'dark' ? 'text-white/70' : 'text-[#5f6773]';

  return (
    <div className={cn('flex flex-col gap-6 md:flex-row md:items-end md:justify-between', centered && 'items-center text-center')}>
      <div className={cn('max-w-3xl space-y-3', centered && 'mx-auto')}>
        {eyebrow ? <Badge>{eyebrow}</Badge> : null}
        <h2 className={cn('text-3xl font-semibold tracking-tight md:text-4xl', titleColor)}>{title}</h2>
        {description ? <p className={cn('max-w-2xl text-base md:text-lg', textColor)}>{description}</p> : null}
      </div>
      {action ? <div className={cn('shrink-0', centered && 'mx-auto')}>{action}</div> : null}
    </div>
  );
}
