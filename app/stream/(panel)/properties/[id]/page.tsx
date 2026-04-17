import { EditPropertyPage } from '@/components/admin/edit-property-page';

export default async function StreamEditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditPropertyPage id={id} />;
}
