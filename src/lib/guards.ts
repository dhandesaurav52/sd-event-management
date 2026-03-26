import { redirect } from 'next/navigation';
import { getAuthSession } from './auth';

export async function requireAuth() {
  const session = await getAuthSession();
  if (!session?.user) redirect('/login');
  return session;
}

export async function requireRole(roles: string[]) {
  const session = await requireAuth();
  if (!roles.includes(session.user.role)) {
    redirect('/');
  }
  return session;
}
