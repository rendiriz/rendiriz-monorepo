import { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@rendiriz-ecosystem/personal/hooks';
import { IconContext } from 'react-icons';
import { IoSunnySharp, IoMoonSharp } from 'react-icons/io5';
import styles from './blog-footer.module.scss';

export function BlogFooter({ theme, setTheme }: any) {
  const [isCopied, setIsCoppied] = useState<boolean>(false);
  const copy = useRef<HTMLDivElement>(null);
  const email = useRef<HTMLButtonElement>(null);
  const d = new Date();
  const year = d.getFullYear();

  const handleLinkEnter = useCallback(() => {
    gsap.fromTo(
      copy.current,
      {
        opacity: 0,
        scaleY: 0,
      },
      {
        duration: 0.35,
        opacity: 1,
        scaleY: 1,
      },
    );
  }, []);

  const handleLinkLeave = useCallback(() => {
    gsap.fromTo(
      copy.current,
      {
        opacity: 1,
        scaleY: 1,
      },
      {
        duration: 0.35,
        opacity: 0,
        scaleY: 0,
      },
    );
  }, []);

  useIsomorphicLayoutEffect(() => {
    email.current?.addEventListener('mouseenter', handleLinkEnter);
    email.current?.addEventListener('mouseleave', handleLinkLeave);
  });

  const handleCopied = useCallback(
    (value: string) => {
      navigator.clipboard.writeText(value);
      setIsCoppied(true);
      setTimeout(() => {
        setIsCoppied(false);
      }, 3000);
    },
    [setIsCoppied],
  );

  return (
    <div data-scroll-section className={classNames(styles.main)}>
      <footer className={classNames(styles.footer)}>
        <div className={classNames(styles.themeInformation)}>
          <div>
            <div
              className={classNames(
                styles.copyEmail,
                'opacity-100 block lg:hidden',
              )}
            >
              {!isCopied ? 'COPY EMAIL' : 'EMAIL COPIED'}
            </div>
            <div
              ref={copy}
              className={classNames(
                styles.copyEmail,
                'opacity-0 hidden lg:block',
              )}
            >
              {!isCopied ? 'COPY EMAIL' : 'EMAIL COPIED'}
            </div>
            <button
              ref={email}
              type="button"
              className={classNames(styles.email, 'link-hover')}
              onClick={() => handleCopied('rendirizkir@gmail.com')}
            >
              rendirizkir@gmail.com
            </button>
          </div>
          <div>
            <button
              type="button"
              className={classNames('link-hover')}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <IconContext.Provider value={{ size: '18' }}>
                  <IoSunnySharp />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ size: '18' }}>
                  <IoMoonSharp />
                </IconContext.Provider>
              )}
            </button>
          </div>
        </div>
        <div className={classNames(styles.copyrightSocial)}>
          <div>
            <a
              className={classNames(styles.link, 'link-hover')}
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
              target={'_blank'}
              rel="noreferrer"
            >
              CC BY-NC-SA 4.0
            </a>{' '}
            {year} <span className={classNames('font-sans')}>©</span> Rendi Riz.
          </div>
          <div className={classNames(styles.social)}>
            <ul className={classNames(styles.list)}>
              <li className={classNames(styles.item)}>
                <a
                  className={classNames(styles.link, 'link-hover')}
                  href="https://github.com/rendiriz"
                  target={'_blank'}
                  rel="noreferrer"
                >
                  Github
                </a>
              </li>
              <li className={classNames(styles.item)}>
                <a
                  className={classNames(styles.link, 'link-hover')}
                  href="https://www.linkedin.com/in/rendiriz/"
                  target={'_blank'}
                  rel="noreferrer"
                >
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BlogFooter;
