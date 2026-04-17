import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center md:px-6">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 text-[#6b7280]">The page you are looking for does not exist or has moved.</p>
      <Link href="/" className="mt-6 inline-flex text-sm font-semibold text-[#e71212]">Back to home</Link>
    </div>
  );
}
