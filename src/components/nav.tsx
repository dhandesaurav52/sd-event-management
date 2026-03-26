import Link from 'next/link';
import { getAuthSession } from '@/lib/auth';
import { SignOutButton } from './sign-out-button';

export async function Nav() {
  const session = await getAuthSession();

  return (
    <nav className="mb-8 flex items-center justify-between border-b bg-white px-6 py-4">
      <Link href="/" className="font-semibold">Event Platform</Link>
      <div className="flex items-center gap-4 text-sm">
        <Link href="/vendors">Vendors</Link>
        {session?.user?.role === 'VENDOR' && <Link href="/vendor/dashboard">Vendor Dashboard</Link>}
        {session?.user?.role === 'ADMIN' && <Link href="/admin/dashboard">Admin</Link>}
        {!session?.user && <Link href="/login">Login</Link>}
        {!session?.user && <Link href="/signup">Signup</Link>}
        {session?.user && <SignOutButton />}
      </div>
    </nav>
  );
}
