import { EditArticlePage } from '@/components/admin/edit-article-page';

export default async function StreamEditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditArticlePage id={id} />;
}
