import { Card } from '@/components/ui';
import { requireRole } from '@/lib/guards';
import { prisma } from '@/lib/prisma';

export default async function AdminUsersPage() {
  await requireRole(['ADMIN']);
  const users = await prisma.user.findMany();

  return (
    <Card>
      <h1 className="mb-4 text-xl font-semibold">Users</h1>
      <ul className="space-y-1 text-sm">
        {users.map((u) => <li key={u.id}>{u.email} ({u.role})</li>)}
      </ul>
    </Card>
  );
}
