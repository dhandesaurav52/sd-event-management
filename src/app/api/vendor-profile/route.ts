import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const vendors = await prisma.vendorProfile.findMany({ include: { user: true } });
  return NextResponse.json(vendors);
}

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user || session.user.role !== 'VENDOR') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { businessName, description, category, location, startingPrice } = await req.json();
  if (!businessName || !description || !category || !location || !startingPrice) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const profile = await prisma.vendorProfile.upsert({
    where: { userId: session.user.id },
    update: { businessName, description, category, location, startingPrice: Number(startingPrice) },
    create: {
      userId: session.user.id,
      businessName,
      description,
      category,
      location,
      startingPrice: Number(startingPrice)
    }
  });

  return NextResponse.json(profile, { status: 201 });
}
