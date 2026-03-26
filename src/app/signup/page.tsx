'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button, Card, Input } from '@/components/ui';

export default function SignupPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  async function onSubmit(formData: FormData) {
    setError('');
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role')
    };

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Signup failed');
      return;
    }

    await signIn('credentials', {
      email: String(payload.email),
      password: String(payload.password),
      callbackUrl: payload.role === 'VENDOR' ? '/vendor/dashboard' : '/vendors'
    });
    router.refresh();
  }

  return (
    <Card>
      <h1 className="mb-4 text-xl font-semibold">Signup</h1>
      <form action={onSubmit} className="space-y-3">
        <Input name="name" placeholder="Full name" />
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="password" type="password" placeholder="Password" required />
        <select name="role" className="w-full rounded-md border p-2" required>
          <option value="CUSTOMER">Customer</option>
          <option value="VENDOR">Vendor</option>
        </select>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button>Create account</Button>
      </form>
    </Card>
  );
}
