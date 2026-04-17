import Link from 'next/link';
import { posts } from '@/lib/queries/public';
import { SectionContainer } from '@/components/ui/section-container';
import { formatDate } from '@/lib/utils/format';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({ title: 'News & Insights', description: 'Editorial insights on Nairobi real estate trends and investment decisions.', path: '/blog' });

export default function BlogPage() {
  return (
    <SectionContainer className="space-y-6 py-12 sm:py-16 md:space-y-8 md:py-20">
      <h1 className="text-3xl font-semibold sm:text-4xl">News & Insights</h1>
      <div className="space-y-4 sm:space-y-5">
        {posts.map((post) => (
          <article key={post.id} className="rounded-xl border border-[#e5e7eb] p-5 sm:p-6">
            <p className="text-xs uppercase tracking-wide text-[#6b7280]">{post.category} • {formatDate(post.publishedAt)}</p>
            <h2 className="mt-2 text-xl font-semibold text-[#111111] sm:text-2xl">{post.title}</h2>
            <p className="mt-2 text-sm leading-7 text-[#6b7280] sm:text-base">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-3 inline-flex text-sm font-semibold text-[#e71212]">Read article →</Link>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}
