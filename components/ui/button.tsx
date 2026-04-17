import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const styles: Record<Variant, string> = {
  primary: 'bg-[#e71212] text-white hover:bg-[#c81010]',
  secondary: 'bg-white text-[#111111] border border-[#e5e7eb] hover:bg-[#f9fafb]',
  ghost: 'bg-transparent text-[#111111] hover:bg-[#f3f4f6]'
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition-colors disabled:opacity-50',
        styles[variant],
        className
      )}
      {...props}
    />
  );
}
