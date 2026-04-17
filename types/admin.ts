export type PropertyPurpose = 'sale' | 'rent';

export interface AdminProperty {
  id: string;
  title: string;
  slug: string;
  purpose: PropertyPurpose;
  propertyType: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  galleryImages: string[];
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  featuredAt: string | null;
}

export interface AdminArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminTeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email?: string;
  phone?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminSettings {
  companyName: string;
  phone: string;
  email: string;
  address: string;
  heroImagePath: string;
  footerSummary: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    x?: string;
  };
  copyrightText: string;
}
