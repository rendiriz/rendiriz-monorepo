import Link from 'next/link';
import classNames from 'classnames';
import styles from './main-menu.module.scss';

export function MainMenu() {
  return (
    <div className={classNames(styles.main)}>
      <div className={classNames(styles.background)} />
      <div className={classNames('absolute w-full h-full top-0 left-0')}>
        <div
          className={classNames(
            'absolute flex flex-col items-center justify-center left-0 w-full h-full',
          )}
        >
          <ul className={classNames(styles.listPrimary)}>
            <li className={classNames(styles.itemPrimary)}>
              <Link href="/work">
                <a className={classNames(styles.linkPrimary, 'link-hover')}>
                  {'WORK'.split('').map((letter: string, i: number) => (
                    <span key={i} className={classNames(styles.letterPrimary)}>
                      {letter}
                    </span>
                  ))}
                </a>
              </Link>
            </li>
            <li className={classNames(styles.itemPrimary)}>
              <Link href="/about">
                <a className={classNames(styles.linkPrimary, 'link-hover')}>
                  {'ABOUT'.split('').map((letter: string, i: number) => (
                    <span key={i} className={classNames(styles.letterPrimary)}>
                      {letter}
                    </span>
                  ))}
                </a>
              </Link>
            </li>
            <li className={classNames(styles.itemPrimary)}>
              <Link href="/blog">
                <a className={classNames(styles.linkPrimary, 'link-hover')}>
                  {'BLOG'.split('').map((letter: string, i: number) => (
                    <span key={i} className={classNames(styles.letterPrimary)}>
                      {letter}
                    </span>
                  ))}
                </a>
              </Link>
            </li>
          </ul>
          <ul className={classNames(styles.listSecondary)}>
            <li className={classNames(styles.itemSecondary)}>
              <Link href="/note">
                <a className={classNames(styles.linkSecondary, 'link-hover')}>
                  {'Snippets'.split('').map((letter: string, i: number) => (
                    <span
                      key={i}
                      className={classNames(styles.letterSecondary)}
                    >
                      {letter}
                    </span>
                  ))}
                </a>
              </Link>
            </li>
            <li className={classNames(styles.itemSecondary)}>
              <Link href="/bookmark">
                <a className={classNames(styles.linkSecondary, 'link-hover')}>
                  {'Bookmarks'.split('').map((letter: string, i: number) => (
                    <span
                      key={i}
                      className={classNames(styles.letterSecondary)}
                    >
                      {letter}
                    </span>
                  ))}
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
