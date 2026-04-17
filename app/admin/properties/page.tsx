import Link from 'next/link';

export default function AdminPropertiesPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Manage Properties</h1>
        <Link href="/admin/properties/new" className="text-sm font-semibold text-[#e71212]">Add property</Link>
      </div>
      <p className="text-sm text-[#6b7280]">Property table scaffold ready for Supabase integration.</p>
    </div>
  );
}
