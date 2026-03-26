import { Card, AppLink } from '@/components/ui';
import { requireRole } from '@/lib/guards';

export default async function VendorDashboardPage() {
  await requireRole(['VENDOR']);

  return (
    <Card>
      <h1 className="text-xl font-semibold">Vendor Dashboard</h1>
      <div className="mt-4 space-y-2">
        <AppLink href="/vendor/profile">Manage Profile</AppLink>
        <br />
        <AppLink href="/vendor/services">Manage Services</AppLink>
        <br />
        <AppLink href="/vendor/team">Manage Team</AppLink>
        <br />
        <AppLink href="/vendor/bookings">View Booking Requests</AppLink>
      </div>
    </Card>
  );
}
