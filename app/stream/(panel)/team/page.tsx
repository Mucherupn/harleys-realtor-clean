'use client';

import Link from 'next/link';
import { PageHeading } from '@/components/admin/page-heading';
import { StatusPill } from '@/components/admin/status-pill';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/lib/admin/admin-context';

export default function StreamTeamPage() {
  const { teamMembers, toggleTeamMemberPublished, deleteTeamMember } = useAdmin();

  return (
    <div>
      <PageHeading
        title="Team"
        description="Manage published profiles for leadership, advisors, and sales team."
        actions={<Link href="/stream/team/new"><Button>New team member</Button></Link>}
      />

      <div className="overflow-x-auto rounded-xl border border-[#efefef]">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#fafafa] text-[#6b7280]"><tr><th className="px-4 py-3 font-medium">Name</th><th className="px-4 py-3 font-medium">Contact</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Actions</th></tr></thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.id} className="border-t border-[#f1f1f1]">
                <td className="px-4 py-3"><p className="font-medium">{member.name}</p><p className="text-xs text-[#6b7280]">{member.role}</p></td>
                <td className="px-4 py-3"><p>{member.email ?? '—'}</p><p className="text-xs text-[#6b7280]">{member.phone ?? 'No phone'}</p></td>
                <td className="px-4 py-3"><StatusPill label={member.published ? 'Published' : 'Draft'} tone={member.published ? 'success' : 'default'} /></td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/stream/team/${member.id}`}><Button variant="secondary" className="h-9 px-3">Edit</Button></Link>
                    <Button variant="secondary" className="h-9 px-3" onClick={() => toggleTeamMemberPublished(member.id)}>{member.published ? 'Unpublish' : 'Publish'}</Button>
                    <Button variant="ghost" className="h-9 px-3 text-[#b91c1c]" onClick={() => deleteTeamMember(member.id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
