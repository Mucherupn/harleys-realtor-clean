'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, type InputHTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormField } from '@/components/admin/form-fields';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAdmin } from '@/lib/admin/admin-context';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';
import { buildPropertySlug } from '@/lib/utils/slug';
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

type SelectedPropertyImage = {
  id: string;
  file: File;
  name: string;
  previewUrl: string;
  isCover: boolean;
};

type DirectoryInputProps = InputHTMLAttributes<HTMLInputElement> & { webkitdirectory?: string };

function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}

function findMainImage(files: File[]): File | undefined {
  return files.find((file) => file.name.toLowerCase().includes('main'));
}

function createImagePreview(file: File): string {
  return URL.createObjectURL(file);
}

function revokeImagePreviews(previews: Array<{ previewUrl: string }>): void {
  previews.forEach((preview) => URL.revokeObjectURL(preview.previewUrl));
}

function toStoragePath(slug: string, filename: string): string {
  return `properties/${slug}/${filename}`;
}

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
  const [selectedImages, setSelectedImages] = useState<SelectedPropertyImage[]>([]);
  const previousImagesRef = useRef<SelectedPropertyImage[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: mapPropertyToForm(property) });

  const watched = watch(['title', 'propertyType', 'purpose', 'location']);
  const autoSlug = useMemo(
    () =>
      buildPropertySlug({
        title: watched[0],
        propertyType: watched[1],
        purpose: watched[2],
        location: watched[3],
      }),
    [watched]
  );

  useEffect(() => {
    if (!isEdit) {
      setValue('slug', autoSlug);
    }
  }, [autoSlug, isEdit, setValue]);

  useEffect(() => {
    const previousImages = previousImagesRef.current;
    previousImagesRef.current = selectedImages;
    revokeImagePreviews(previousImages.filter((old) => !selectedImages.some((current) => current.id === old.id)));
  }, [selectedImages]);

  useEffect(() => () => revokeImagePreviews(previousImagesRef.current), []);

  const handleFolderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).filter(isImageFile);
    if (!files.length) {
      setSelectedImages([]);
      return;
    }

    const mainFile = findMainImage(files);
    const nextImages = files.map((file) => {
      const id = `${file.name}-${file.lastModified}-${crypto.randomUUID()}`;
      return {
        id,
        file,
        name: file.name,
        previewUrl: createImagePreview(file),
        isCover: mainFile ? file === mainFile : false,
      };
    });

    if (!nextImages.some((image) => image.isCover) && nextImages[0]) {
      nextImages[0].isCover = true;
    }

    const cover = nextImages.find((image) => image.isCover);
    setSelectedImages(nextImages);
    if (cover) {
      setValue('coverImage', cover.name);
    }
    setValue('galleryImages', nextImages.map((image) => image.name).join(', '));
  };

  const setCoverImage = (id: string) => {
    setSelectedImages((current) => {
      const next = current.map((image) => ({ ...image, isCover: image.id === id }));
      const cover = next.find((image) => image.isCover);
      if (cover) setValue('coverImage', cover.name);
      return next;
    });
  };

  const removeImage = (id: string) => {
    setSelectedImages((current) => {
      const next = current.filter((image) => image.id !== id);
      if (!next.some((image) => image.isCover) && next[0]) {
        next[0] = { ...next[0], isCover: true };
      }
      setValue('galleryImages', next.map((image) => image.name).join(', '));
      setValue('coverImage', next.find((image) => image.isCover)?.name ?? '');
      return next;
    });
  };

  const onSubmit = handleSubmit(async (values) => {
    let coverImage = values.coverImage;
    let galleryImages = values.galleryImages
      .split(',')
      .map((value: string) => value.trim())
      .filter(Boolean);

    if (selectedImages.length > 0) {
      const supabase = createSupabaseBrowserClient();
      if (!supabase) return;
      const targetSlug = values.slug || autoSlug;
      const uploadedPaths: string[] = [];
      for (const image of selectedImages) {
        const storagePath = toStoragePath(targetSlug, image.name);
        const { error } = await supabase.storage.from('property-images').upload(storagePath, image.file, { upsert: true });
        if (error) {
          throw error;
        }
        uploadedPaths.push(storagePath);
      }
      galleryImages = uploadedPaths;
      const selectedCover = selectedImages.find((image) => image.isCover) ?? selectedImages[0];
      if (selectedCover) {
        coverImage = toStoragePath(targetSlug, selectedCover.name);
      }
    }

    const payload = {
      ...values,
      coverImage,
      price: Number(values.price),
      bedrooms: Number(values.bedrooms),
      bathrooms: Number(values.bathrooms),
      area: Number(values.area),
      galleryImages,
    };

    if (property) {
      await updateProperty(property.id, payload);
      router.push('/stream/properties');
      return;
    }

    const createdPropertyId = await createProperty(payload);
    if (createdPropertyId) {
      router.push('/stream/properties');
    }
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Title" error={errors.title?.message}><Input {...register('title')} /></FormField>
        <FormField label="Slug" error={errors.slug?.message}>
          <div className="space-y-2">
            <Input {...register('slug')} />
            <Button type="button" variant="secondary" onClick={() => setValue('slug', autoSlug)}>Regenerate slug</Button>
          </div>
        </FormField>
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

      <div className="space-y-3 rounded-lg border border-dashed border-[#d9d9d9] p-4">
        <label className="text-sm font-medium text-[#111111]" htmlFor="property-image-folder">Choose property image folder</label>
        <Input id="property-image-folder" type="file" multiple accept="image/*" onChange={handleFolderChange} {...({ webkitdirectory: '' } as DirectoryInputProps)} />
        {selectedImages.length > 0 && (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {selectedImages.map((image) => (
              <div key={image.id} className="space-y-2 rounded-lg border border-[#ececec] p-2">
                <img src={image.previewUrl} alt={image.name} className="h-28 w-full rounded-md object-cover" />
                <p className="truncate text-xs text-[#666]">{image.name}</p>
                <div className="flex items-center gap-2">
                  {image.isCover ? <span className="rounded bg-[#fff1f1] px-2 py-1 text-xs font-semibold text-[#e71212]">Cover</span> : null}
                  <Button type="button" variant="secondary" onClick={() => setCoverImage(image.id)}>Set cover</Button>
                  <Button type="button" variant="secondary" onClick={() => removeImage(image.id)}>Remove</Button>
                </div>
              </div>
            ))}
          </div>
        )}
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
