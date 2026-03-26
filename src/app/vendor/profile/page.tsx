import { Card } from '@/components/ui';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/guards';
import { ProfileForm } from './profile-form';

export default async function VendorProfilePage() {
  const session = await requireRole(['VENDOR']);
  const profile = await prisma.vendorProfile.findUnique({ where: { userId: session.user.id } });

  return (
    <Card>
      <h1 className="mb-4 text-xl font-semibold">Vendor Profile</h1>
      <ProfileForm initial={profile} />
    </Card>
  );
}
