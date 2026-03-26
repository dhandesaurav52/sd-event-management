'use client';

import { Button, Input, TextArea } from '@/components/ui';
import { useState } from 'react';

type TeamMember = { id: string; name: string; role: string; bio: string | null };

export function TeamManager({ initial }: { initial: TeamMember[] }) {
  const [members, setMembers] = useState(initial);

  async function addMember(formData: FormData) {
    const payload = {
      name: formData.get('name'),
      role: formData.get('role'),
      bio: formData.get('bio')
    };
    const res = await fetch('/api/team', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) setMembers((prev) => [...prev, await res.json()]);
  }

  return (
    <div className="space-y-6">
      <form action={addMember} className="space-y-2 rounded border p-4">
        <h2 className="font-medium">Add team member</h2>
        <Input name="name" placeholder="Name" required />
        <Input name="role" placeholder="Role" required />
        <TextArea name="bio" placeholder="Bio" />
        <Button>Add Member</Button>
      </form>
      <ul className="space-y-2">
        {members.map((member) => (
          <li key={member.id} className="rounded border p-3">
            <p className="font-medium">{member.name} ({member.role})</p>
            {member.bio && <p className="text-sm text-slate-600">{member.bio}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
