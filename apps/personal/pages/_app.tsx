import { ComponentType } from 'react';
import { NextComponentType } from 'next';
import Script from 'next/script';
import type { AppProps } from 'next/app';
import './styles.scss';

import { ThemeProvider } from 'next-themes';
import { TimelineMenuProvider } from '@rendiriz-ecosystem/personal/contexts';

interface AppWithLayout extends AppProps {
  Component: NextComponentType & { Layout: ComponentType };
}

function MyApp({ Component, pageProps }: AppWithLayout) {
  const getLayout: any = Component.Layout || ((page: any) => page);

  return (
    <>
      <ThemeProvider attribute="class">
        <TimelineMenuProvider>
          {getLayout(<Component {...pageProps} />)}
        </TimelineMenuProvider>
      </ThemeProvider>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NX_GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NX_GA_TRACKING_ID}', { 
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

export default MyApp;
