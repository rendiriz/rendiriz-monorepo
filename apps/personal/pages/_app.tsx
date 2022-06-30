import { ComponentType } from 'react';
import { NextComponentType } from 'next';
import type { AppProps } from 'next/app';
import './styles.scss';

import { ThemeProvider } from 'next-themes';

interface AppWithLayout extends AppProps {
  Component: NextComponentType & { Layout: ComponentType };
}

function MyApp({ Component, pageProps }: AppWithLayout) {
  const getLayout: any = Component.Layout || ((page: any) => page);

  return (
    <ThemeProvider attribute="class">
      {getLayout(<Component {...pageProps} />)}
    </ThemeProvider>
  );
}

export default MyApp;
