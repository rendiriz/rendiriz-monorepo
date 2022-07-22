import type { AppProps } from 'next/app';
import type { AppRouter } from '../server/router';
import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import superjson from 'superjson';
import './styles.scss';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 3002}`;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      transformer: superjson,
      url,
      headers: {
        'x-ssr': '1',
      },
    };
  },
  ssr: true,
})(MyApp);
