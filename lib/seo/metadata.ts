import type { Metadata } from 'next';
import { siteConfig } from '@/lib/constants/site';

export function buildMetadata({
  title,
  description,
  path = ''
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const pageTitle = `${title} | ${siteConfig.name}`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: pageTitle,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      locale: 'en_KE',
      type: 'website'
    },
    alternates: {
      canonical: path || '/'
    }
  };
}
