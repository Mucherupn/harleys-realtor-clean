export type PropertyStatus = 'for-sale' | 'to-let';

export interface Property {
  id: string;
  slug: string;
  title: string;
  referenceCode?: string;
  location: string;
  neighborhood?: string;
  address?: string;
  price: number;
  currency?: string;
  purpose?: string;
  status: PropertyStatus;
  propertyType: string;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  areaSqFt?: number;
  areaUnit?: string;
  summary: string;
  description?: string;
  features: string[];
  coverImage: string;
  galleryImages: string[];
  featured?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
