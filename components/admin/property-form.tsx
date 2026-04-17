'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormField } from '@/components/admin/form-fields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAdmin } from '@/lib/admin/admin-context';
import type { AdminProperty } from '@/types/admin';

const schema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  purpose: z.enum(['sale', 'rent']),
  propertyType: z.string().min(2),
  location: z.string().min(2),
  price: z.string().min(1),
  bedrooms: z.string().min(1),
  bathrooms: z.string().min(1),
  area: z.string().min(1),
  shortDescription: z.string().min(8),
  fullDescription: z.string().min(16),
  coverImage: z.string().min(1),
  galleryImages: z.string(),
  featured: z.boolean(),
  published: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

function mapPropertyToForm(property?: AdminProperty): FormValues {
  return {
    title: property?.title ?? '',
    slug: property?.slug ?? '',
    purpose: property?.purpose ?? 'sale',
    propertyType: property?.propertyType ?? '',
    location: property?.location ?? '',
    price: property ? String(property.price) : '',
    bedrooms: property ? String(property.bedrooms) : '0',
    bathrooms: property ? String(property.bathrooms) : '0',
    area: property ? String(property.area) : '',
    shortDescription: property?.shortDescription ?? '',
    fullDescription: property?.fullDescription ?? '',
    coverImage: property?.coverImage ?? '/next.svg',
    galleryImages: property?.galleryImages.join(', ') ?? '',
    featured: property?.featured ?? false,
    published: property?.published ?? false,
  };
}

export function PropertyForm({ property }: { property?: AdminProperty }) {
  const isEdit = Boolean(property);
  const router = useRouter();
  const { createProperty, updateProperty } = useAdmin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: mapPropertyToForm(property) });

  const onSubmit = handleSubmit((values) => {
    const payload = {
      ...values,
      price: Number(values.price),
      bedrooms: Number(values.bedrooms),
      bathrooms: Number(values.bathrooms),
      area: Number(values.area),
      galleryImages: values.galleryImages
        .split(',')
        .map((value: string) => value.trim())
        .filter(Boolean),
    };

    if (property) {
      updateProperty(property.id, payload);
      router.push('/stream/properties');
      return;
    }

    createProperty(payload);
    router.push('/stream/properties');
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Title" error={errors.title?.message}><Input {...register('title')} /></FormField>
        <FormField label="Slug" error={errors.slug?.message}><Input {...register('slug')} /></FormField>
        <FormField label="Purpose" error={errors.purpose?.message}>
          <Select {...register('purpose')}>
            <option value="sale">Sale</option>
            <option value="rent">Rent</option>
          </Select>
        </FormField>
        <FormField label="Property type" error={errors.propertyType?.message}><Input {...register('propertyType')} /></FormField>
        <FormField label="Location" error={errors.location?.message}><Input {...register('location')} /></FormField>
        <FormField label="Price" error={errors.price?.message}><Input type="number" {...register('price')} /></FormField>
        <FormField label="Bedrooms" error={errors.bedrooms?.message}><Input type="number" {...register('bedrooms')} /></FormField>
        <FormField label="Bathrooms" error={errors.bathrooms?.message}><Input type="number" {...register('bathrooms')} /></FormField>
        <FormField label="Area (sqft)" error={errors.area?.message}><Input type="number" {...register('area')} /></FormField>
        <FormField label="Cover image path" error={errors.coverImage?.message}><Input {...register('coverImage')} /></FormField>
      </div>
      <FormField label="Gallery images (comma separated paths)"><Input {...register('galleryImages')} /></FormField>
      <FormField label="Short description" error={errors.shortDescription?.message}><Textarea rows={3} {...register('shortDescription')} /></FormField>
      <FormField label="Full description" error={errors.fullDescription?.message}><Textarea rows={8} {...register('fullDescription')} /></FormField>

      <div className="grid gap-2 sm:grid-cols-2">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('featured')} /> Featured</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('published')} /> Published</label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>{isEdit ? 'Save property' : 'Create property'}</Button>
        <Link href="/stream/properties"><Button type="button" variant="secondary">Cancel</Button></Link>
      </div>
    </form>
  );
}
