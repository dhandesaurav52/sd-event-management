import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password, role } = body;

  if (!email || !password || !role || !Object.values(Role).includes(role)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: 'Email already in use' }, { status: 409 });

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name: name || null,
      email,
      password: hashed,
      role
    }
  });

  return NextResponse.json({ id: user.id, email: user.email, role: user.role }, { status: 201 });
}
