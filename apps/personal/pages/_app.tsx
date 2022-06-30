import React from 'react';
import { AppProps } from 'next/app';
import './styles.scss';

import { ThemeProvider } from 'next-themes';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default CustomApp;
