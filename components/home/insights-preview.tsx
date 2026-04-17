import Link from 'next/link';
import { SectionContainer } from '@/components/ui/section-container';
import { SectionHeading } from '@/components/ui/section-heading';
import { posts } from '@/lib/queries/public';
import { formatDate } from '@/lib/utils/format';

export function InsightsPreview() {
  const [featuredPost, ...otherPosts] = posts;

  return (
    <section className="mt-20 bg-[#fbfbfc] py-18 md:py-24">
      <SectionContainer className="space-y-10">
        <SectionHeading
          eyebrow="Insights"
          title="Nairobi Property Journal"
          description="Clear market intelligence, pricing perspectives, and strategic guidance for high-value real estate decisions."
          action={
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-[#d9dde5] px-5 py-2 text-sm font-semibold text-[#1c2430] transition-colors hover:border-[#111111]"
            >
              View All Insights
            </Link>
          }
        />
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          {featuredPost ? (
            <article className="rounded-2xl border border-[#dde2ea] bg-white p-8 shadow-[0_10px_28px_rgba(17,17,17,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b92a0]">
                {featuredPost.category} · {formatDate(featuredPost.publishedAt)}
              </p>
              <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#111111]">{featuredPost.title}</h3>
              <p className="mt-4 text-base leading-7 text-[#5f6773]">{featuredPost.excerpt}</p>
              <p className="mt-4 text-sm font-medium text-[#707887]">By {featuredPost.author}</p>
              <Link href={`/blog/${featuredPost.slug}`} className="mt-8 inline-flex text-sm font-semibold text-[#a41414]">
                Read full article →
              </Link>
            </article>
          ) : null}
          <div className="space-y-4">
            {otherPosts.map((post) => (
              <article key={post.id} className="rounded-2xl border border-[#e2e6ec] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8b92a0]">
                  {post.category} · {formatDate(post.publishedAt)}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[#111111]">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5f6773]">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-3 inline-flex text-sm font-semibold text-[#a41414]">
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
