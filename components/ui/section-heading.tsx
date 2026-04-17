import { Badge } from '@/components/ui/badge';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl space-y-3">
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-[#111111] md:text-4xl">{title}</h2>
      {description ? <p className="text-base text-[#6b7280] md:text-lg">{description}</p> : null}
    </div>
  );
}
