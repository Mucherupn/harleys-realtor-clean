'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '@/lib/validators/contact';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const [status, setStatus] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactInput) {
    const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(values) });
    setStatus(response.ok ? 'Message sent successfully.' : 'Unable to send message right now.');
  }

  return (
    <form className="space-y-4 rounded-2xl border border-[#e5e7eb] bg-white p-5 sm:p-6" onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Full name" {...register('name')} />
      {errors.name ? <p className="text-xs text-[#e71212]">Enter your name.</p> : null}
      <Input placeholder="Email address" type="email" {...register('email')} />
      <Input placeholder="Phone number" {...register('phone')} />
      <Textarea placeholder="Tell us how we can help" rows={5} {...register('message')} />
      <Button className="w-full sm:w-auto" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
      {status ? <p className="text-sm text-[#6b7280]">{status}</p> : null}
    </form>
  );
}
