'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quoteSchema, type QuoteInput } from '@/lib/validators/quote';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export function QuoteForm() {
  const [status, setStatus] = useState('');
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<QuoteInput>({ resolver: zodResolver(quoteSchema) });

  async function onSubmit(values: QuoteInput) {
    const response = await fetch('/api/quote', { method: 'POST', body: JSON.stringify(values) });
    setStatus(response.ok ? 'Quote request submitted.' : 'Failed to submit request.');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-2xl border border-[#e5e7eb] bg-white p-5 sm:p-6">
      <Input placeholder="Full name" {...register('name')} />
      <Input type="email" placeholder="Email" {...register('email')} />
      <Input placeholder="Phone" {...register('phone')} />
      <Select {...register('serviceType')} defaultValue="">
        <option value="">Select service</option>
        <option value="letting-sales">Letting and Sales</option>
        <option value="management">Property Management</option>
        <option value="consultancy">Consultancy</option>
      </Select>
      <Input placeholder="Property location" {...register('propertyLocation')} />
      <Textarea rows={5} placeholder="Request details" {...register('details')} />
      <Button className="w-full sm:w-auto" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Request Quote'}
      </Button>
      {status ? <p className="text-sm text-[#6b7280]">{status}</p> : null}
    </form>
  );
}
