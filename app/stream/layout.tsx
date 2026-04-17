import type { PropsWithChildren } from 'react';
import { AdminProvider } from '@/lib/admin/admin-context';

export default function StreamLayout({ children }: PropsWithChildren) {
  return <AdminProvider>{children}</AdminProvider>;
}
