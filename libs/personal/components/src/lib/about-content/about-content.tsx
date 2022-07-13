import classNames from 'classnames';
import { AboutImageV2 } from '../about-image-v2/about-image-v2';
import styles from './about-content.module.scss';

export function AboutContent() {
  return (
    <section data-scroll-section className={classNames(styles.main)}>
      <div
        className={classNames(
          'grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-4',
        )}
      >
        <div className="lg:col-span-5 xl:col-span-4 relative lg:h-[500px]">
          <div
            className={classNames(
              'relative lg:absolute lg:top-[-40px] lg:right-[-140px] z-10 mb-8 lg:mb-0',
            )}
          >
            <h1
              className={classNames(
                'font-serif text-5xl lg:text-6xl xl:text-7xl',
              )}
            >
              RENDI
            </h1>
            <div className={classNames('flex items-end')}>
              <h1
                className={classNames(
                  'font-serif text-5xl lg:text-6xl xl:text-7xl',
                )}
              >
                RIZ
              </h1>
              <div
                className={classNames('font-mono ml-4 mb-[1px] lg:mb-[4px]')}
              >
                EST 1994
              </div>
            </div>
          </div>
          <div>
            <AboutImageV2 />
          </div>
        </div>
        <div
          className={classNames(
            'lg:col-span-6 lg:col-start-7 xl:col-span-7 xl:col-start-6',
          )}
        >
          <div className={classNames('flex flex-col h-full justify-center')}>
            <div className={classNames('font-bold text-xl mb-6')}>
              I write code, think about data, and create digital experiences.
            </div>
            <div className={classNames('mb-4')}>
              I&apos;ve been studying web development for 6+ years and business
              intelligence for 2+ years. Currently working with a super team at
              Jabar Digital Service in Bandung, Indonesia.
            </div>
            <div>
              If you have any exciting projects to talk about, or just want to
              be friends, feel free to hit me up.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutContent;
