import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getAuthSession();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (session.user.role === 'VENDOR') {
    const vendor = await prisma.vendorProfile.findUnique({ where: { userId: session.user.id } });
    if (!vendor) return NextResponse.json([]);
    const bookings = await prisma.booking.findMany({ where: { vendorProfileId: vendor.id }, include: { customer: true } });
    return NextResponse.json(bookings);
  }

  if (session.user.role === 'CUSTOMER') {
    const bookings = await prisma.booking.findMany({ where: { customerId: session.user.id }, include: { vendorProfile: true } });
    return NextResponse.json(bookings);
  }

  const bookings = await prisma.booking.findMany({ include: { customer: true, vendorProfile: true } });
  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user || session.user.role !== 'CUSTOMER') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { vendorProfileId, eventDate, eventType, message } = await req.json();
  if (!vendorProfileId || !eventDate || !eventType || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const booking = await prisma.booking.create({
    data: {
      customerId: session.user.id,
      vendorProfileId,
      eventDate: new Date(eventDate),
      eventType,
      message
    }
  });

  return NextResponse.json(booking, { status: 201 });
}
