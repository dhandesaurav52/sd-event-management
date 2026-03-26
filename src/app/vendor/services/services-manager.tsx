'use client';

import { Button, Input, TextArea } from '@/components/ui';
import { useState } from 'react';

type Service = { id: string; title: string; description: string; price: number };

export function ServicesManager({ initial }: { initial: Service[] }) {
  const [services, setServices] = useState(initial);

  async function createService(formData: FormData) {
    const payload = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: Number(formData.get('price'))
    };
    const res = await fetch('/api/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (res.ok) setServices((prev) => [...prev, await res.json()]);
  }

  async function removeService(id: string) {
    const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
    if (res.ok) setServices((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="space-y-6">
      <form action={createService} className="space-y-2 rounded border p-4">
        <h2 className="font-medium">Add service</h2>
        <Input name="title" placeholder="Title" required />
        <TextArea name="description" placeholder="Description" required />
        <Input name="price" type="number" placeholder="Price" required />
        <Button>Add Service</Button>
      </form>
      <div className="space-y-2">
        {services.map((service) => (
          <div key={service.id} className="flex items-center justify-between rounded border p-3">
            <div>
              <p className="font-medium">{service.title} (${service.price})</p>
              <p className="text-sm text-slate-600">{service.description}</p>
            </div>
            <button onClick={() => removeService(service.id)} className="text-sm text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
