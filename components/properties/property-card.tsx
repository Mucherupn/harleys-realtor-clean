import Link from 'next/link';
import { BedDouble, Bath, Ruler } from 'lucide-react';
import type { Property } from '@/types/property';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils/format';

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="space-y-4 p-0 overflow-hidden">
      <div className="h-48 bg-[#f3f4f6]" />
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <Badge>{property.status === 'for-sale' ? 'For Sale' : 'To Let'}</Badge>
          <p className="text-sm text-[#6b7280]">{property.propertyType}</p>
        </div>
        <h3 className="text-lg font-semibold text-[#111111]">{property.title}</h3>
        <p className="text-sm text-[#6b7280]">{property.location}</p>
        <p className="text-xl font-semibold text-[#111111]">{formatPrice(property.price)}</p>
        <div className="flex gap-4 text-xs text-[#6b7280]">
          {property.bedrooms ? <span className="inline-flex items-center gap-1"><BedDouble size={14} /> {property.bedrooms} Beds</span> : null}
          {property.bathrooms ? <span className="inline-flex items-center gap-1"><Bath size={14} /> {property.bathrooms} Baths</span> : null}
          {property.areaSqFt ? <span className="inline-flex items-center gap-1"><Ruler size={14} /> {property.areaSqFt} sq ft</span> : null}
        </div>
        <Link href={`/properties/${property.slug}`} className="text-sm font-semibold text-[#e71212]">View details →</Link>
      </div>
    </Card>
  );
}
