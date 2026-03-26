'use client';

import { Button, Input, TextArea } from '@/components/ui';
import { useState } from 'react';

type Props = {
  initial?: {
    businessName: string;
    description: string;
    category: string;
    location: string;
    startingPrice: number;
  } | null;
};

export function ProfileForm({ initial }: Props) {
  const [message, setMessage] = useState('');

  async function onSubmit(formData: FormData) {
    const payload = {
      businessName: formData.get('businessName'),
      description: formData.get('description'),
      category: formData.get('category'),
      location: formData.get('location'),
      startingPrice: Number(formData.get('startingPrice'))
    };

    const res = await fetch('/api/vendor-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setMessage(res.ok ? 'Profile saved.' : 'Failed to save profile.');
  }

  return (
    <form action={onSubmit} className="space-y-3">
      <Input name="businessName" placeholder="Business name" defaultValue={initial?.businessName} required />
      <TextArea name="description" placeholder="Description" defaultValue={initial?.description} required />
      <Input name="category" placeholder="Category" defaultValue={initial?.category} required />
      <Input name="location" placeholder="Location" defaultValue={initial?.location} required />
      <Input name="startingPrice" type="number" placeholder="Starting price" defaultValue={initial?.startingPrice} required />
      <Button>Save Profile</Button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  );
}
