import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { gsap } from 'gsap';
import {
  LOADING_BACKGROUND,
  LOADING_LETTER,
} from '@rendiriz-ecosystem/personal/constants';
import styles from './loading.module.scss';

export function Loading() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const bg = useRef<HTMLInputElement>(null);
  const text = useRef<HTMLInputElement>(null);
  const letter = useRef<any>([]);

  const letters = 'Loading...'.split('');

  const aniStartInitial = useCallback(() => {
    console.log('Animation Start');

    const tl = gsap.timeline();
    tl.fromTo(
      bg.current,
      {
        height: '0%',
      },
      {
        delay: LOADING_BACKGROUND,
        height: '100%',
        duration: LOADING_BACKGROUND,
      },
    );
    tl.fromTo(
      text.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
    );
    tl.fromTo(
      letter.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        stagger: LOADING_LETTER,
        y: 0,
      },
    );
    tl.eventCallback('onComplete', function () {
      console.log('Animation Complete');
      setIsLoading(false);
    });
  }, []);

  const aniEndInitial = useCallback(() => {
    console.log('Animation End');

    const tl = gsap.timeline();
    tl.fromTo(
      letter.current,
      {
        opacity: 1,
        y: 0,
      },
      {
        opacity: 0,
        stagger: LOADING_LETTER,
        y: -50,
      },
    );
    tl.fromTo(
      text.current,
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
    );
    tl.fromTo(
      bg.current,
      {
        height: '100%',
      },
      {
        height: '0%',
        duration: LOADING_BACKGROUND,
      },
    );
    tl.eventCallback('onComplete', function () {
      console.log('Animation Complete');
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isLoading) {
      aniStartInitial();
    } else {
      aniEndInitial();
    }
  }, [isLoading]);

  const aniStartRouter = useCallback(() => {
    console.log('Animation Start');

    const tl = gsap.timeline();
    tl.fromTo(
      bg.current,
      {
        height: '0%',
      },
      {
        height: '100%',
        duration: LOADING_BACKGROUND,
      },
    );
    tl.fromTo(
      text.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
    );
    tl.fromTo(
      letter.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        stagger: LOADING_LETTER,
        y: 0,
      },
    );
  }, []);

  const aniEndRouter = useCallback(() => {
    console.log('Animation End');

    const tl = gsap.timeline();
    tl.fromTo(
      letter.current,
      {
        y: 0,
      },
      {
        delay: LOADING_BACKGROUND * 2 + letters.length * LOADING_LETTER,
        opacity: 0,
        stagger: LOADING_LETTER,
        y: -50,
      },
    );
    tl.fromTo(
      text.current,
      {
        opacity: 1,
      },
      {
        opacity: 0,
      },
    );
    tl.fromTo(
      bg.current,
      {
        height: '100%',
      },
      {
        height: '0%',
        duration: LOADING_BACKGROUND,
      },
    );
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', aniStartRouter);
    router.events.on('routeChangeComplete', aniEndRouter);
    router.events.on('routeChangeError', aniEndRouter);

    return () => {
      router.events.off('routeChangeStart', aniStartRouter);
      router.events.off('routeChangeComplete', aniEndRouter);
      router.events.off('routeChangeError', aniEndRouter);
    };
  }, [router]);

  return (
    <div className={classNames(styles.main)}>
      <div ref={bg} className={classNames(styles.background)} />
      <div ref={text} className={classNames(styles.text)}>
        {letters.map((l, i) => (
          <span
            key={i}
            ref={(el) => (letter.current[i] = el)}
            className={classNames(styles.letter)}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Loading;
