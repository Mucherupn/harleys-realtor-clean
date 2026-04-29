export function getSafeImageSrc(src?: string | null) {
  if (!src) return '/images/property-placeholder.svg';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  if (src.startsWith('/')) return src;
  return `/images/${src}`;
}
