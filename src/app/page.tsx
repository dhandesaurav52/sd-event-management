import { Card, AppLink } from '@/components/ui';

export default function HomePage() {
  return (
    <Card>
      <h1 className="text-2xl font-semibold">Phase 1 MVP</h1>
      <p className="mt-2 text-sm text-slate-600">Browse vendors, request bookings, and manage vendor operations.</p>
      <div className="mt-4 flex gap-4">
        <AppLink href="/vendors">Browse Vendors</AppLink>
        <AppLink href="/signup">Create Account</AppLink>
      </div>
    </Card>
  );
}
