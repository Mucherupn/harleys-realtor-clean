import { PageHeading } from '@/components/admin/page-heading';
import { TeamForm } from '@/components/admin/team-form';

export default function StreamNewTeamMemberPage() {
  return (
    <div>
      <PageHeading title="New team member" description="Add team profile details and control publication status." />
      <TeamForm />
    </div>
  );
}
