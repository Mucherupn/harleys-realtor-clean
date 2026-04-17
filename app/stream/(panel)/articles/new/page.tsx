import { ArticleForm } from '@/components/admin/article-form';
import { PageHeading } from '@/components/admin/page-heading';

export default function StreamNewArticlePage() {
  return (
    <div>
      <PageHeading title="New article" description="Write an article and keep it in draft or publish immediately." />
      <ArticleForm />
    </div>
  );
}
