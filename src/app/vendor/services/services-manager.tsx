'use client';

import { Button, Input, TextArea } from '@/components/ui';
import { useMemo, useState } from 'react';

type Service = { id: string; title: string; description: string; price: number };

export function ServicesManager({ initial }: { initial: Service[] }) {
  const [services, setServices] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalValue = useMemo(() => services.reduce((sum, service) => sum + service.price, 0), [services]);

  async function createService(formData: FormData) {
    setError(null);
    setIsSubmitting(true);

    const payload = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: Number(formData.get('price'))
    };

    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        setError('Unable to create service right now. Please try again.');
        return;
      }

      const createdService: Service = await res.json();
      setServices((prev) => [...prev, createdService]);
    } catch {
      setError('Network error while creating the service.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function removeService(id: string) {
    setError(null);
    const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setServices((prev) => prev.filter((s) => s.id !== id));
      return;
    }

    setError('Unable to delete this service right now.');
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-700 p-5 text-white shadow-sm">
        <p className="text-sm text-slate-200">Services overview</p>
        <h2 className="text-2xl font-semibold">{services.length} listed services</h2>
        <p className="mt-1 text-sm text-slate-200">Total catalog value: ${totalValue.toLocaleString()}</p>
      </div>

      <form action={createService} className="space-y-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Add a new service</h3>
        <p className="text-sm text-slate-600">Build your catalog with clear titles, pricing, and details.</p>
        <Input name="title" placeholder="Title" required />
        <TextArea name="description" placeholder="Description" required />
        <Input name="price" type="number" min="0" step="0.01" placeholder="Price" required />
        <Button>{isSubmitting ? 'Saving...' : 'Add Service'}</Button>
      </form>

      {error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <div className="grid gap-3">
        {services.map((service) => (
          <div key={service.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-slate-900">{service.title}</p>
                <p className="mt-1 text-sm text-slate-600">{service.description}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">${service.price}</span>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => removeService(service.id)}
                className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {!services.length && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            No services yet. Add your first one above.
          </div>
        )}
      </div>
    </div>
  );
}
