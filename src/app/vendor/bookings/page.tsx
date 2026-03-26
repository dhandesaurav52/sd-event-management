import { Card } from '@/components/ui';
import { requireRole } from '@/lib/guards';
import { prisma } from '@/lib/prisma';

export default async function VendorBookingsPage() {
  const session = await requireRole(['VENDOR']);
  const profile = await prisma.vendorProfile.findUnique({ where: { userId: session.user.id } });
  const bookings = profile
    ? await prisma.booking.findMany({ where: { vendorProfileId: profile.id }, include: { customer: true } })
    : [];

  return (
    <Card>
      <h1 className="mb-4 text-xl font-semibold">Booking Requests</h1>
      <ul className="space-y-2 text-sm">
        {bookings.map((b) => (
          <li key={b.id} className="rounded border p-3">
            <p className="font-medium">{b.eventType} on {b.eventDate.toISOString().slice(0, 10)}</p>
            <p>From: {b.customer.email}</p>
            <p>{b.message}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
