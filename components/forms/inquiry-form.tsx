'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquirySchema, type InquiryInput } from '@/lib/validators/inquiry';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export function InquiryForm({ propertySlug, propertyTitle }: { propertySlug: string; propertyTitle?: string }) {
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { propertySlug, propertyTitle }
  });

  async function onSubmit(values: InquiryInput) {
    setStatus(null);
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        messageType: 'property_enquiry',
        subject: `Property enquiry: ${values.propertyTitle ?? values.propertySlug}`,
        fullName: values.name,
        email: values.email,
        phone: values.phone,
        propertySlug: values.propertySlug,
        propertyTitle: values.propertyTitle,
        sourcePage: `/properties/${values.propertySlug}`,
        messageBody: values.message
      })
    });

    if (response.ok) {
      reset({
        name: '',
        email: '',
        phone: '',
        message: '',
        propertySlug,
        propertyTitle
      });
      setStatus({ type: 'success', message: 'Thank you. Your message has been sent.' });
      return;
    }

    setStatus({ type: 'error', message: 'Sorry, your message could not be sent. Please try again.' });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border border-[#e5e7eb] bg-white p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-[#111111]">Property Inquiry</h3>
      <Input placeholder="Full name" {...register('name')} />
      <Input type="email" placeholder="Email" {...register('email')} />
      <Input placeholder="Phone" {...register('phone')} />
      <Textarea rows={4} placeholder="Your message" {...register('message')} />
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
      </Button>
      {status ? <p className={`text-sm ${status.type === 'success' ? 'text-green-700' : 'text-[#e71212]'}`}>{status.message}</p> : null}
    </form>
  );
}
