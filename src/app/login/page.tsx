'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button, Card, Input } from '@/components/ui';

export default function LoginPage() {
  const [error, setError] = useState('');

  async function onSubmit(formData: FormData) {
    setError('');
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    const res = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/vendors',
      redirect: false
    });

    if (res?.error) {
      setError('Invalid credentials');
      return;
    }

    window.location.href = res?.url || '/vendors';
  }

  return (
    <Card>
      <h1 className="mb-4 text-xl font-semibold">Login</h1>
      <form action={onSubmit} className="space-y-3">
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="password" type="password" placeholder="Password" required />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button>Login</Button>
      </form>
    </Card>
  );
}
