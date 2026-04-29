export function getSafeImageSrc(src?: string | null) {
  if (!src) return '/images/property-placeholder.svg';
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  if (src.startsWith('/')) return src;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl) {
    const encodedPath = src
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/');
    return `${supabaseUrl}/storage/v1/object/public/property-images/${encodedPath}`;
  }
  return src;
}
