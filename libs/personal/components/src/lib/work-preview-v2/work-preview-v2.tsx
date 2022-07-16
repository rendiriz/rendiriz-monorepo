import React, { useCallback, useRef } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { gsap } from 'gsap';
import styles from './work-preview-v2.module.scss';

export function WorkPreviewV2() {
  const itemRef = useRef<HTMLDivElement[]>([]);
  const marqueeRef = useRef<HTMLDivElement[]>([]);
  const marqueeInnerRef = useRef<HTMLDivElement[]>([]);

  const data = [
    {
      link: '/work',
      title: 'Kitabikin Invitation',
      background: 'bg-[#073B57]',
    },
    {
      link: '/work',
      title: 'Pikobar Case Reporting Dashboard',
      background: 'bg-[#27ae60]',
    },
    {
      link: '/work',
      title: 'West Java Executive Dashboard',
      background: 'bg-[#000]',
    },
    {
      link: '/work',
      title: 'West Java Data Ecosystem',
      background: 'bg-[#EEF6F8]',
    },
    {
      link: '/work',
      title: 'West Java Open Data',
      background: 'bg-[#006430]',
    },
    {
      link: '/work',
      title: 'West Java One Data',
      background: 'bg-[#0753a6]',
    },
    {
      link: '/work',
      title: 'eFarmasi Infokes',
      background: 'bg-[#F9C977]',
    },
    {
      link: '/work',
      title: 'Unit of Work - West Java Ministry of Public Works and Housing',
      background: 'bg-[#F6ED23]',
    },
    {
      link: '/work',
      title: 'Point of Sales - Ares Telur',
      background: 'bg-[#334148]',
    },
    {
      link: '/work',
      title: 'Enterprise Resource Planning - Siomay Kering H.Ade',
      background: 'bg-[#334148]',
    },
    {
      link: '/work',
      title: 'Licensing of Personnel and Facilities - Bandung Health Office',
      background: 'bg-[#8ED0CC]',
    },
    {
      link: '/work',
      title: 'Laundry Londress Beauty',
      background: 'bg-[#E3594D]',
    },
    {
      link: '/work',
      title: 'Academic - Indonesian Defense University',
      background: 'bg-[#A30000]',
    },
    {
      link: '/work',
      title: 'Student Admission - Indonesian Defense University',
      background: 'bg-[#A30000]',
    },
    {
      link: '/work',
      title: 'Logistics - Ministry of Social Affairs Republic of Indonesia',
      background: 'bg-[#347AB6]',
    },
  ];

  const findClosestEdge = useCallback((event: any, index: number) => {
    const distMetric = (x: any, y: any, x2: any, y2: any) => {
      const xDiff = x - x2;
      const yDiff = y - y2;
      return xDiff * xDiff + yDiff * yDiff;
    };

    const closestEdge = (x: any, y: any, w: any, h: any) => {
      const topEdgeDist = distMetric(x, y, w / 2, 0);
      const bottomEdgeDist = distMetric(x, y, w / 2, h);
      const min = Math.min(topEdgeDist, bottomEdgeDist);
      return min === topEdgeDist ? 'top' : 'bottom';
    };

    const x = event.pageX - itemRef.current[index].offsetLeft;
    const y = event.pageY - itemRef.current[index].offsetTop;
    return closestEdge(
      x,
      y,
      itemRef.current[index].clientWidth,
      itemRef.current[index].clientHeight,
    );
  }, []);

  const handleLinkEnter = useCallback((event: any, index: number) => {
    const edge = findClosestEdge(event, index);

    gsap
      .timeline({ defaults: { duration: 0.6, ease: 'expo' } })
      .set(
        marqueeRef.current[index],
        { y: edge === 'top' ? '-101%' : '101%' },
        0,
      )
      .set(
        marqueeInnerRef.current[index],
        { y: edge === 'top' ? '101%' : '-101%' },
        0,
      )
      .to(
        [marqueeRef.current[index], marqueeInnerRef.current[index]],
        { y: '0%' },
        0,
      );
  }, []);

  const handleLinkLeave = useCallback((event: any, index: number) => {
    const edge = findClosestEdge(event, index);

    gsap
      .timeline({ defaults: { duration: 0.6, ease: 'expo' } })
      .to(
        marqueeRef.current[index],
        { y: edge === 'top' ? '-101%' : '101%' },
        0,
      )
      .to(
        marqueeInnerRef.current[index],
        { y: edge === 'top' ? '101%' : '-101%' },
        0,
      );
  }, []);

  return (
    <section data-scroll-section className={classNames(styles.main)}>
      <div className={classNames(styles.list)}>
        {data.map((item, index) => (
          <div
            key={index}
            ref={(el) => (itemRef.current[index] = el as HTMLDivElement)}
            className={classNames(styles.item)}
          >
            <Link href={item.link}>
              <a
                className={classNames(styles.link, 'link-hover')}
                onMouseEnter={(event) => handleLinkEnter(event, index)}
                onMouseLeave={(event) => handleLinkLeave(event, index)}
              >
                {item.title}
              </a>
            </Link>
            <div
              ref={(el) => (marqueeRef.current[index] = el as HTMLDivElement)}
              className={classNames(styles.marquee)}
            >
              <div
                ref={(el) =>
                  (marqueeInnerRef.current[index] = el as HTMLDivElement)
                }
                className={classNames(styles.marqueeInnerWrap)}
              >
                <div className={classNames(styles.marqueeInner)}>
                  {[0, 1, 2, 3, 4, 5].map((_, i) => (
                    <React.Fragment key={i}>
                      <span>{item.title}</span>
                      <div
                        className={classNames(
                          styles.marqueeImage,
                          item.background,
                        )}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WorkPreviewV2;
