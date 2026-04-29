import Link from 'next/link';
import { Bath, BedDouble, Car, MapPin, Ruler } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils/format';
import { PropertyGallery } from '@/components/properties/property-gallery';

export function PropertyDetails({ property }: { property: Property }) {
  const description =
    property.description?.trim() ||
    property.summary?.trim() ||
    'More information about this property will be available soon.';

  const facts = [
    { label: 'Reference Code', value: property.referenceCode },
    { label: 'Property Type', value: property.propertyType },
    { label: 'Purpose', value: property.status === 'for-sale' ? 'For Sale' : 'To Let' },
    { label: 'Status', value: property.status === 'for-sale' ? 'Available for sale' : 'Available to let' },
    { label: 'Location', value: property.location },
    { label: 'Neighborhood', value: property.neighborhood },
    { label: 'Address', value: property.address },
    { label: 'Bedrooms', value: property.bedrooms ? String(property.bedrooms) : undefined },
    { label: 'Bathrooms', value: property.bathrooms ? String(property.bathrooms) : undefined },
    { label: 'Parking Spaces', value: property.parkingSpaces ? String(property.parkingSpaces) : undefined },
    { label: 'Area Size', value: property.areaSqFt ? String(property.areaSqFt) : undefined },
    { label: 'Area Unit', value: property.areaUnit },
  ].filter((fact) => Boolean(fact.value));

  return (
    <section className="space-y-8 sm:space-y-10">
      <Link href="/properties" className="inline-flex text-sm font-medium text-[#4b5563] hover:text-[#111111]">
        ← Back to properties
      </Link>

      <PropertyGallery title={property.title} images={property.galleryImages} />

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{property.status === 'for-sale' ? 'For Sale' : 'To Let'}</Badge>
          <span className="inline-flex items-center rounded-full border border-[#d9dee6] bg-white px-3 py-1 text-xs font-medium text-[#4b5563]">{property.propertyType}</span>
        </div>
        <h1 className="text-2xl font-semibold text-[#111111] sm:text-3xl lg:text-4xl">{property.title}</h1>
        <p className="flex items-center gap-2 text-sm text-[#5f6876] sm:text-base">
          <MapPin size={16} /> {property.location}
        </p>
        <p className="text-2xl font-semibold text-[#111111] sm:text-3xl">{formatPrice(property.price)}</p>

        <div className="flex flex-wrap gap-x-5 gap-y-2 border-y border-[#e7ebf0] py-3 text-sm text-[#4b5563]">
          {property.bedrooms ? <span className="inline-flex items-center gap-1.5"><BedDouble size={16} />{property.bedrooms} Bedrooms</span> : null}
          {property.bathrooms ? <span className="inline-flex items-center gap-1.5"><Bath size={16} />{property.bathrooms} Bathrooms</span> : null}
          {property.parkingSpaces ? <span className="inline-flex items-center gap-1.5"><Car size={16} />{property.parkingSpaces} Parking</span> : null}
          {property.areaSqFt ? <span className="inline-flex items-center gap-1.5"><Ruler size={16} />{property.areaSqFt} {property.areaUnit ?? 'sq ft'}</span> : null}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-[#111111]">Description</h2>
        <p className="whitespace-pre-line text-base leading-8 text-[#4b5563]">{description}</p>
      </div>

      {property.features.length > 0 ? (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-[#111111]">Key Features & Amenities</h2>
          <ul className="grid gap-2 text-sm text-[#4b5563] sm:grid-cols-2">
            {property.features.map((feature) => (
              <li key={feature} className="rounded-lg border border-[#e7ebf0] px-3 py-2">{feature}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#111111]">Property Facts</h2>
        <dl className="grid gap-3 rounded-xl border border-[#e5e7eb] bg-white p-4 sm:grid-cols-2 sm:p-5">
          {facts.map((fact) => (
            <div key={fact.label} className="rounded-lg border border-[#eef1f4] px-3 py-2">
              <dt className="text-xs uppercase tracking-wide text-[#8a92a0]">{fact.label}</dt>
              <dd className="mt-1 text-sm font-medium text-[#111111]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-xl border border-dashed border-[#d6dbe3] bg-[#fafbfc] p-4 text-sm text-[#647082]">
        Similar properties will appear here soon.
      </div>
    </section>
  );
}
