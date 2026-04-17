import { Card } from '@/components/ui/card';

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-16">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><p className="text-sm text-[#6b7280]">Total Properties</p><p className="text-2xl font-semibold">0</p></Card>
        <Card><p className="text-sm text-[#6b7280]">New Inquiries</p><p className="text-2xl font-semibold">0</p></Card>
        <Card><p className="text-sm text-[#6b7280]">Quote Requests</p><p className="text-2xl font-semibold">0</p></Card>
      </div>
    </div>
  );
}
