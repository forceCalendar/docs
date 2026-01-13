import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary')}>
      <div className="container" style={{textAlign: 'center', position: 'relative', zIndex: 1}}>
        <h1 className="hero__title" style={{fontSize: '5rem', fontWeight: '900', marginBottom: '1.5rem'}}>
          {siteConfig.title}
        </h1>
        <p className="hero__subtitle" style={{fontSize: '1.5rem', color: '#a8a8a8', maxWidth: '700px', margin: '0 auto 3rem'}}>
          A modern, zero-dependency calendar engine with recurring events, timezone handling, and ICS support.
        </p>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
            style={{padding: '1.25rem 3rem', borderRadius: '12px', fontWeight: '800', fontSize: '1.1rem'}}>
            Get Started
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/architecture/overview"
            style={{padding: '1.25rem 3rem', borderRadius: '12px', fontWeight: '600', fontSize: '1.1rem', border: '2px solid #8b5cf6', color: '#8b5cf6'}}>
            Architecture
          </Link>
        </div>
      </div>
    </header>
  );
}

function ArchitectureSection() {
  return (
    <section style={{backgroundColor: '#111', padding: '5rem 0'}}>
      <div className="container">
        <h2 style={{textAlign: 'center', fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem'}}>
          Three-Layer Architecture
        </h2>
        <p style={{textAlign: 'center', color: '#a8a8a8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem'}}>
          Separation of concerns. Each layer has one job and does it well.
        </p>

        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '900px', margin: '0 auto'}}>
          {/* Core Layer */}
          <div style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            border: '1px solid #8b5cf6',
            borderRadius: '16px',
            padding: '2rem',
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
              <span style={{fontSize: '2rem'}}>@forcecalendar/core</span>
            </div>
            <h3 style={{fontSize: '1.5rem', fontWeight: '700', color: '#8b5cf6', margin: '0 0 0.5rem'}}>
              The Engine
            </h3>
            <p style={{color: '#a8a8a8', fontSize: '1rem', margin: '0 0 1rem'}}>
              Pure JavaScript. Zero dependencies. No DOM. Framework-agnostic business logic.
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
              {['Calendar', 'Event', 'EventStore', 'StateManager', 'TimezoneManager', 'RecurrenceEngine', 'ICSParser', 'EventSearch'].map(item => (
                <span key={item} style={{
                  background: '#8b5cf620',
                  color: '#8b5cf6',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace'
                }}>{item}</span>
              ))}
            </div>
          </div>

          {/* Interface Layer */}
          <div style={{
            background: 'linear-gradient(135deg, #1a2e1a 0%, #162e16 100%)',
            border: '1px solid #22c55e',
            borderRadius: '16px',
            padding: '2rem',
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
              <span style={{fontSize: '2rem'}}>@forcecalendar/interface</span>
            </div>
            <h3 style={{fontSize: '1.5rem', fontWeight: '700', color: '#22c55e', margin: '0 0 0.5rem'}}>
              The UI Components
            </h3>
            <p style={{color: '#a8a8a8', fontSize: '1rem', margin: '0 0 1rem'}}>
              Web Components that work everywhere. React, Vue, Angular, or vanilla HTML.
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
              {['<force-calendar>', 'MonthView', 'WeekView', 'DayView', 'EventCard', 'CSS Variables'].map(item => (
                <span key={item} style={{
                  background: '#22c55e20',
                  color: '#22c55e',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace'
                }}>{item}</span>
              ))}
            </div>
          </div>

          {/* Salesforce Layer */}
          <div style={{
            background: 'linear-gradient(135deg, #2e2a1a 0%, #2e2616 100%)',
            border: '1px solid #f59e0b',
            borderRadius: '16px',
            padding: '2rem',
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
              <span style={{fontSize: '2rem'}}>salesforce/</span>
            </div>
            <h3 style={{fontSize: '1.5rem', fontWeight: '700', color: '#f59e0b', margin: '0 0 0.5rem'}}>
              The Salesforce Integration
            </h3>
            <p style={{color: '#a8a8a8', fontSize: '1rem', margin: '0 0 1rem'}}>
              Lightning Web Components. Locker Service compatible. Apex controllers included.
            </p>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
              {['LWC Wrapper', 'Apex Controller', 'Locker Safe', 'SLDS Styling'].map(item => (
                <span key={item} style={{
                  background: '#f59e0b20',
                  color: '#f59e0b',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace'
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
  return (
    <section style={{backgroundColor: '#0a0a0a', padding: '5rem 0'}}>
      <div className="container">
        <h2 style={{textAlign: 'center', fontSize: '2.5rem', fontWeight: '800', marginBottom: '3rem'}}>
          Core Capabilities
        </h2>
        <div className="row">
          <div className="col col--4" style={{textAlign: 'center', padding: '2rem'}}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>RFC 5545</div>
            <h3 style={{fontSize: '1.3rem', fontWeight: '700'}}>Recurrence Rules</h3>
            <p style={{color: '#a8a8a8', fontSize: '1rem'}}>
              Full RRULE support. Daily, weekly, monthly, yearly patterns with complex rules like "2nd Tuesday of every month."
            </p>
          </div>
          <div className="col col--4" style={{textAlign: 'center', padding: '2rem'}}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>IANA</div>
            <h3 style={{fontSize: '1.3rem', fontWeight: '700'}}>Timezone Handling</h3>
            <p style={{color: '#a8a8a8', fontSize: '1rem'}}>
              DST-aware conversions. Convert between any IANA timezone. Events store both local and UTC times.
            </p>
          </div>
          <div className="col col--4" style={{textAlign: 'center', padding: '2rem'}}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>ICS</div>
            <h3 style={{fontSize: '1.3rem', fontWeight: '700'}}>Import/Export</h3>
            <p style={{color: '#a8a8a8', fontSize: '1rem'}}>
              iCalendar format support. Import from Google Calendar, Outlook. Export for sharing anywhere.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col col--4" style={{textAlign: 'center', padding: '2rem'}}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>O(1)</div>
            <h3 style={{fontSize: '1.3rem', fontWeight: '700'}}>Fast Lookups</h3>
            <p style={{color: '#a8a8a8', fontSize: '1rem'}}>
              Spatial indexing by date. Events indexed by day, month, category. Handle 10,000+ events smoothly.
            </p>
          </div>
          <div className="col col--4" style={{textAlign: 'center', padding: '2rem'}}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>Undo</div>
            <h3 style={{fontSize: '1.3rem', fontWeight: '700'}}>State History</h3>
            <p style={{color: '#a8a8a8', fontSize: '1rem'}}>
              Built-in undo/redo. Navigate up to 50 state changes. Deep cloning prevents reference bugs.
            </p>
          </div>
          <div className="col col--4" style={{textAlign: 'center', padding: '2rem'}}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>0 deps</div>
            <h3 style={{fontSize: '1.3rem', fontWeight: '700'}}>Zero Dependencies</h3>
            <p style={{color: '#a8a8a8', fontSize: '1rem'}}>
              No moment.js. No date-fns. Pure JavaScript using native Date and Intl APIs. Tiny bundle size.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DataFlowSection() {
  return (
    <section style={{backgroundColor: '#111', padding: '5rem 0'}}>
      <div className="container">
        <h2 style={{textAlign: 'center', fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem'}}>
          How Data Flows
        </h2>
        <p style={{textAlign: 'center', color: '#a8a8a8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem'}}>
          Unidirectional data flow. Events flow down, changes bubble up.
        </p>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          background: '#0a0a0a',
          borderRadius: '12px',
          padding: '2rem',
          border: '1px solid #333'
        }}>
          <pre style={{margin: 0, color: '#a8a8a8', whiteSpace: 'pre-wrap'}}>
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
    │ Event    │   │ RecurrenceEngine │   │ ICSParser │
    │          │   │                  │   │          │
    │ - start  │   │ - expandEvent   │   │ - parse  │
    │ - end    │   │ - RRULE support │   │ - export │
    │ - tz     │   │ - exceptions    │   │          │
    └──────────┘   └──────────────┘   └──────────┘`}
          </pre>
        </div>
      </div>
    </section>
  );
}

function QuickStartSection() {
  return (
    <section style={{backgroundColor: '#0a0a0a', padding: '5rem 0'}}>
      <div className="container">
        <h2 style={{textAlign: 'center', fontSize: '2.5rem', fontWeight: '800', marginBottom: '3rem'}}>
          Quick Start
        </h2>

        <div style={{maxWidth: '700px', margin: '0 auto'}}>
          <div style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            border: '1px solid #333'
          }}>
            <div style={{color: '#8b5cf6', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Install</div>
            <code style={{color: '#fff', fontSize: '1rem'}}>npm install @forcecalendar/core</code>
          </div>

          <div style={{
            background: '#1a1a1a',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #333'
          }}>
            <div style={{color: '#8b5cf6', fontSize: '0.875rem', marginBottom: '0.5rem'}}>Use</div>
            <pre style={{margin: 0, color: '#a8a8a8', fontSize: '0.9rem', overflow: 'auto'}}>
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
            className="button button--secondary button--lg"
            to="/docs/core/calendar"
            style={{padding: '1rem 3rem', borderRadius: '12px', fontWeight: '700'}}>
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
