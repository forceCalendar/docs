import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './global.css';

// Same typeface as forcecalendar.org for a consistent look across sites
const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'forceCalendar Documentation',
    template: '%s | forceCalendar',
  },
  description:
    'Enterprise-grade calendar infrastructure for Salesforce and strict-CSP environments. Zero dependencies.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
