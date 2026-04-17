import { QuoteForm } from '@/components/forms/quote-form';
import { SectionContainer } from '@/components/ui/section-container';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({ title: 'Request Quote', description: 'Submit a service quote request for management, lettings, sales, or consultancy support.', path: '/request-quote' });

export default function RequestQuotePage() {
  return (
    <SectionContainer className="grid gap-10 py-16 lg:grid-cols-2">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold">Request Quote</h1>
        <p className="text-[#6b7280]">Share your requirements and our team will return with a tailored scope and fee guidance.</p>
      </div>
      <QuoteForm />
    </SectionContainer>
  );
}
