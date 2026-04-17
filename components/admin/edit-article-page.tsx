'use client';

import { notFound } from 'next/navigation';
import { useAdmin } from '@/lib/admin/admin-context';
import { ArticleForm } from './article-form';
import { PageHeading } from './page-heading';

export function EditArticlePage({ id }: { id: string }) {
  const { articles } = useAdmin();
  const article = articles.find((entry) => entry.id === id);

  if (!article) {
    return notFound();
  }

  return (
    <div>
      <PageHeading title="Edit article" description={`Update content for ${article.title}.`} />
      <ArticleForm article={article} />
    </div>
  );
}
