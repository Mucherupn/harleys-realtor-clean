export const siteConfig = {
  name: 'Harleys Realtor',
  tagline: 'Turning dreams into addresses',
  description:
    'Harleys Realtor is a Nairobi-based real estate firm delivering property sales, lettings, property management, and consultancy with disciplined local execution.',
  url: 'https://www.harleysrealtor.co.ke',
  phone: '0732364851',
  email: 'info@harleysrealtor.co.ke',
  location: 'Muthaiga Mini Market, Limuru Road, Nairobi',
  establishedYear: 2019,
  social: {
    linkedin: '#',
    instagram: '#'
  }
} as const;

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/properties', label: 'Properties' },
  { href: '/contact', label: 'Contact' }
] as const;
