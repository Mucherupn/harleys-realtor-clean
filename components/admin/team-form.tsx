'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormField } from '@/components/admin/form-fields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAdmin } from '@/lib/admin/admin-context';
import type { AdminTeamMember } from '@/types/admin';

const schema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  bio: z.string().min(15),
  image: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  published: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export function TeamForm({ member }: { member?: AdminTeamMember }) {
  const router = useRouter();
  const { createTeamMember, updateTeamMember } = useAdmin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: member?.name ?? '',
      role: member?.role ?? '',
      bio: member?.bio ?? '',
      image: member?.image ?? '/next.svg',
      email: member?.email ?? '',
      phone: member?.phone ?? '',
      published: member?.published ?? false,
    },
  });

  const onSubmit = handleSubmit((values) => {
    const payload = { ...values, email: values.email || undefined, phone: values.phone || undefined };
    if (member) {
      updateTeamMember(member.id, payload);
      router.push('/stream/team');
      return;
    }

    createTeamMember(payload);
    router.push('/stream/team');
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Name" error={errors.name?.message}><Input {...register('name')} /></FormField>
        <FormField label="Role" error={errors.role?.message}><Input {...register('role')} /></FormField>
      </div>
      <FormField label="Bio" error={errors.bio?.message}><Textarea rows={6} {...register('bio')} /></FormField>
      <FormField label="Image path" error={errors.image?.message}><Input {...register('image')} /></FormField>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Email (optional)" error={errors.email?.message}><Input {...register('email')} /></FormField>
        <FormField label="Phone (optional)"><Input {...register('phone')} /></FormField>
      </div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('published')} /> Published</label>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>{member ? 'Save team member' : 'Create team member'}</Button>
        <Link href="/stream/team"><Button type="button" variant="secondary">Cancel</Button></Link>
      </div>
    </form>
  );
}
