import { Card } from '@/components/ui';
import { requireRole } from '@/lib/guards';
import { prisma } from '@/lib/prisma';
import { ServicesManager } from './services-manager';

export default async function VendorServicesPage() {
  const session = await requireRole(['VENDOR']);
  const profile = await prisma.vendorProfile.findUnique({ where: { userId: session.user.id }, include: { services: true } });

  return (
    <Card>
      <h1 className="mb-4 text-xl font-semibold">Services</h1>
      {!profile ? <p>Create vendor profile first.</p> : <ServicesManager initial={profile.services} />}
    </Card>
  );
}
