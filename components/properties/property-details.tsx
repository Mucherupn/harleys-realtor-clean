import { Badge } from '@/components/ui/badge';
import type { Property } from '@/types/property';
import { formatPrice } from '@/lib/utils/format';

export function PropertyDetails({ property }: { property: Property }) {
  return (
    <section className="space-y-8">
      <div className="h-72 rounded-xl bg-[#f3f4f6] md:h-96" />
      <div className="space-y-4">
        <Badge>{property.status === 'for-sale' ? 'For Sale' : 'To Let'}</Badge>
        <h1 className="text-3xl font-semibold text-[#111111]">{property.title}</h1>
        <p className="text-[#6b7280]">{property.location} • {property.propertyType}</p>
        <p className="text-3xl font-semibold text-[#111111]">{formatPrice(property.price)}</p>
        <p className="text-[#6b7280]">{property.summary}</p>
        <div>
          <h2 className="text-xl font-semibold text-[#111111]">Features</h2>
          <ul className="mt-3 list-disc space-y-1 pl-6 text-[#6b7280]">
            {property.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
