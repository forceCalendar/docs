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
          The high-performance calendar engine for modern apps. 
          Built for speed, styled for elegance.
        </p>
        <div>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
            style={{padding: '1.25rem 4rem', borderRadius: '12px', fontWeight: '800', fontSize: '1.1rem'}}>
            Start Building ⚡
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout
      title="Documentation"
      description="Modern calendar infrastructure for Salesforce and the Web">
      <HomepageHeader />
      <main style={{backgroundColor: '#0a0a0a', padding: '6rem 0'}}>
        <div className="container">
           <div className="row">
              <div className="col col--4" style={{textAlign: 'center', padding: '2rem'}}>
                <div className="feature-icon-wrapper">🧠</div>
                <h3 style={{fontSize: '1.5rem', fontWeight: '700'}}>Smart Core</h3>
                <p style={{color: '#a8a8a8', fontSize: '1.1rem'}}>Framework-agnostic logic handling complex recurrence and timezones with ease.</p>
              </div>
              <div className="col col--4" style={{textAlign: 'center', padding: '2rem'}}>
                <div className="feature-icon-wrapper">🎨</div>
                <h3 style={{fontSize: '1.5rem', fontWeight: '700'}}>Fluid Interface</h3>
                <p style={{color: '#a8a8a8', fontSize: '1.1rem'}}>Beautiful Web Components that integrate seamlessly with any frontend stack.</p>
              </div>
              <div className="col col--4" style={{textAlign: 'center', padding: '2rem'}}>
                <div className="feature-icon-wrapper">⚡</div>
                <h3 style={{fontSize: '1.5rem', fontWeight: '700'}}>Extreme Speed</h3>
                <p style={{color: '#a8a8a8', fontSize: '1.1rem'}}>Optimized spatial indexing designed to handle tens of thousands of events.</p>
              </div>
           </div>
        </div>
      </main>
    </Layout>
  );
}
