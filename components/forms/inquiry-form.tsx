'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquirySchema, type InquiryInput } from '@/lib/validators/inquiry';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function InquiryForm({ propertySlug }: { propertySlug: string }) {
  const [status, setStatus] = useState('');
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { propertySlug }
  });

  async function onSubmit(values: InquiryInput) {
    const response = await fetch('/api/inquiry', { method: 'POST', body: JSON.stringify(values) });
    setStatus(response.ok ? 'Inquiry sent.' : 'We could not send your inquiry.');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded-xl border border-[#e5e7eb] p-5">
      <h3 className="text-lg font-semibold text-[#111111]">Property Inquiry</h3>
      <Input placeholder="Full name" {...register('name')} />
      <Input type="email" placeholder="Email" {...register('email')} />
      <Input placeholder="Phone" {...register('phone')} />
      <Textarea rows={4} placeholder="Your message" {...register('message')} />
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</Button>
      {status ? <p className="text-sm text-[#6b7280]">{status}</p> : null}
    </form>
  );
}
