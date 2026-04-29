'use client';

import { type FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

export default function StreamLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setError('Supabase environment variables are missing.');
      setIsSubmitting(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message || 'Unable to sign in.');
      setIsSubmitting(false);
      return;
    }

    router.push('/stream/dashboard');
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6f7f8] p-4">
      <div className="w-full max-w-md space-y-4 rounded-2xl border border-[#ececec] bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#6b7280]">Admin Access</p>
          <h1 className="text-2xl font-semibold text-[#111111]">Sign in to Stream</h1>
        </div>
        <form className="space-y-3" onSubmit={onSubmit}>
          <Input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          {error ? <p className="text-sm text-[#e71212]">{error}</p> : null}
          <Button className="w-full" disabled={isSubmitting} type="submit">Sign in</Button>
        </form>
      </div>
    </div>
  );
}
