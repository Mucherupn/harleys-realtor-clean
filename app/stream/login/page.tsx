import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function StreamLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f7f8] p-4">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-[#ececec] bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#6b7280]">Admin Access</p>
          <h1 className="text-2xl font-semibold text-[#111111]">Sign in to Stream</h1>
        </div>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Link href="/stream/dashboard" className="block">
          <Button className="w-full">Sign in</Button>
        </Link>
      </div>
    </div>
  );
}
