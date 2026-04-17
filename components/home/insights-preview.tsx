import Link from 'next/link';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeading } from '@/components/ui/section-heading';
import { posts } from '@/lib/queries/public';
import { formatDate } from '@/lib/utils/format';

export function InsightsPreview() {
  return (
    <SectionContainer className="mt-20 space-y-8">
      <SectionHeading eyebrow="Insights" title="Recent market thinking" />
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.id} className="rounded-xl border border-[#e5e7eb] p-6">
            <p className="text-xs uppercase tracking-wide text-[#6b7280]">{post.category} • {formatDate(post.publishedAt)}</p>
            <h3 className="mt-2 text-xl font-semibold text-[#111111]">{post.title}</h3>
            <p className="mt-2 text-sm text-[#6b7280]">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-3 inline-flex text-sm font-semibold text-[#e71212]">Read article →</Link>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}
