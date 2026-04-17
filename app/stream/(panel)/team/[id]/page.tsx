import { EditTeamPage } from '@/components/admin/edit-team-page';

export default async function StreamEditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EditTeamPage id={id} />;
}
