import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">forceCalendar</h1>
      <p className="text-lg text-fd-muted-foreground mb-8 max-w-xl">
        Enterprise-grade calendar infrastructure for Salesforce and strict-CSP
        environments. Zero dependencies. MIT licensed.
      </p>
      <div className="flex gap-4">
        <Link
          href="/docs"
          className="inline-flex items-center justify-center rounded-md bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground shadow hover:bg-fd-primary/90 transition-colors"
        >
          Get Started
        </Link>
        <Link
          href="/docs/api/calendar"
          className="inline-flex items-center justify-center rounded-md border border-fd-border px-6 py-3 text-sm font-medium hover:bg-fd-accent transition-colors"
        >
          API Reference
        </Link>
      </div>
    </main>
  );
}
