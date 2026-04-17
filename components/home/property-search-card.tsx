import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

export function PropertySearchCard({ className }: { className?: string }) {
  return (
    <Card className={cn('-mt-8 relative z-10 mx-auto w-full max-w-6xl p-4 sm:-mt-10 sm:p-5 md:-mt-12 md:p-6', className)}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Input placeholder="Location" aria-label="Location" />
        <Select defaultValue="">
          <option value="">Property Type</option>
          <option>Apartment</option>
          <option>Maisonette</option>
          <option>Office</option>
        </Select>
        <Select defaultValue="">
          <option value="">Status</option>
          <option>For Sale</option>
          <option>To Let</option>
        </Select>
        <Button className="w-full">Search</Button>
      </div>
    </Card>
  );
}
