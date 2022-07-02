import { useCallback, useRef } from 'react';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@rendiriz-ecosystem/personal/hooks';
import styles from './cursor.module.scss';

export function Cursor() {
  const cursor = useRef<HTMLInputElement>(null);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    gsap.to(cursor.current, {
      top: event.clientY,
      left: event.clientX,
    });
  }, []);

  const handleLinkEnter = useCallback(() => {
    if (cursor.current) {
      cursor.current.classList.add(styles.linkHover);
    }
  }, []);

  const handleLinkLeave = useCallback(() => {
    if (cursor.current) {
      cursor.current.classList.remove(styles.linkHover);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    const activeLinks = document.querySelectorAll('.link-hover');

    [].forEach.call(activeLinks, (activeLink: any) => {
      activeLink.addEventListener('mouseenter', handleLinkEnter);
      activeLink.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={cursor} className={styles.main}>
      <div />
    </div>
  );
}

export default Cursor;
