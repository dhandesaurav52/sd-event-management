import { getAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

async function getVendorProfileId(userId: string) {
  const vp = await prisma.vendorProfile.findUnique({ where: { userId } });
  return vp?.id;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const vendorProfileId = searchParams.get('vendorProfileId');
  if (!vendorProfileId) return NextResponse.json({ error: 'vendorProfileId required' }, { status: 400 });

  const team = await prisma.teamMember.findMany({ where: { vendorProfileId } });
  return NextResponse.json(team);
}

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user || session.user.role !== 'VENDOR') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const vendorProfileId = await getVendorProfileId(session.user.id);
  if (!vendorProfileId) return NextResponse.json({ error: 'Vendor profile required' }, { status: 400 });

  const { name, role, bio } = await req.json();
  if (!name || !role) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const member = await prisma.teamMember.create({
    data: { vendorProfileId, name, role, bio: bio || null }
  });

  return NextResponse.json(member, { status: 201 });
}
