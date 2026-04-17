import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export function PropertySearchCard() {
  return (
    <Card className="-mt-16 relative z-10 mx-auto max-w-6xl p-4 md:p-6">
      <div className="grid gap-3 md:grid-cols-4">
        <Input placeholder="Location" aria-label="Location" />
        <Select defaultValue=""><option value="">Property Type</option><option>Apartment</option><option>Maisonette</option><option>Office</option></Select>
        <Select defaultValue=""><option value="">Status</option><option>For Sale</option><option>To Let</option></Select>
        <Button>Search</Button>
      </div>
    </Card>
  );
}
