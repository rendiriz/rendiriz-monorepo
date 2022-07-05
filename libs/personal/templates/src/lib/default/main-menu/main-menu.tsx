import { useCallback } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@rendiriz-ecosystem/personal/hooks';
import styles from './main-menu.module.scss';

export function MainMenu() {
  const handleMenuEnter = useCallback((event: any) => {
    gsap.to(event.target, {
      backgroundColor: 'white',
    });
  }, []);

  const handleMenuLeave = useCallback((event: any) => {
    gsap.to(event.target, {
      backgroundColor: 'transparent',
    });
  }, []);

  useIsomorphicLayoutEffect(() => {
    const activeMenus = document.querySelectorAll('.menu-hover');

    [].forEach.call(activeMenus, (activeMenu: any) => {
      activeMenu.addEventListener('mouseenter', handleMenuEnter);
      activeMenu.addEventListener('mouseleave', handleMenuLeave);
    });
  }, []);

  return (
    <div
      className={classNames(
        styles.main,
        'main-menu',
        'w-full h-full fixed top-0 left-0 z-[9] pointer-events-none invisible overflow-hidden',
      )}
    >
      <div
        className={classNames(
          'main-menu-background',
          'bg-stone-200 dark:bg-slate-900 absolute w-0 h-full top-0 right-0',
        )}
      />
      <div className={classNames('absolute w-full h-full top-0 left-0')}>
        <div
          className={classNames(
            'absolute flex flex-col items-center justify-center left-0 w-full h-full',
          )}
        >
          <ul
            className={classNames(
              styles.listPrimary,
              'list-primary',
              'w-full text-center',
            )}
          >
            <li>
              <Link href="/work">
                <a
                  className={classNames(
                    'link-hover',
                    'font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
                    'text-stone-800',
                    'dark:text-slate-200',
                  )}
                >
                  WORK
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a
                  className={classNames(
                    'link-hover',
                    'font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
                    'text-stone-800',
                    'dark:text-slate-200',
                  )}
                >
                  ABOUT
                </a>
              </Link>
            </li>
            <li>
              <Link href="/blog">
                <a
                  className={classNames(
                    'link-hover',
                    'font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
                    'text-stone-800',
                    'dark:text-slate-200',
                  )}
                >
                  BLOG
                </a>
              </Link>
            </li>
          </ul>
          <ul
            className={classNames(
              styles.listSecondary,
              'list-secondary',
              'w-full text-center mt-2',
            )}
          >
            <li>
              <Link href="/note">
                <a
                  className={classNames(
                    'link-hover',
                    'text-stone-800',
                    'dark:text-slate-200',
                  )}
                >
                  Note
                </a>
              </Link>
            </li>
            <li>
              <Link href="/bookmark">
                <a
                  className={classNames(
                    'link-hover',
                    'text-stone-800',
                    'dark:text-slate-200',
                  )}
                >
                  Bookmark
                </a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a
                  className={classNames(
                    'link-hover',
                    'text-stone-800',
                    'dark:text-slate-200',
                  )}
                >
                  Contact
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
