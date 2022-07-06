import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import {
  animationLoadingInitialStart,
  animationLoadingInitialEnd,
  animationLoadingRouterStart,
  animationLoadingRouterlEnd,
} from '@rendiriz-ecosystem/personal/utils';

// Styles
import styles from './loading.module.scss';
import stylesLogo from '../logo/logo.module.scss';
import stylesMenu from '../menu/menu.module.scss';

export function Loading() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const letters = 'Loading...'.split('');

  const aniStartInitial = useCallback(() => {
    console.log('Animation Start');

    const tl = animationLoadingInitialStart({
      loadingBackground: styles.background,
      loadingText: styles.text,
      loadingLetter: styles.letter,
    });

    tl.eventCallback('onComplete', function () {
      console.log('Animation Complete');
      setIsLoading(false);
    });
  }, []);

  const aniEndInitial = useCallback(() => {
    console.log('Animation End');

    const tl = animationLoadingInitialEnd({
      loadingBackground: styles.background,
      loadingText: styles.text,
      loadingLetter: styles.letter,
      loadingLogoLetter: stylesLogo.letter,
      loadingMenuLine: stylesMenu.line,
    });

    tl.eventCallback('onComplete', function () {
      console.log('Animation Complete');
      setIsLoading(false);
    });
  }, []);

  const aniStartRouter = useCallback(() => {
    console.log('Animation Start');

    animationLoadingRouterStart({
      loadingBackground: styles.background,
      loadingText: styles.text,
      loadingLetter: styles.letter,
    });
  }, []);

  const aniEndRouter = useCallback(() => {
    console.log('Animation End');

    animationLoadingRouterlEnd({
      loadingBackground: styles.background,
      loadingText: styles.text,
      loadingLetter: styles.letter,
      loadingLogoLetter: stylesLogo.letter,
      loadingMenuLine: stylesMenu.line,
    });
  }, []);

  useEffect(() => {
    if (isLoading) {
      aniStartInitial();
    } else {
      aniEndInitial();
    }
  }, [isLoading]);

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
      <div className={classNames(styles.background)} />
      <div className={classNames(styles.text)}>
        {letters.map((l, i) => (
          <span key={i} className={classNames(styles.letter)}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Loading;
