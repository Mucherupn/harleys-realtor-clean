'use client';

import Link from 'next/link';
import { PageHeading } from '@/components/admin/page-heading';
import { StatusPill } from '@/components/admin/status-pill';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/lib/admin/admin-context';

export default function StreamArticlesPage() {
  const { articles, toggleArticlePublished, deleteArticle } = useAdmin();

  return (
    <div>
      <PageHeading
        title="Articles"
        description="Create and manage editorial content for insights and blog pages."
        actions={<Link href="/stream/articles/new"><Button>New article</Button></Link>}
      />

      <div className="overflow-x-auto rounded-xl border border-[#efefef]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#fafafa] text-[#6b7280]"><tr><th className="px-4 py-3 font-medium">Title</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Actions</th></tr></thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-t border-[#f1f1f1]">
                <td className="px-4 py-3"><p className="font-medium">{article.title}</p><p className="text-xs text-[#6b7280]">{article.slug}</p></td>
                <td className="px-4 py-3"><StatusPill label={article.published ? 'Published' : 'Draft'} tone={article.published ? 'success' : 'default'} /></td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/stream/articles/${article.id}`}><Button variant="secondary" className="h-9 px-3">Edit</Button></Link>
                    <Button variant="secondary" className="h-9 px-3" onClick={() => toggleArticlePublished(article.id)}>{article.published ? 'Unpublish' : 'Publish'}</Button>
                    <Button variant="ghost" className="h-9 px-3 text-[#b91c1c]" onClick={() => deleteArticle(article.id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
