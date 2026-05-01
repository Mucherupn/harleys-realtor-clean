import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

type PropertyFiltersProps = {
  defaults: {
    keyword?: string;
    location?: string;
    propertyType?: string;
    purpose?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
  };
};

export function PropertyFilters({ defaults }: PropertyFiltersProps) {
  return (
    <Card className="w-full max-w-full overflow-hidden p-4 sm:p-5 lg:p-6">
      <form action="/properties" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Input name="keyword" placeholder="Keyword" defaultValue={defaults.keyword} aria-label="Keyword" className="w-full" />
        <Input name="location" placeholder="Location" defaultValue={defaults.location} aria-label="Location" className="w-full" />
        <Select name="propertyType" defaultValue={defaults.propertyType} aria-label="Property Type" className="w-full">
          <option value="">Property Type</option>
          <option value="apartment">Apartment</option>
          <option value="maisonette">Maisonette</option>
          <option value="office">Office</option>
        </Select>
        <Select name="purpose" defaultValue={defaults.purpose} aria-label="Purpose" className="w-full">
          <option value="">Status</option>
          <option value="sale">For Sale</option>
          <option value="rent">To Let</option>
        </Select>
        <Input name="minPrice" type="number" min={0} placeholder="Min Price" defaultValue={defaults.minPrice} aria-label="Min Price" className="w-full" />
        <Input name="maxPrice" type="number" min={0} placeholder="Max Price" defaultValue={defaults.maxPrice} aria-label="Max Price" className="w-full" />
        <Input name="bedrooms" type="number" min={0} placeholder="Bedrooms" defaultValue={defaults.bedrooms} aria-label="Bedrooms" className="w-full" />
        <Button type="submit" className="w-full sm:col-span-2 lg:col-span-1">Search</Button>
      </form>
    </Card>
  );
}
