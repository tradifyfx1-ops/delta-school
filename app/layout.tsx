import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Delta School Turbat',
  description: 'Frontend website for Delta School Turbat'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
