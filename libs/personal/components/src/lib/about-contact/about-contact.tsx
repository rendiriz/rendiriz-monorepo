import { useCallback, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { gsap } from 'gsap';
import styles from './about-contact.module.scss';

export function AboutContact() {
  const headingRef = useRef<HTMLSpanElement[]>([]);
  const [count, setCount] = useState<number>(0);

  const word = ['BE FRIENDS', 'CREATE SOMETHING', 'WORK TOGETHER'];

  const handleWord = useCallback(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headingRef.current,
      {
        y: 45,
        opacity: 0,
      },
      {
        duration: 1,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'expo.out',
      },
    );

    tl.fromTo(
      headingRef.current,
      {
        y: 0,
      },
      {
        delay: 2,
        duration: 1,
        opacity: 0,
        y: -45,
        stagger: 0.1,
        ease: 'expo.in',
      },
    );

    tl.eventCallback('onComplete', function () {
      if (count < 2) {
        setCount(count + 1);
      } else {
        setCount(0);
      }
    });
  }, [count]);

  useEffect(() => {
    switch (count) {
      case 0:
        handleWord();
        break;
      case 1:
        handleWord();
        break;
      case 2:
        handleWord();
        break;
      default:
        break;
    }
  }, [count, handleWord]);

  return (
    <section data-scroll-section className={classNames(styles.main)}>
      <div className={classNames(styles.contact)}>
        <a
          className={classNames(styles.link, 'link-hover-contact')}
          href="mailto:rendirizkir@gmail.com"
        >
          <div className={classNames('flex flex-col lg:flex-row items-center')}>
            <h1 className={classNames(styles.title, 'mr-0 lg:mr-3 xl:mr-4')}>
              LET&apos;S
            </h1>
            <div
              className={classNames('block lg:flex relative overflow-hidden')}
            >
              <h1 className={classNames(styles.title)}>
                {word[count].split('').map((letter: string, i: number) => (
                  <span
                    key={i}
                    ref={(el) =>
                      (headingRef.current[i] = el as HTMLSpanElement)
                    }
                    className={classNames(styles.letter)}
                  >
                    {letter !== ' ' ? letter : '\u00A0'}
                  </span>
                ))}
              </h1>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

export default AboutContact;
