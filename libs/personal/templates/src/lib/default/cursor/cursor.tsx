import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { gsap } from 'gsap';
import { useIsomorphicLayoutEffect } from '@rendiriz-ecosystem/personal/hooks';
import styles from './cursor.module.scss';

export function Cursor() {
  const router = useRouter();
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

  const handleLinkContactEnter = useCallback(() => {
    if (cursor.current) {
      cursor.current.classList.add(styles.linkHoverContact);
    }
  }, []);

  const handleLinkContactLeave = useCallback(() => {
    if (cursor.current) {
      cursor.current.classList.remove(styles.linkHoverContact);
    }
  }, []);

  const handleLinkEnterLeave = useCallback(() => {
    setTimeout(() => {
      const activeLinks = document.querySelectorAll('.link-hover');
      [].forEach.call(activeLinks, (activeLink: any) => {
        activeLink.addEventListener('mouseenter', handleLinkEnter);
        activeLink.addEventListener('mouseleave', handleLinkLeave);
      });

      const contacts = document.querySelectorAll('.link-hover-contact');
      [].forEach.call(contacts, (contact: any) => {
        contact.addEventListener('mouseenter', handleLinkContactEnter);
        contact.addEventListener('mouseleave', handleLinkContactLeave);
      });
    }, 3000);
  }, []);

  useIsomorphicLayoutEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    handleLinkEnterLeave();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', handleLinkEnterLeave);

    return () => {
      router.events.off('routeChangeStart', handleLinkEnterLeave);
    };
  }, [router]);

  return (
    <div ref={cursor} className={styles.main}>
      <span className={styles.contact}>Contact</span>
    </div>
  );
}

export default Cursor;
