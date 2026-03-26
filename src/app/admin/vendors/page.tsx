import { Card } from '@/components/ui';
import { requireRole } from '@/lib/guards';
import { prisma } from '@/lib/prisma';

export default async function AdminVendorsPage() {
  await requireRole(['ADMIN']);
  const vendors = await prisma.vendorProfile.findMany({ include: { user: true } });

  return (
    <Card>
      <h1 className="mb-4 text-xl font-semibold">Vendors</h1>
      <ul className="space-y-1 text-sm">
        {vendors.map((v) => <li key={v.id}>{v.businessName} ({v.user.email})</li>)}
      </ul>
    </Card>
  );
}
