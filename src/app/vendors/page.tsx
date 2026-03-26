import { Card, AppLink } from '@/components/ui';
import { prisma } from '@/lib/prisma';

export default async function VendorsPage() {
  const vendors = await prisma.vendorProfile.findMany({ include: { services: true } });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Vendors</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {vendors.map((vendor) => (
          <Card key={vendor.id}>
            <h2 className="text-lg font-semibold">{vendor.businessName}</h2>
            <p className="text-sm text-slate-600">{vendor.category} · {vendor.location}</p>
            <p className="mt-2 text-sm">Starting at ${vendor.startingPrice}</p>
            <AppLink href={`/vendors/${vendor.id}`}>View details</AppLink>
          </Card>
        ))}
      </div>
    </div>
  );
}
