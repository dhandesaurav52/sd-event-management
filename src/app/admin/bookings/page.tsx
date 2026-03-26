import { Card } from '@/components/ui';
import { requireRole } from '@/lib/guards';
import { prisma } from '@/lib/prisma';

export default async function AdminBookingsPage() {
  await requireRole(['ADMIN']);
  const bookings = await prisma.booking.findMany({ include: { customer: true, vendorProfile: true } });

  return (
    <Card>
      <h1 className="mb-4 text-xl font-semibold">Bookings</h1>
      <ul className="space-y-1 text-sm">
        {bookings.map((b) => <li key={b.id}>{b.customer.email} → {b.vendorProfile.businessName} ({b.status})</li>)}
      </ul>
    </Card>
  );
}
