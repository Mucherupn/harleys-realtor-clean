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
import type { AdminArticle } from '@/types/admin';

const schema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  coverImage: z.string().min(1),
  published: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export function ArticleForm({ article }: { article?: AdminArticle }) {
  const router = useRouter();
  const { createArticle, updateArticle } = useAdmin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: article?.title ?? '',
      slug: article?.slug ?? '',
      excerpt: article?.excerpt ?? '',
      content: article?.content ?? '',
      coverImage: article?.coverImage ?? '/next.svg',
      published: article?.published ?? false,
    },
  });

  const onSubmit = handleSubmit((values) => {
    if (article) {
      updateArticle(article.id, values);
      router.push('/stream/articles');
      return;
    }

    createArticle(values);
    router.push('/stream/articles');
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Title" error={errors.title?.message}><Input {...register('title')} /></FormField>
        <FormField label="Slug" error={errors.slug?.message}><Input {...register('slug')} /></FormField>
      </div>
      <FormField label="Excerpt" error={errors.excerpt?.message}><Textarea rows={3} {...register('excerpt')} /></FormField>
      <FormField label="Content" error={errors.content?.message}><Textarea rows={10} {...register('content')} /></FormField>
      <FormField label="Cover image path" error={errors.coverImage?.message}><Input {...register('coverImage')} /></FormField>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register('published')} /> Published</label>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>{article ? 'Save article' : 'Create article'}</Button>
        <Link href="/stream/articles"><Button type="button" variant="secondary">Cancel</Button></Link>
      </div>
    </form>
  );
}
