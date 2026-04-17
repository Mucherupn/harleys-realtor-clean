import Link from 'next/link';

export default function AdminBlogPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Manage Blog</h1>
        <Link href="/admin/blog/new" className="text-sm font-semibold text-[#e71212]">New post</Link>
      </div>
      <p className="text-sm text-[#6b7280]">Editorial table scaffold ready for CMS wiring.</p>
    </div>
  );
}
