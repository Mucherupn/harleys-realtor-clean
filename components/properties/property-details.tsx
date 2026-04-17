import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils/format';

export function PropertyDetails({ property }: { property: Property }) {
  return (
    <section className="space-y-6 sm:space-y-8">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#f3f4f6]">
        <Image src={property.coverImage} alt={property.title} fill className="object-cover" sizes="(min-width: 1024px) 66vw, 100vw" />
      </div>
      <div className="space-y-4">
        <Badge>{property.status === 'for-sale' ? 'For Sale' : 'To Let'}</Badge>
        <h1 className="text-2xl font-semibold text-[#111111] sm:text-3xl">{property.title}</h1>
        <p className="text-sm text-[#6b7280] sm:text-base">{property.location} • {property.propertyType}</p>
        <p className="text-2xl font-semibold text-[#111111] sm:text-3xl">{formatPrice(property.price)}</p>
        <p className="text-sm leading-7 text-[#6b7280] sm:text-base">{property.summary}</p>
        <div>
          <h2 className="text-xl font-semibold text-[#111111]">Features</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-[#6b7280] sm:text-base">
            {property.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
