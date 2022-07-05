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

  // const handleMenuWorkEnter = useCallback(() => {
  //   if (cursor.current) {
  //     cursor.current.classList.add(styles.menuWorkHover);
  //   }
  // }, []);

  // const handleMenuWorkLeave = useCallback(() => {
  //   if (cursor.current) {
  //     cursor.current.classList.remove(styles.menuWorkHover);
  //   }
  // }, []);

  // const handleMenuAboutEnter = useCallback(() => {
  //   if (cursor.current) {
  //     cursor.current.classList.add(styles.menuAboutHover);
  //   }
  // }, []);

  // const handleMenuAboutLeave = useCallback(() => {
  //   if (cursor.current) {
  //     cursor.current.classList.remove(styles.menuAboutHover);
  //   }
  // }, []);

  // const handleMenuBlogEnter = useCallback(() => {
  //   if (cursor.current) {
  //     cursor.current.classList.add(styles.menuBlogHover);
  //   }
  // }, []);

  // const handleMenuBlogLeave = useCallback(() => {
  //   if (cursor.current) {
  //     cursor.current.classList.remove(styles.menuBlogHover);
  //   }
  // }, []);

  useIsomorphicLayoutEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    const activeLinks = document.querySelectorAll('.link-hover');
    [].forEach.call(activeLinks, (activeLink: any) => {
      activeLink.addEventListener('mouseenter', handleLinkEnter);
      activeLink.addEventListener('mouseleave', handleLinkLeave);
    });

    // const activeMenuWorks = document.querySelectorAll('.menu-work-hover');
    // [].forEach.call(activeMenuWorks, (activeMenu: any) => {
    //   activeMenu.addEventListener('mouseenter', handleMenuWorkEnter);
    //   activeMenu.addEventListener('mouseleave', handleMenuWorkLeave);
    // });

    // const activeMenuAbouts = document.querySelectorAll('.menu-about-hover');
    // [].forEach.call(activeMenuAbouts, (activeMenu: any) => {
    //   activeMenu.addEventListener('mouseenter', handleMenuAboutEnter);
    //   activeMenu.addEventListener('mouseleave', handleMenuAboutLeave);
    // });

    // const activeMenuBlogs = document.querySelectorAll('.menu-blog-hover');
    // [].forEach.call(activeMenuBlogs, (activeMenu: any) => {
    //   activeMenu.addEventListener('mouseenter', handleMenuBlogEnter);
    //   activeMenu.addEventListener('mouseleave', handleMenuBlogLeave);
    // });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={cursor} className={styles.main}>
      <span className={styles.work}>Work</span>
      <span className={styles.about}>About</span>
      <span className={styles.blog}>Blog</span>
    </div>
  );
}

export default Cursor;
