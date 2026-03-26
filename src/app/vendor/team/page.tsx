import { Card } from '@/components/ui';
import { requireRole } from '@/lib/guards';
import { prisma } from '@/lib/prisma';
import { TeamManager } from './team-manager';

export default async function VendorTeamPage() {
  const session = await requireRole(['VENDOR']);
  const profile = await prisma.vendorProfile.findUnique({ where: { userId: session.user.id }, include: { teamMembers: true } });

  return (
    <Card>
      <h1 className="mb-4 text-xl font-semibold">Team Members</h1>
      {!profile ? <p>Create vendor profile first.</p> : <TeamManager initial={profile.teamMembers} />}
    </Card>
  );
}
