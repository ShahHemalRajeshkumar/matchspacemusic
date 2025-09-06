import '../styles/globals.scss';
import '../styles/tailwind.css';
import '../styles/NewDesigns/styles.scss';
import '../styles/TeacherInfo/styles.scss';
import '../styles/TeacherSearch/styles.scss';
import '../components/InstrumentComponents/styles.scss';
import '../components/evta/styles.scss';
import '../styles/NewDesigns/langToggle.scss';

import Head from 'next/head';
import Script from 'next/script';
import Bugsnag from '@bugsnag/js';
import React, { useEffect, useState } from 'react';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import BugsnagPerformance from '@bugsnag/browser-performance';

if (!Bugsnag._client) {
  Bugsnag.start({
    apiKey: 'a9f8a6cb4a257c3e57abd95f0bd19e3f', // staging
    plugins: [new BugsnagPluginReact()],
  });

  BugsnagPerformance.start({ apiKey: 'a9f8a6cb4a257c3e57abd95f0bd19e3f' }); // staging
}

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

const MyApp = ({ Component, pageProps }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const cookies = {};
    document?.cookie?.split(';')?.forEach((item) => {
      const split = String(item || '')
        .trim()
        .split('=');
      cookies[split[0]] = split[1];
    });

    if (cookies['ms_user_id']) Bugsnag.setUser(cookies['ms_user_id']);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-dom').then(() => {
        setIsLoaded(true);
      });
    }
  }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
      </Head>
      {/* Google Tag Manager */}
      <link rel='preconnect' href='https://www.googletagmanager.com' />
      <Script
        id='google-tag-manager'
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtm.js?id=${process.env.GOOGLE_TAG_MANAGER_ID}`}
        onLoad={() => {
          if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
          }
        }}
      />
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
};

export default MyApp;
