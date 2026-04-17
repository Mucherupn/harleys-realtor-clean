import { ContactForm } from '@/components/forms/contact-form';
import { SectionContainer } from '@/components/ui/section-container';
import { siteConfig } from '@/lib/constants/site';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({ title: 'Contact Us', description: 'Reach Harleys Realtor for property sales, lettings, management, and consultancy in Nairobi.', path: '/contact' });

export default function ContactPage() {
  return (
    <SectionContainer className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-10 lg:py-20">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold sm:text-4xl">Contact Us</h1>
        <p className="text-sm leading-7 text-[#6b7280] sm:text-base">Speak with our Nairobi team for clear guidance and prompt follow-up.</p>
        <p className="text-sm text-[#111111]"><strong>Phone:</strong> {siteConfig.phone}</p>
        <p className="text-sm break-all text-[#111111]"><strong>Email:</strong> {siteConfig.email}</p>
        <p className="text-sm text-[#111111]"><strong>Office:</strong> {siteConfig.location}</p>
      </div>
      <ContactForm />
    </SectionContainer>
  );
}
