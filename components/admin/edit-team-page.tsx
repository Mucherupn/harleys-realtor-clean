'use client';

import { notFound } from 'next/navigation';
import { useAdmin } from '@/lib/admin/admin-context';
import { PageHeading } from './page-heading';
import { TeamForm } from './team-form';

export function EditTeamPage({ id }: { id: string }) {
  const { teamMembers } = useAdmin();
  const member = teamMembers.find((entry) => entry.id === id);

  if (!member) {
    return notFound();
  }

  return (
    <div>
      <PageHeading title="Edit team member" description={`Update profile for ${member.name}.`} />
      <TeamForm member={member} />
    </div>
  );
}
