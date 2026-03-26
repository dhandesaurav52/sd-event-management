'use client';

import { useState } from 'react';
import { Button, Input, TextArea } from '@/components/ui';

export function BookingForm({ vendorProfileId }: { vendorProfileId: string }) {
  const [message, setMessage] = useState('');

  async function onSubmit(formData: FormData) {
    const payload = {
      vendorProfileId,
      eventDate: formData.get('eventDate'),
      eventType: formData.get('eventType'),
      message: formData.get('message')
    };

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setMessage(res.ok ? 'Booking request submitted.' : 'Failed to submit request.');
  }

  return (
    <form action={onSubmit} className="mt-4 space-y-3">
      <Input name="eventDate" type="date" required />
      <Input name="eventType" placeholder="Event type" required />
      <TextArea name="message" placeholder="Tell vendor about your event" required />
      <Button>Submit Booking Request</Button>
      {message && <p className="text-sm">{message}</p>}
    </form>
  );
}
