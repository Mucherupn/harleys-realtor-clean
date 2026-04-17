import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/about', '/services', '/properties', '/contact', '/request-quote', '/blog'];
  return pages.map((path) => ({ url: `${siteConfig.url}${path}`, lastModified: new Date() }));
}
