import Link from "next/link";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { agents } from "@/lib/queries/public";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Harleys Realtor, a Nairobi based real estate firm established in 2019 and focused on sales, lettings, property management, and consultancy.",
  path: "/about",
});

export default function AboutPage() {
  const teamMembers = Array.isArray(agents) ? agents : [];

  return (
    <>
      <section className="relative overflow-hidden border-b border-neutral-200 bg-[#111111] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(231,18,18,0.16),transparent_24%)]" />

        <SectionContainer className="relative py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">
              About Harleys Realtor
            </p>

          

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/properties"
                className="rounded-md bg-[#e71212] px-6 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-[#cf1010]"
              >
                View Properties
              </Link>

              <Link
                href="/contact"
                className="rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
              >
                Speak With Us
              </Link>
            </div>
          </div>
        </SectionContainer>
      </section>

      <SectionContainer className="py-18 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Who We Are"
              title="A real estate firm built for clear, confident decisions."
              description="We focus on practical delivery across Nairobi real estate, helping clients move with better information, stronger execution, and a service experience grounded in responsiveness and accountability."
            />

            <div className="mt-8 space-y-5 text-[15px] leading-8 text-neutral-600">
              <p>
                Since 2019, Harleys Realtor has served clients across the Nairobi
                property market with an approach centered on clarity,
                professionalism, and tailored support. We work across property
                sales, lettings, property management, and consultancy, helping
                clients navigate each stage of the process with greater confidence.
              </p>

              <p>
                Our strength lies in combining market understanding with practical
                execution. Whether a client is selling, letting, buying,
                investing, or seeking management support, our role is to simplify
                complexity, protect value, and keep the process moving with
                discipline and care.
              </p>

              <p>
                We believe real estate service should feel measured, informed, and
                dependable. That means clear communication, thoughtful advice, and
                a team that remains attentive to the commercial and personal
                importance of every property decision.
              </p>
            </div>
          </div>

          <Card className="rounded-3xl border border-neutral-200 bg-neutral-50 p-7 md:p-8">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#e71212]">
              Company Snapshot
            </p>

            <div className="mt-6 space-y-5">
              <div className="border-b border-neutral-200 pb-4">
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                  Established
                </p>
                <p className="mt-2 text-lg font-semibold text-neutral-900">2019</p>
              </div>

              <div className="border-b border-neutral-200 pb-4">
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                  Based In
                </p>
                <p className="mt-2 text-lg font-semibold text-neutral-900">
                  Nairobi, Kenya
                </p>
              </div>

              <div className="border-b border-neutral-200 pb-4">
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                  Core Focus
                </p>
                <p className="mt-2 text-lg font-semibold text-neutral-900">
                  Sales, Lettings, Management, Consultancy
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                  Promise
                </p>
                <p className="mt-2 text-lg font-semibold text-neutral-900">
                  Practical service with market discipline
                </p>
              </div>
            </div>
          </Card>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-neutral-50 py-18 md:py-24">
        <SectionHeading
          eyebrow="What Guides Us"
          title="The standards behind the work."
          description="A premium real estate brand is shaped not only by listings and transactions, but by the quality of judgment behind every client interaction."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Card className="rounded-3xl border border-neutral-200 bg-white p-7">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#e71212]">
              Mission
            </p>
            <h3 className="mt-4 text-xl font-semibold text-neutral-900">
              Clear real estate outcomes
            </h3>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              To deliver credible, responsive, and accountable real estate service
              across sales, lettings, property management, and advisory work.
            </p>
          </Card>

          <Card className="rounded-3xl border border-neutral-200 bg-white p-7">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#e71212]">
              Values
            </p>
            <h3 className="mt-4 text-xl font-semibold text-neutral-900">
              Integrity, precision, responsiveness
            </h3>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              We value honest communication, measured execution, attention to
              detail, and service that respects both the client and the asset.
            </p>
          </Card>

          <Card className="rounded-3xl border border-neutral-200 bg-white p-7">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#e71212]">
              Why Harleys
            </p>
            <h3 className="mt-4 text-xl font-semibold text-neutral-900">
              Nairobi knowledge with tailored support
            </h3>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              Clients work with Harleys Realtor for market awareness, practical
              guidance, tailored service, and a process that stays focused from
              start to finish.
            </p>
          </Card>
        </div>
      </SectionContainer>

      <SectionContainer className="py-18 md:py-24">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-3xl bg-[#111111] p-8 text-white md:p-10">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#e71212]">
              Leadership
            </p>

            <h2 className="mt-4 text-3xl font-medium leading-tight">
              Led with professional focus.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/78">
              Harleys Realtor is led by a professional, client focused approach
              grounded in market understanding, responsiveness, and practical
              execution across Nairobi real estate.
            </p>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-lg font-semibold">Justus Kimathi</p>
              <p className="mt-1 text-sm text-white/70">CEO</p>
            </div>
          </Card>

          <div>
            <SectionHeading
              eyebrow="People"
              title="The team behind the advisory."
              description="A strong real estate brand is built by people who understand the importance of timing, communication, and disciplined follow through."
            />

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {teamMembers.length > 0 ? (
                teamMembers.map((agent, index) => (
                  <Card
                    key={agent?.id ?? index}
                    className="rounded-2xl border border-neutral-200 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h4 className="text-lg font-semibold text-neutral-900">
                      {agent?.name ?? "Team Member"}
                    </h4>
                    <p className="mt-2 text-sm text-neutral-500">
                      {agent?.role ?? "Harleys Realtor"}
                    </p>
                  </Card>
                ))
              ) : (
                <>
                  <Card className="rounded-2xl border border-neutral-200 p-6">
                    <h4 className="text-lg font-semibold text-neutral-900">
                      Advisory Team
                    </h4>
                    <p className="mt-2 text-sm text-neutral-500">
                      Sales, lettings, and client support
                    </p>
                  </Card>
                  <Card className="rounded-2xl border border-neutral-200 p-6">
                    <h4 className="text-lg font-semibold text-neutral-900">
                      Management Team
                    </h4>
                    <p className="mt-2 text-sm text-neutral-500">
                      Property operations and service delivery
                    </p>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer className="bg-neutral-50 py-18 md:py-24">
        <SectionHeading
          eyebrow="Approach"
          title="How we work with clients."
          description="Our process is built around clarity, market understanding, and steady execution."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Card className="rounded-3xl border border-neutral-200 bg-white p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e71212]/10 text-sm font-semibold text-[#e71212]">
              01
            </div>
            <h3 className="mt-5 text-xl font-semibold text-neutral-900">
              Understand the brief
            </h3>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              We begin by understanding the asset, the client’s priorities, and
              the commercial reality around the assignment.
            </p>
          </Card>

          <Card className="rounded-3xl border border-neutral-200 bg-white p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e71212]/10 text-sm font-semibold text-[#e71212]">
              02
            </div>
            <h3 className="mt-5 text-xl font-semibold text-neutral-900">
              Advise with context
            </h3>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              We apply local market understanding to pricing, positioning,
              negotiation, and service recommendations.
            </p>
          </Card>

          <Card className="rounded-3xl border border-neutral-200 bg-white p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e71212]/10 text-sm font-semibold text-[#e71212]">
              03
            </div>
            <h3 className="mt-5 text-xl font-semibold text-neutral-900">
              Execute with discipline
            </h3>
            <p className="mt-3 text-sm leading-7 text-neutral-600">
              From marketing and tenant handling to negotiation and management
              support, our focus stays on timely, dependable delivery.
            </p>
          </Card>
        </div>
      </SectionContainer>

      <SectionContainer className="py-18 md:py-24">
        <Card className="rounded-[32px] bg-[#111111] px-8 py-10 text-center text-white md:px-12 md:py-14">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#e71212]">
            Start the conversation
          </p>

          <h3 className="mt-4 text-3xl font-medium leading-tight md:text-4xl">
            Let’s discuss your next property move.
          </h3>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/72">
            Whether you are selling, letting, buying, investing, or seeking
            management support, our team is ready to help you move with more
            clarity.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="rounded-md bg-[#e71212] px-6 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-[#cf1010]"
            >
              Contact Our Team
            </Link>

            <Link
              href="/properties"
              className="rounded-md border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Browse Properties
            </Link>
          </div>
        </Card>
      </SectionContainer>
    </>
  );
}