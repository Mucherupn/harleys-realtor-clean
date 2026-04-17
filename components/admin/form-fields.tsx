import type { PropsWithChildren } from 'react';

export function FormField({ label, error, children }: PropsWithChildren<{ label: string; error?: string }>) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-[#111111]">{label}</span>
      {children}
      {error ? <span className="text-xs text-[#b91c1c]">{error}</span> : null}
    </label>
  );
}
