import { useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import classNames from 'classnames';
import { useIsomorphicLayoutEffect } from '@rendiriz-ecosystem/personal/hooks';
import { DefaultContainer } from '@rendiriz-ecosystem/personal/templates';
import { Logo, Theme } from '@rendiriz-ecosystem/personal/templates';
import { Hero } from '@rendiriz-ecosystem/personal/components';

export function Home() {
  const main = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useIsomorphicLayoutEffect(() => {
    setMounted(true);

    let scroll: any;
    import('locomotive-scroll').then((LocomotiveScroll) => {
      scroll = new LocomotiveScroll.default({
        el: main.current,
        smooth: true,
        smoothMobile: false,
      });
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <main
        ref={main}
        className={classNames('content', 'w-full overflow-hidden opacity-100')}
      >
        <Hero />
        <Theme theme={theme} setTheme={setTheme} />
      </main>
    </>
  );
}

Home.Layout = function getLayout(page) {
  return <DefaultContainer>{page}</DefaultContainer>;
};

export default Home;
