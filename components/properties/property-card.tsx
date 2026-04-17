import Link from 'next/link';
import { BedDouble, Bath, Ruler } from 'lucide-react';
import type { Property } from '@/types/property';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils/format';

export function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="group overflow-hidden rounded-2xl border-[#e6eaf0] p-0 shadow-[0_8px_24px_rgba(17,17,17,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(17,17,17,0.12)]">
      <div className="relative h-52 bg-[linear-gradient(145deg,#f7f8fa,#eceff3)]">
        <div className="absolute left-4 top-4">
          <Badge>{property.status === 'for-sale' ? 'For Sale' : 'To Let'}</Badge>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a92a0]">{property.propertyType}</p>
          <p className="text-xl font-semibold text-[#111111]">{formatPrice(property.price)}</p>
        </div>
        <h3 className="text-xl font-semibold leading-tight text-[#111111]">{property.title}</h3>
        <p className="text-sm text-[#616977]">{property.location}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 border-y border-[#edf0f4] py-3 text-xs text-[#6b7280]">
          {property.bedrooms ? (
            <span className="inline-flex items-center gap-1">
              <BedDouble size={14} /> {property.bedrooms} Beds
            </span>
          ) : null}
          {property.bathrooms ? (
            <span className="inline-flex items-center gap-1">
              <Bath size={14} /> {property.bathrooms} Baths
            </span>
          ) : null}
          {property.areaSqFt ? (
            <span className="inline-flex items-center gap-1">
              <Ruler size={14} /> {property.areaSqFt} sq ft
            </span>
          ) : null}
        </div>
        <Link
          href={`/properties/${property.slug}`}
          className="inline-flex items-center text-sm font-semibold text-[#c01717] transition-colors hover:text-[#8f1010]"
        >
          View details →
        </Link>
      </div>
    </Card>
  );
}
