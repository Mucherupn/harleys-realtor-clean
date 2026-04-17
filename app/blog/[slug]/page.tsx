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
    <SectionContainer className="max-w-4xl space-y-5 py-12 sm:space-y-6 sm:py-16 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }} />
      <p className="text-xs uppercase tracking-wide text-[#6b7280]">{post.category} • {formatDate(post.publishedAt)}</p>
      <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">{post.title}</h1>
      <p className="text-sm leading-8 text-[#6b7280] sm:text-base">{post.content}</p>
    </SectionContainer>
  );
}
