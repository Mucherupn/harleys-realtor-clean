'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormField } from '@/components/admin/form-fields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAdmin } from '@/lib/admin/admin-context';

const schema = z.object({
  companyName: z.string().min(2),
  phone: z.string().min(5),
  email: z.string().email(),
  address: z.string().min(5),
  heroImagePath: z.string().min(1),
  footerSummary: z.string().min(10),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  x: z.string().optional(),
  copyrightText: z.string().min(4),
});

type FormValues = z.infer<typeof schema>;

export function SettingsForm() {
  const { settings, updateSettings } = useAdmin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      companyName: settings.companyName,
      phone: settings.phone,
      email: settings.email,
      address: settings.address,
      heroImagePath: settings.heroImagePath,
      footerSummary: settings.footerSummary,
      instagram: settings.socialLinks.instagram,
      facebook: settings.socialLinks.facebook,
      linkedin: settings.socialLinks.linkedin,
      x: settings.socialLinks.x,
      copyrightText: settings.copyrightText,
    },
  });

  const onSubmit = handleSubmit((values) => {
    updateSettings({
      companyName: values.companyName,
      phone: values.phone,
      email: values.email,
      address: values.address,
      heroImagePath: values.heroImagePath,
      footerSummary: values.footerSummary,
      socialLinks: {
        instagram: values.instagram,
        facebook: values.facebook,
        linkedin: values.linkedin,
        x: values.x,
      },
      copyrightText: values.copyrightText,
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Company name" error={errors.companyName?.message}><Input {...register('companyName')} /></FormField>
        <FormField label="Phone" error={errors.phone?.message}><Input {...register('phone')} /></FormField>
        <FormField label="Email" error={errors.email?.message}><Input {...register('email')} /></FormField>
        <FormField label="Address" error={errors.address?.message}><Input {...register('address')} /></FormField>
      </div>
      <FormField label="Hero image path" error={errors.heroImagePath?.message}><Input {...register('heroImagePath')} /></FormField>
      <FormField label="Footer summary" error={errors.footerSummary?.message}><Textarea rows={4} {...register('footerSummary')} /></FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Instagram"><Input {...register('instagram')} /></FormField>
        <FormField label="Facebook"><Input {...register('facebook')} /></FormField>
        <FormField label="LinkedIn"><Input {...register('linkedin')} /></FormField>
        <FormField label="X/Twitter"><Input {...register('x')} /></FormField>
      </div>
      <FormField label="Copyright text" error={errors.copyrightText?.message}><Input {...register('copyrightText')} /></FormField>
      <Button type="submit" disabled={isSubmitting}>Save settings</Button>
    </form>
  );
}
