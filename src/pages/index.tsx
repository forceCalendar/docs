import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="hero">
      <div className="container" style={{textAlign: 'center'}}>
        <h1 className="hero__title">
          {siteConfig.title}
        </h1>
        <p className="hero__subtitle">
          A modern, zero-dependency calendar engine with recurring events, timezone handling, and ICS support.
        </p>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem'}}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/architecture/overview">
            Architecture
          </Link>
        </div>
      </div>
    </header>
  );
}

function ArchitectureSection() {
  return (
    <section style={{padding: '4rem 0', backgroundColor: 'var(--ifm-background-surface-color)'}}>
      <div className="container">
        <h2 style={{textAlign: 'center', marginBottom: '0.5rem'}}>
          Three-Layer Architecture
        </h2>
        <p style={{textAlign: 'center', color: 'var(--ifm-font-color-secondary)', maxWidth: '600px', margin: '0 auto 3rem'}}>
          Separation of concerns. Each layer has one job and does it well.
        </p>

        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '900px', margin: '0 auto'}}>
          {/* Core Layer */}
          <div className="arch-card arch-card--core">
            <div className="arch-card__label">@forcecalendar/core</div>
            <h3 className="arch-card__title">The Engine</h3>
            <p className="arch-card__description">
              Pure JavaScript. Zero dependencies. No DOM. Framework-agnostic business logic.
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
              {['Calendar', 'Event', 'EventStore', 'StateManager', 'TimezoneManager', 'RecurrenceEngine', 'ICSParser', 'EventSearch'].map(item => (
                <span key={item} className="tag tag--primary">{item}</span>
              ))}
            </div>
          </div>

          {/* Interface Layer */}
          <div className="arch-card arch-card--interface">
            <div className="arch-card__label">@forcecalendar/interface</div>
            <h3 className="arch-card__title">The UI Components</h3>
            <p className="arch-card__description">
              Web Components that work everywhere. React, Vue, Angular, or vanilla HTML.
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
              {['<force-calendar>', 'MonthView', 'WeekView', 'DayView', 'EventCard', 'CSS Variables'].map(item => (
                <span key={item} className="tag" style={{
                  background: 'rgba(5, 150, 105, 0.1)',
                  color: '#059669',
                  borderColor: 'rgba(5, 150, 105, 0.2)'
                }}>{item}</span>
              ))}
            </div>
          </div>

          {/* Salesforce Layer */}
          <div className="arch-card arch-card--salesforce">
            <div className="arch-card__label">salesforce/</div>
            <h3 className="arch-card__title">The Salesforce Integration</h3>
            <p className="arch-card__description">
              Lightning Web Components. Locker Service compatible. Apex controllers included.
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
              {['LWC Wrapper', 'Apex Controller', 'Locker Safe', 'SLDS Styling'].map(item => (
                <span key={item} className="tag" style={{
                  background: 'rgba(217, 119, 6, 0.1)',
                  color: '#d97706',
                  borderColor: 'rgba(217, 119, 6, 0.2)'
                }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      label: 'RFC 5545',
      title: 'Recurrence Rules',
      description: 'Full RRULE support. Daily, weekly, monthly, yearly patterns with complex rules like "2nd Tuesday of every month."'
    },
    {
      label: 'IANA',
      title: 'Timezone Handling',
      description: 'DST-aware conversions. Convert between any IANA timezone. Events store both local and UTC times.'
    },
    {
      label: 'ICS',
      title: 'Import/Export',
      description: 'iCalendar format support. Import from Google Calendar, Outlook. Export for sharing anywhere.'
    },
    {
      label: 'O(1)',
      title: 'Fast Lookups',
      description: 'Spatial indexing by date. Events indexed by day, month, category. Handle 10,000+ events smoothly.'
    },
    {
      label: 'Undo',
      title: 'State History',
      description: 'Built-in undo/redo. Navigate up to 50 state changes. Deep cloning prevents reference bugs.'
    },
    {
      label: '0 deps',
      title: 'Zero Dependencies',
      description: 'No moment.js. No date-fns. Pure JavaScript using native Date and Intl APIs. Tiny bundle size.'
    }
  ];

  return (
    <section style={{padding: '4rem 0'}}>
      <div className="container">
        <h2 style={{textAlign: 'center', marginBottom: '3rem'}}>
          Core Capabilities
        </h2>
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className="col col--4" style={{marginBottom: '2rem'}}>
              <div className="feature-card" style={{height: '100%'}}>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: 'var(--ifm-color-primary)',
                  fontFamily: 'monospace',
                  marginBottom: '0.5rem'
                }}>
                  {feature.label}
                </div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DataFlowSection() {
  return (
    <section style={{padding: '4rem 0', backgroundColor: 'var(--ifm-background-surface-color)'}}>
      <div className="container">
        <h2 style={{textAlign: 'center', marginBottom: '0.5rem'}}>
          How Data Flows
        </h2>
        <p style={{textAlign: 'center', color: 'var(--ifm-font-color-secondary)', maxWidth: '600px', margin: '0 auto 3rem'}}>
          Unidirectional data flow. Events flow down, changes bubble up.
        </p>

        <div className="code-block-card" style={{maxWidth: '800px', margin: '0 auto'}}>
          <div className="code-block-card__header">Architecture Diagram</div>
          <pre style={{
            margin: 0,
            padding: '1.5rem',
            fontSize: '0.8rem',
            overflow: 'auto',
            backgroundColor: 'var(--ifm-code-background)'
          }}>
{`┌─────────────────────────────────────────────────────────┐
│                     Your Application                     │
└─────────────────────────┬───────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                      Calendar                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ EventStore   │  │ StateManager │  │ Timezone     │  │
│  │              │  │              │  │ Manager      │  │
│  │ - events Map │  │ - state      │  │              │  │
│  │ - indices    │  │ - history    │  │ - offsets    │  │
│  │ - listeners  │  │ - listeners  │  │ - DST rules  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐   ┌──────────────┐   ┌──────────┐
    │ Event    │   │ Recurrence   │   │ ICSParser│
    │          │   │ Engine       │   │          │
    │ - start  │   │ - expand     │   │ - parse  │
    │ - end    │   │ - RRULE      │   │ - export │
    │ - tz     │   │ - exceptions │   │          │
    └──────────┘   └──────────────┘   └──────────┘`}
          </pre>
        </div>
      </div>
    </section>
  );
}

function QuickStartSection() {
  return (
    <section style={{padding: '4rem 0'}}>
      <div className="container">
        <h2 style={{textAlign: 'center', marginBottom: '3rem'}}>
          Quick Start
        </h2>

        <div style={{maxWidth: '700px', margin: '0 auto'}}>
          <div className="code-block-card" style={{marginBottom: '1.5rem'}}>
            <div className="code-block-card__header">Install</div>
            <div style={{padding: '1rem 1.5rem', backgroundColor: 'var(--ifm-code-background)'}}>
              <code>npm install @forcecalendar/core</code>
            </div>
          </div>

          <div className="code-block-card">
            <div className="code-block-card__header">Usage</div>
            <pre style={{
              margin: 0,
              padding: '1.5rem',
              fontSize: '0.875rem',
              overflow: 'auto',
              backgroundColor: 'var(--ifm-code-background)'
            }}>
{`import { Calendar } from '@forcecalendar/core';

const calendar = new Calendar({
  timeZone: 'America/New_York',
  weekStartsOn: 1  // Monday
});

calendar.addEvent({
  id: '1',
  title: 'Team Meeting',
  start: new Date('2024-01-15T10:00:00'),
  end: new Date('2024-01-15T11:00:00'),
  recurring: true,
  recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,WE,FR'
});

const events = calendar.getEventsForDate(new Date());`}
            </pre>
          </div>
        </div>

        <div style={{textAlign: 'center', marginTop: '3rem'}}>
          <Link
            className="button button--primary button--lg"
            to="/docs/core/calendar">
            Read the Full API Reference
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Documentation"
      description="A modern, zero-dependency calendar engine with recurring events, timezone handling, and ICS support">
      <HomepageHeader />
      <main>
        <ArchitectureSection />
        <FeaturesSection />
        <DataFlowSection />
        <QuickStartSection />
      </main>
    </Layout>
  );
}
