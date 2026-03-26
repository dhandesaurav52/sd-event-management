import Link from 'next/link';
import { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-lg border bg-white p-6 shadow-sm">{children}</div>;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className="w-full rounded-md border p-2" {...props} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className="w-full rounded-md border p-2" {...props} />;
}

export function Button({ children, type = 'submit' }: { children: ReactNode; type?: 'button' | 'submit' }) {
  return (
    <button type={type} className="rounded-md bg-slate-900 px-4 py-2 text-white hover:bg-slate-700">
      {children}
    </button>
  );
}

export function AppLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-sm text-blue-700 underline">
      {children}
    </Link>
  );
}
