interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-[#d1d5db] bg-[#f9fafb] p-6 text-center sm:p-10">
      <h3 className="text-base sm:text-lg font-semibold text-[#111111]">{title}</h3>
      <p className="mt-2 text-sm text-[#6b7280]">{description}</p>
    </div>
  );
}
