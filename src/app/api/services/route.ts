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

  const services = await prisma.service.findMany({ where: { vendorProfileId } });
  return NextResponse.json(services);
}

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user || session.user.role !== 'VENDOR') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const vendorProfileId = await getVendorProfileId(session.user.id);
  if (!vendorProfileId) return NextResponse.json({ error: 'Vendor profile required' }, { status: 400 });

  const { title, description, price } = await req.json();
  if (!title || !description || !price) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const service = await prisma.service.create({
    data: { vendorProfileId, title, description, price: Number(price) }
  });
  return NextResponse.json(service, { status: 201 });
}

export async function PUT(req: Request) {
  const session = await getAuthSession();
  if (!session?.user || session.user.role !== 'VENDOR') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, title, description, price } = await req.json();
  if (!id || !title || !description || !price) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const service = await prisma.service.update({ where: { id }, data: { title, description, price: Number(price) } });
  return NextResponse.json(service);
}

export async function DELETE(req: Request) {
  const session = await getAuthSession();
  if (!session?.user || session.user.role !== 'VENDOR') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
