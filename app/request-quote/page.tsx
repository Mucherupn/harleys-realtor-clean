import { QuoteForm } from '@/components/forms/quote-form';
import { SectionContainer } from '@/components/ui/section-container';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata = buildMetadata({ title: 'Request Quote', description: 'Submit a service quote request for management, lettings, sales, or consultancy support.', path: '/request-quote' });

export default function RequestQuotePage() {
  return (
    <SectionContainer className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-10 lg:py-20">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold sm:text-4xl">Request Quote</h1>
        <p className="text-sm leading-7 text-[#6b7280] sm:text-base">Share your requirements and our team will return with a tailored scope and fee guidance.</p>
      </div>
      <QuoteForm />
    </SectionContainer>
  );
}
