'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Route } from 'next';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

export function PropertySearchCard({ className }: { className?: string }) {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [purpose, setPurpose] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set('location', location.trim().toLowerCase());
    if (purpose.trim()) params.set('purpose', purpose.trim().toLowerCase());
    if (propertyType.trim()) params.set('propertyType', propertyType.trim().toLowerCase());
    router.push(`/properties${params.toString() ? `?${params.toString()}` : ''}` as Route);
  };

  return (
    <Card className={cn('-mt-8 relative z-10 mx-auto w-full max-w-6xl p-3 sm:-mt-10 sm:p-5 md:-mt-12 md:p-6', className)}>
      <form className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" onSubmit={onSubmit}>
        <Input placeholder="Location" aria-label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <Select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
          <option value="">Property Type</option>
          <option value="apartment">Apartment</option><option value="maisonette">Maisonette</option><option value="office">Office</option>
        </Select>
        <Select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
          <option value="">Status</option><option value="sale">For Sale</option><option value="rent">To Let</option>
        </Select>
        <Button className="w-full" type="submit">Search</Button>
      </form>
    </Card>
  );
}
