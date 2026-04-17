import { ContactForm } from '@/components/forms/contact-form';
import { SectionContainer } from '@/components/ui/section-container';
import { siteConfig } from '@/lib/constants/site';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({ title: 'Contact Us', description: 'Reach Harleys Realtor for property sales, lettings, management, and consultancy in Nairobi.', path: '/contact' });

export default function ContactPage() {
  return (
    <SectionContainer className="grid gap-10 py-16 lg:grid-cols-2">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold">Contact Us</h1>
        <p className="text-[#6b7280]">Speak with our Nairobi team for clear guidance and prompt follow-up.</p>
        <p className="text-sm text-[#111111]"><strong>Phone:</strong> {siteConfig.phone}</p>
        <p className="text-sm text-[#111111]"><strong>Email:</strong> {siteConfig.email}</p>
        <p className="text-sm text-[#111111]"><strong>Office:</strong> {siteConfig.location}</p>
      </div>
      <ContactForm />
    </SectionContainer>
  );
}
