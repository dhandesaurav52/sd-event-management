'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: '/' })} className="rounded border px-3 py-1">
      Logout
    </button>
  );
}
