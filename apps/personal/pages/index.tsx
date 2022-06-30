import React, { useState, useEffect } from 'react';

import { useTheme } from 'next-themes';

export function Index() {
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

export default Index;
