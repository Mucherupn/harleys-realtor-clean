import { notFound } from 'next/navigation';
import { posts } from '@/lib/queries/public';
import { SectionContainer } from '@/components/ui/section-container';
import { formatDate } from '@/lib/utils/format';
import { articleSchema } from '@/lib/seo/schema';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <SectionContainer className="max-w-3xl space-y-5 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }} />
      <p className="text-xs uppercase tracking-wide text-[#6b7280]">{post.category} • {formatDate(post.publishedAt)}</p>
      <h1 className="text-4xl font-semibold">{post.title}</h1>
      <p className="text-[#6b7280]">{post.content}</p>
    </SectionContainer>
  );
}
