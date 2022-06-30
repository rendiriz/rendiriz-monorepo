import { useState, useEffect } from 'react';

import { useTheme } from 'next-themes';

import { BlankContainer } from '@rendiriz-ecosystem/personal/templates';
import { Cursor } from '@rendiriz-ecosystem/personal/components';

export function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="pages">
      <Cursor />
      <div>asd</div>
      <div>The current theme is: {theme}</div>
      <button type="button" onClick={() => setTheme('light')}>
        Light Mode
      </button>
      <button type="button" onClick={() => setTheme('dark')}>
        Dark Mode
      </button>
    </div>
  );
}

Home.Layout = function getLayout(page) {
  return <BlankContainer>{page}</BlankContainer>;
};

export default Home;
