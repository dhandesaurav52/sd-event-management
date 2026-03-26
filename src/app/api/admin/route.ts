import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getAuthSession();
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [users, vendors, bookings] = await Promise.all([
    prisma.user.findMany(),
    prisma.vendorProfile.findMany(),
    prisma.booking.findMany()
  ]);

  return NextResponse.json({ users, vendors, bookings });
}
