'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '@/lib/validators/contact';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactInput) {
    setStatus(null);
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        messageType: 'contact_message',
        subject: 'Contact form submission',
        fullName: values.name,
        email: values.email,
        phone: values.phone,
        sourcePage: '/contact',
        messageBody: values.message
      })
    });

    if (response.ok) {
      reset();
      setStatus({ type: 'success', message: 'Thank you. Your message has been sent.' });
      return;
    }

    setStatus({ type: 'error', message: 'Sorry, your message could not be sent. Please try again.' });
  }

  return (
    <form className="space-y-4 rounded-2xl border border-[#e5e7eb] bg-white p-5 sm:p-6" onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Full name" {...register('name')} />
      {errors.name ? <p className="text-xs text-[#e71212]">Enter your name.</p> : null}
      <Input placeholder="Email address" type="email" {...register('email')} />
      <Input placeholder="Phone number" {...register('phone')} />
      <Textarea placeholder="Tell us how we can help" rows={5} {...register('message')} />
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
      {status ? <p className={`text-sm ${status.type === 'success' ? 'text-green-700' : 'text-[#e71212]'}`}>{status.message}</p> : null}
    </form>
  );
}
