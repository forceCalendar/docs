import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary')}>
      <div className="container">
        <h1 className="hero__title" style={{fontSize: '4rem', fontWeight: '800'}}>
          {siteConfig.title}
        </h1>
        <p className="hero__subtitle" style={{fontSize: '1.5rem', opacity: '0.9'}}>
          Like LEGOs for your calendar. Build something amazing in minutes.
        </p>
        <div style={{marginTop: '2rem'}}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
            style={{padding: '1rem 3rem', borderRadius: '50px', fontWeight: 'bold'}}>
            Get Started (ELI5) 🚀
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="The simplest, fastest calendar engine for Salesforce and Web">
      <HomepageHeader />
      <main>
        <div style={{padding: '4rem 0', textAlign: 'center'}} className="container">
           <div className="row">
              <div className="col col--4">
                <div style={{fontSize: '4rem'}}>🧠</div>
                <h3>Robot Brain</h3>
                <p>A smart engine that handles all the hard math, timezones, and repeating events for you.</p>
              </div>
              <div className="col col--4">
                <div style={{fontSize: '4rem'}}>🎨</div>
                <h3>Pretty Face</h3>
                <p>Beautiful, fast, and responsive UI components that work anywhere.</p>
              </div>
              <div className="col col--4">
                <div style={{fontSize: '4rem'}}>☁️</div>
                <h3>Salesforce Ready</h3>
                <p>Fits perfectly inside Salesforce like a custom-made suit.</p>
              </div>
           </div>
        </div>
      </main>
    </Layout>
  );
}