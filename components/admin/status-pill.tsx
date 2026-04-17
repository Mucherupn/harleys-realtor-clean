import { cn } from '@/lib/utils/cn';

export function StatusPill({ label, tone = 'default' }: { label: string; tone?: 'default' | 'success' | 'danger' }) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2 py-1 text-xs font-semibold',
        tone === 'success' && 'bg-[#ecfdf3] text-[#047857]',
        tone === 'danger' && 'bg-[#fff1f1] text-[#b91c1c]',
        tone === 'default' && 'bg-[#f3f4f6] text-[#374151]'
      )}
    >
      {label}
    </span>
  );
}
