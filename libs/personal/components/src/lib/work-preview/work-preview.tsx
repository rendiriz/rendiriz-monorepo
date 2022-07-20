import { useCallback, useRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { gsap } from 'gsap';
import CSSRulePlugin from 'gsap/dist/CSSRulePlugin';
import styles from './work-preview.module.scss';

gsap.registerPlugin(CSSRulePlugin);

export function WorkPreview() {
  const listRef = useRef<HTMLLIElement[]>([]);
  const linkRef = useRef<HTMLAnchorElement[]>([]);
  const hoverRef = useRef<HTMLDivElement[]>([]);
  const hoverImageRef = useRef<HTMLDivElement[]>([]);

  const data = [
    {
      title: 'Kitabikin Invitation',
      backgroundBefore: 'before:bg-[#073B57]',
      backgroundAfter: 'after:bg-[#073B57]',
      image: '/kitabikin-invitation-2.png',
      tags: ['React', 'Next.js', 'Chakra UI'],
    },
    {
      title: 'Pikobar Case Reporting Dashboard',
      backgroundBefore: 'before:bg-[#27ae60]',
      backgroundAfter: 'after:bg-[#27ae60]',
      image: '/pikobar-pelaporan.png',
      tags: ['Vue', 'Vuetify'],
    },
    {
      title: 'West Java Data Ecosystem',
      backgroundBefore: 'before:bg-[#EEF6F8]',
      backgroundAfter: 'after:bg-[#EEF6F8]',
      image: '/ekosistem-data-jabar-1.png',
      tags: ['Angular', 'Bootstrap'],
    },
    {
      title: 'West Java Open Data',
      backgroundBefore: 'before:bg-[#006430]',
      backgroundAfter: 'after:bg-[#006430]',
      image: '/open-data-jabar-1.png',
      tags: ['Angular', 'Bootstrap', 'NgRx'],
    },
    {
      title: 'West Java One Data',
      backgroundBefore: 'before:bg-[#0753a6]',
      backgroundAfter: 'after:bg-[#0753a6]',
      image: '/satu-data-jabar-1.png',
      tags: ['Angular', 'Emotion', 'NgRx'],
    },
  ];

  const handleMouseMove = useCallback((event: MouseEvent, index: number) => {
    gsap.to(hoverRef.current[index], {
      top: event.clientY - event.clientY * 1.35,
      left: event.clientX,
    });
  }, []);

  const handleLinkEnter = useCallback((event: any, index: number) => {
    linkRef.current[index].addEventListener('mousemove', (event) => {
      handleMouseMove(event, index);
    });

    gsap.fromTo(
      hoverRef.current[index],
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
    );

    gsap.fromTo(
      hoverImageRef.current[index],
      {
        opacity: 0,
        x: '50%',
      },
      {
        opacity: 1,
        x: '0%',
      },
    );
  }, []);

  const handleLinkLeave = useCallback((event: any, index: number) => {
    linkRef.current[index].removeEventListener('mousemove', (event) => {
      handleMouseMove(event, index);
    });

    gsap.fromTo(
      hoverRef.current[index],
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
    );

    gsap.fromTo(
      hoverImageRef.current[index],
      {
        opacity: 1,
        x: '0%',
      },
      {
        opacity: 0,
        x: '50%',
      },
    );
  }, []);

  const handleListEnter = useCallback((event: any, index: number) => {
    if (listRef.current[index]) {
      listRef.current[index].classList.add(styles.itemHover);
    }
  }, []);

  const handleListLeave = useCallback((event: any, index: number) => {
    if (listRef.current[index]) {
      listRef.current[index].classList.remove(styles.itemHover);
    }
  }, []);

  return (
    <>
      <div data-scroll-section className={classNames(styles.main)}>
        <div className={classNames(styles.information, 'mb-4')}>
          <div className={classNames('font-mono')}>WORKS</div>
        </div>
        <ul className={classNames(styles.list)}>
          {data.map((item, index) => (
            <li
              key={index}
              ref={(el) => (listRef.current[index] = el as HTMLLIElement)}
              className={classNames(
                styles.item,
                `item-${index}`,
                'before:bg-stone-300 before:dark:bg-slate-700',
                item.backgroundAfter,
              )}
              onMouseEnter={(event) => handleListEnter(event, index)}
              onMouseLeave={(event) => handleListLeave(event, index)}
            >
              <Link href={'/work'}>
                <a
                  ref={(el) =>
                    (linkRef.current[index] = el as HTMLAnchorElement)
                  }
                  className={classNames(styles.link, 'link-hover')}
                  onMouseEnter={(event) => handleLinkEnter(event, index)}
                  onMouseLeave={(event) => handleLinkLeave(event, index)}
                >
                  <div className={classNames(styles.content)}>
                    <h1 className={classNames(styles.title)}>{item.title}</h1>
                    <div className="flex space-x-4 mt-4">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-sm inline-block py-1 leading-none text-center whitespace-nowrap align-baseline font-base text-stone-800 dark:text-slate-200 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    ref={(el) =>
                      (hoverRef.current[index] = el as HTMLDivElement)
                    }
                    className={classNames(styles.hover)}
                  >
                    <div
                      ref={(el) =>
                        (hoverImageRef.current[index] = el as HTMLDivElement)
                      }
                      className={classNames(styles.hoverImage)}
                      style={{
                        backgroundImage: `url(${item.image})`,
                      }}
                    ></div>
                  </div>
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div className={classNames(styles.information, 'mt-4')}>
          <Link href={'/work'}>
            <a
              className={classNames('link-hover', 'font-mono hover:underline')}
            >
              SEE ALL WORKS
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default WorkPreview;
