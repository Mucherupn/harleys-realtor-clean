import { PageHeading } from '@/components/admin/page-heading';

export default function StreamMediaPage() {
  return (
    <div className="space-y-4">
      <PageHeading title="Media" description="Media library scaffold for future file upload and organization workflows." />
      <div className="rounded-xl border border-dashed border-[#d7d7d7] bg-[#fafafa] p-6">
        <p className="text-sm text-[#6b7280]">
          Upload and media processing are intentionally deferred to Supabase storage integration. This scaffold is ready for wiring.
        </p>
      </div>
    </div>
  );
}
