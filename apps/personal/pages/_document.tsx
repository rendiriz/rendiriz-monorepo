import { ReactElement } from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <Script
            strategy="worker"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NX_GA_TRACKING_ID}`}
          />
          <script
            type="text/partytown"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                window.gtag = function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${process.env.NX_GA_TRACKING_ID}', { 
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
          <script
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: `
                partytown = {
                  lib: "/_next/static/~partytown/",
                  debug: true
                };
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
