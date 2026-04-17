'use client';

import Link from 'next/link';
import { PageHeading } from '@/components/admin/page-heading';
import { StatusPill } from '@/components/admin/status-pill';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/lib/admin/admin-context';

export default function StreamPropertiesPage() {
  const { properties, deleteProperty, togglePropertyFeatured, togglePropertyPublished } = useAdmin();

  return (
    <div>
      <PageHeading
        title="Properties"
        description="Manage listings, publication state, and homepage featured placements."
        actions={<Link href="/stream/properties/new"><Button>Add property</Button></Link>}
      />

      <div className="overflow-x-auto rounded-xl border border-[#efefef]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#fafafa] text-[#6b7280]">
            <tr>
              <th className="px-4 py-3 font-medium">Property</th>
              <th className="px-4 py-3 font-medium">Purpose</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border-t border-[#f1f1f1] align-top">
                <td className="px-4 py-3">
                  <p className="font-medium text-[#111111]">{property.title}</p>
                  <p className="text-xs text-[#6b7280]">{property.location}</p>
                </td>
                <td className="px-4 py-3 capitalize">{property.purpose}</td>
                <td className="px-4 py-3">KES {property.price.toLocaleString()}</td>
                <td className="space-x-1 px-4 py-3">
                  <StatusPill label={property.published ? 'Published' : 'Draft'} tone={property.published ? 'success' : 'default'} />
                  {property.featured ? <StatusPill label="Featured" tone="danger" /> : null}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/stream/properties/${property.id}`}><Button variant="secondary" className="h-9 px-3">Edit</Button></Link>
                    <Button variant="secondary" className="h-9 px-3" onClick={() => togglePropertyPublished(property.id)}>
                      {property.published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button variant="secondary" className="h-9 px-3" onClick={() => togglePropertyFeatured(property.id)}>
                      {property.featured ? 'Unfeature' : 'Feature'}
                    </Button>
                    <Button variant="ghost" className="h-9 px-3 text-[#b91c1c]" onClick={() => deleteProperty(property.id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
