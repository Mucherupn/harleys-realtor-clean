import Link from 'next/link';
import { posts } from '@/lib/queries/public';
import { SectionContainer } from '@/components/ui/section-container';
import { formatDate } from '@/lib/utils/format';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({ title: 'News & Insights', description: 'Editorial insights on Nairobi real estate trends and investment decisions.', path: '/blog' });

export default function BlogPage() {
  return (
    <SectionContainer className="space-y-8 py-16">
      <h1 className="text-4xl font-semibold">News & Insights</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="rounded-xl border border-[#e5e7eb] p-6">
            <p className="text-xs uppercase tracking-wide text-[#6b7280]">{post.category} • {formatDate(post.publishedAt)}</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#111111]">{post.title}</h2>
            <p className="mt-2 text-[#6b7280]">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-3 inline-flex text-sm font-semibold text-[#e71212]">Read article →</Link>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}
