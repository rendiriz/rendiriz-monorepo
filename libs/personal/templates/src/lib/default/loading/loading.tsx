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
    const tl = animationLoadingInitialStart({
      loadingBackground: styles.background,
      loadingLogo: stylesLogo.main,
      loadingLogoLetter: stylesLogo.letter,
    });

    tl.eventCallback('onComplete', function () {
      setIsLoading(false);
    });
  }, []);

  const aniEndInitial = useCallback(() => {
    const tl = animationLoadingInitialEnd({
      loadingBackground: styles.background,
      loadingMenuLine: stylesMenu.line,
    });

    tl.eventCallback('onComplete', function () {
      setIsLoading(false);
    });
  }, []);

  const aniStartRouter = useCallback(() => {
    animationLoadingRouterStart({
      loadingBackground: styles.background,
      loadingText: styles.text,
      loadingLetter: styles.letter,
    });
  }, []);

  const aniEndRouter = useCallback(() => {
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
