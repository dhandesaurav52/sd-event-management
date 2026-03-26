import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { Nav } from '@/components/nav';

export const metadata: Metadata = {
  title: 'Event Management Platform'
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav />
          <main className="mx-auto max-w-5xl px-4 pb-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
