import { useState, useRef } from 'react';
import { useTheme } from 'next-themes';
import classNames from 'classnames';
import { useIsomorphicLayoutEffect } from '@rendiriz-ecosystem/personal/hooks';
import { gsap } from 'gsap';
import { BlankContainer } from '@rendiriz-ecosystem/personal/templates';
import {
  Cursor,
  Logo,
  Menu,
  MenuClose,
  MainMenu,
  Hero,
} from '@rendiriz-ecosystem/personal/components';

export function Home() {
  const main = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useIsomorphicLayoutEffect(() => {
    setMounted(true);

    let scroll;
    import('locomotive-scroll').then((LocomotiveScroll) => {
      scroll = new LocomotiveScroll.default({
        el: main.current,
        smooth: true,
        smoothMobile: false,
      });
    });

    gsap.from(main.current, {
      duration: 0.9,
      ease: 'power1.in',
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
      <Cursor />
      <Logo type={'menu'} />
      <MenuClose />
      <Menu />
      <MainMenu />
      <main
        ref={main}
        className={classNames('content', 'w-full overflow-hidden opacity-100')}
      >
        <Logo type={'main'} />
        <Hero />
        <div
          data-scroll-section
          className="max-w-[1920px] mx-auto px-6 md:px-16 lg:px-20 xl:px-52 py-40"
        >
          <div>asd</div>
          <div>The current theme is: {theme}</div>
          <button type="button" onClick={() => setTheme('light')}>
            Light Mode
          </button>
          <button type="button" onClick={() => setTheme('dark')}>
            Dark Mode
          </button>
          <div className="ml-6 mt-6">
            <a href="#" className="link-hover">
              Test
            </a>
          </div>
        </div>
      </main>
    </>
  );
}

Home.Layout = function getLayout(page) {
  return <BlankContainer>{page}</BlankContainer>;
};

export default Home;
