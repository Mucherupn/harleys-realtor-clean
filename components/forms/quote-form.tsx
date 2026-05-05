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
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<QuoteInput>({ resolver: zodResolver(quoteSchema) });

  async function onSubmit(values: QuoteInput) {
    setStatus(null);
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        messageType: 'request_quote',
        subject: `Quote request: ${values.serviceType}`,
        fullName: values.name,
        email: values.email,
        phone: values.phone,
        sourcePage: '/request-quote',
        messageBody: values.details,
        metadata: {
          serviceType: values.serviceType,
          propertyLocation: values.propertyLocation
        }
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
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Request Quote'}
      </Button>
      {status ? <p className={`text-sm ${status.type === 'success' ? 'text-green-700' : 'text-[#e71212]'}`}>{status.message}</p> : null}
    </form>
  );
}
