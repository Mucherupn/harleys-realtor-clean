import { siteConfig } from '@/lib/constants/site';
import type { Post } from '@/types/post';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: siteConfig.name,
    slogan: siteConfig.tagline,
    foundingDate: `${siteConfig.establishedYear}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Muthaiga Mini Market, Limuru Road',
      addressLocality: 'Nairobi',
      addressCountry: 'KE'
    },
    email: siteConfig.email,
    telephone: siteConfig.phone
  };
}

export function articleSchema(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: siteConfig.name
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name
    },
    description: post.excerpt
  };
}
