import { useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import classNames from 'classnames';
import { useIsomorphicLayoutEffect } from '@rendiriz-ecosystem/personal/hooks';
import { DefaultContainer } from '@rendiriz-ecosystem/personal/templates';
import { Footer } from '@rendiriz-ecosystem/personal/templates';
import { Example, AboutContact } from '@rendiriz-ecosystem/personal/components';

export function About() {
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
        <section
          data-scroll-section
          className={classNames('h-[200px] lg:h-[250px]')}
        />
        <Example />
        <AboutContact />
        <Footer theme={theme} setTheme={setTheme} />
      </main>
    </>
  );
}

About.Layout = function getLayout(page) {
  return <DefaultContainer>{page}</DefaultContainer>;
};

export default About;
