import { Card } from '@/components/ui';
import { requireRole } from '@/lib/guards';
import { prisma } from '@/lib/prisma';

export default async function CustomerBookingsPage() {
  const session = await requireRole(['CUSTOMER']);
  const bookings = await prisma.booking.findMany({ where: { customerId: session.user.id }, include: { vendorProfile: true } });

  return (
    <Card>
      <h1 className="mb-4 text-xl font-semibold">My Bookings</h1>
      <ul className="space-y-2 text-sm">
        {bookings.map((b) => (
          <li key={b.id} className="rounded border p-3">
            <p className="font-medium">{b.vendorProfile.businessName} - {b.eventType}</p>
            <p>{b.eventDate.toISOString().slice(0, 10)}</p>
            <p>Status: {b.status}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
