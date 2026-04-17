export type PropertyStatus = 'for-sale' | 'to-let';

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  status: PropertyStatus;
  propertyType: 'Apartment' | 'Townhouse' | 'Maisonette' | 'Office';
  bedrooms?: number;
  bathrooms?: number;
  areaSqFt?: number;
  summary: string;
  features: string[];
  coverImage: string;
}
