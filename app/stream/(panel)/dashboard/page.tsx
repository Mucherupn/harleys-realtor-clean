'use client';

import { Card } from '@/components/ui/card';
import { useAdmin } from '@/lib/admin/admin-context';

export default function StreamDashboardPage() {
  const { properties, articles, teamMembers } = useAdmin();
  const featuredCount = properties.filter((property) => property.featured).length;
  const publishedProperties = properties.filter((property) => property.published).length;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#111111]">Overview</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card><p className="text-sm text-[#6b7280]">Total properties</p><p className="text-2xl font-semibold">{properties.length}</p></Card>
        <Card><p className="text-sm text-[#6b7280]">Published properties</p><p className="text-2xl font-semibold">{publishedProperties}</p></Card>
        <Card><p className="text-sm text-[#6b7280]">Featured properties</p><p className="text-2xl font-semibold text-[#e71212]">{featuredCount}/3</p></Card>
        <Card><p className="text-sm text-[#6b7280]">Articles / Team</p><p className="text-2xl font-semibold">{articles.length} / {teamMembers.length}</p></Card>
      </div>
    </div>
  );
}
