import { Card } from '@/components/ui';
import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BookingForm } from './booking-form';

export default async function VendorDetailPage({ params }: { params: { id: string } }) {
  const vendor = await prisma.vendorProfile.findUnique({
    where: { id: params.id },
    include: { services: true, teamMembers: true }
  });
  const session = await getAuthSession();

  if (!vendor) return <p>Vendor not found</p>;

  return (
    <div className="space-y-4">
      <Card>
        <h1 className="text-2xl font-semibold">{vendor.businessName}</h1>
        <p>{vendor.description}</p>
        <p className="text-sm text-slate-600">{vendor.category} · {vendor.location}</p>
      </Card>

      <Card>
        <h2 className="mb-2 text-lg font-semibold">Services</h2>
        <ul className="space-y-2 text-sm">
          {vendor.services.map((service) => (
            <li key={service.id}>{service.title} — ${service.price}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="mb-2 text-lg font-semibold">Team Members</h2>
        <ul className="space-y-2 text-sm">
          {vendor.teamMembers.map((member) => (
            <li key={member.id}>{member.name} ({member.role})</li>
          ))}
        </ul>
      </Card>

      {session?.user?.role === 'CUSTOMER' && (
        <Card>
          <h2 className="text-lg font-semibold">Send Booking Request</h2>
          <BookingForm vendorProfileId={vendor.id} />
        </Card>
      )}
    </div>
  );
}
