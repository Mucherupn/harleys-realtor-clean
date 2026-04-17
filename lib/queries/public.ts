import type { Agent } from '@/types/agent';
import type { FocusLocation } from '@/types/location';
import type { Post } from '@/types/post';
import type { Property } from '@/types/property';
import type { Service } from '@/types/service';

export const services: Service[] = [
  {
    slug: 'letting-and-sales',
    title: 'Letting and Sales',
    description:
      'End-to-end support for landlords, sellers, and buyers with local market intelligence, disciplined negotiation, and high-quality listing presentation.',
    capabilities: [
      'Rental and sale pricing strategy based on neighborhood demand',
      'Professional marketing and qualified buyer or tenant matching',
      'Viewings management, offers review, and negotiation support',
      'Documentation guidance through close'
    ],
    process: ['Brief and property review', 'Pricing and marketing launch', 'Viewings and lead qualification', 'Negotiation and completion']
  },
  {
    slug: 'property-management',
    title: 'Property Management',
    description:
      'Operational management for residential and mixed-use property portfolios with strong tenant screening, rent collection discipline, and maintenance oversight.',
    capabilities: [
      'Tenant sourcing and screening',
      'Lease administration and rent collection tracking',
      'Routine inspections and maintenance coordination',
      'Owner reporting and compliance follow-up'
    ],
    process: ['Portfolio onboarding', 'Tenant and lease setup', 'Operations and maintenance control', 'Monthly reporting and optimization']
  },
  {
    slug: 'consultancy',
    title: 'Consultancy',
    description:
      'Strategic advisory for acquisition, disposal, and portfolio decisions in Nairobi, including valuations, market studies, and investment feasibility support.',
    capabilities: [
      'Comparative market analysis and valuation support',
      'Investment feasibility and yield assessment',
      'Negotiation strategy and risk review',
      'Portfolio positioning advice'
    ],
    process: ['Objective setting', 'Research and analysis', 'Recommendation delivery', 'Decision support']
  }
];

export const featuredProperties: Property[] = [
  {
    id: '1',
    slug: 'five-bedroom-maisonette-runda',
    title: 'Five Bedroom Maisonette in Runda',
    location: 'Runda, Nairobi',
    price: 75000000,
    status: 'for-sale',
    propertyType: 'Maisonette',
    bedrooms: 5,
    bathrooms: 5,
    areaSqFt: 5200,
    summary: 'A private family residence with expansive garden space and excellent road access.',
    features: ['DSQ', 'Mature garden', 'Backup power', 'Perimeter wall'],
    coverImage: '/images/property-placeholder.jpg'
  },
  {
    id: '2',
    slug: 'executive-three-bedroom-apartment-kilimani',
    title: 'Executive Three Bedroom Apartment in Kilimani',
    location: 'Kilimani, Nairobi',
    price: 220000,
    status: 'to-let',
    propertyType: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: 1850,
    summary: 'Modern apartment with city views, gym access, and a practical layout for professionals.',
    features: ['Gym', 'Rooftop terrace', 'Borehole water', 'Two parking bays'],
    coverImage: '/images/property-placeholder.jpg'
  },
  {
    id: '3',
    slug: 'grade-a-office-suite-westlands',
    title: 'Grade A Office Suite in Westlands',
    location: 'Westlands, Nairobi',
    price: 330000,
    status: 'to-let',
    propertyType: 'Office',
    summary: 'Flexible office floorplate with efficient access to Waiyaki Way and CBD routes.',
    features: ['Backup generator', 'Access control', 'High-speed internet ready'],
    coverImage: '/images/property-placeholder.jpg'
  }
];

export const focusLocations: FocusLocation[] = [
  { name: 'Westlands', summary: 'Commercial and mixed-use demand with strong rental depth.' },
  { name: 'Kilimani', summary: 'Consistent apartment turnover and investor appeal.' },
  { name: 'Runda', summary: 'High-trust family residences and diplomatic demand.' },
  { name: 'Lavington', summary: 'Premium residential stock with stable occupancy profiles.' }
];

export const posts: Post[] = [
  {
    id: '1',
    slug: 'nairobi-rental-demand-outlook-2026',
    title: 'Nairobi Rental Demand Outlook for 2026',
    excerpt: 'What landlords should prioritize as tenant expectations shift in key Nairobi neighborhoods.',
    content:
      'Rental activity remains healthy in Nairobi where access to transport, reliable water, and security continue to define tenant decisions. Landlords that maintain responsive property management and transparent lease terms are seeing better retention and fewer vacancy periods.',
    category: 'Market Insight',
    publishedAt: '2026-02-11',
    author: 'Harleys Research Desk'
  },
  {
    id: '2',
    slug: 'how-to-price-a-home-for-sale-in-nairobi',
    title: 'How to Price a Home for Sale in Nairobi',
    excerpt: 'A practical framework for setting a realistic asking price while protecting value.',
    content:
      'A strong sale starts with objective market evidence. Sellers should benchmark against recent comparable transactions, current competing listings, and condition-specific adjustments. Accurate pricing at launch improves buyer confidence and negotiation outcomes.',
    category: 'Sales',
    publishedAt: '2026-01-20',
    author: 'Harleys Sales Team'
  }
];

export const agents: Agent[] = [
  {
    id: '1',
    slug: 'harley-mutiso',
    name: 'Harley Mutiso',
    role: 'Managing Director',
    bio: 'Leads strategic growth and client advisory for sales and investment mandates across Nairobi.',
    focus: 'Sales Advisory',
    email: 'info@harleysrealtor.co.ke'
  },
  {
    id: '2',
    slug: 'joyce-wanjiru',
    name: 'Joyce Wanjiru',
    role: 'Head of Property Management',
    bio: 'Oversees property operations, tenant service standards, and owner reporting programs.',
    focus: 'Property Management',
    email: 'info@harleysrealtor.co.ke'
  }
];
