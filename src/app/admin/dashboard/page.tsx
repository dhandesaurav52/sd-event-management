import { Card, AppLink } from '@/components/ui';
import { requireRole } from '@/lib/guards';

export default async function AdminDashboardPage() {
  await requireRole(['ADMIN']);

  return (
    <Card>
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <div className="mt-4 space-y-2">
        <AppLink href="/admin/users">View Users</AppLink>
        <br />
        <AppLink href="/admin/vendors">View Vendors</AppLink>
        <br />
        <AppLink href="/admin/bookings">View Bookings</AppLink>
      </div>
    </Card>
  );
}
