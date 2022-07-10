import classNames from 'classnames';
import styles from './hero.module.scss';

export function Hero() {
  return (
    <section data-scroll-section className={styles.main}>
      <div
        className={classNames(
          'flex flex-col md:flex-row items-start md:items-end justify-between',
          'mb-10',
        )}
      >
        <div
          className={classNames(
            'flex flex-col items-start justify-center mb-4 md:mb-0',
          )}
        >
          <h1
            className={classNames(
              'font-serif text-5xl lg:text-7xl xl:text-8xl mt-0',
            )}
          >
            <span className={classNames('whitespace-nowrap')}>
              <span className={classNames('inline-block')}>H</span>
              <span className={classNames('inline-block')}>I</span>
              <span className={classNames('inline-block')}>,</span>
            </span>
            &nbsp;
            <span className={classNames('whitespace-nowrap')}>
              <span className={classNames('inline-block')}>I</span>
              <span className={classNames('inline-block')}>&apos;</span>
              <span className={classNames('inline-block')}>M</span>
            </span>
          </h1>
          <h1
            className={classNames(
              'font-serif text-5xl lg:text-7xl xl:text-8xl mt-0',
            )}
          >
            <span className={classNames('whitespace-nowrap')}>
              <span className={classNames('inline-block')}>R</span>
              <span className={classNames('inline-block')}>E</span>
              <span className={classNames('inline-block')}>N</span>
              <span className={classNames('inline-block')}>D</span>
              <span className={classNames('inline-block')}>I</span>
            </span>
            &nbsp;
            <span className={classNames('whitespace-nowrap')}>
              <span className={classNames('inline-block')}>R</span>
              <span className={classNames('inline-block')}>I</span>
              <span className={classNames('inline-block')}>Z</span>
            </span>
          </h1>
        </div>
        <div
          className={classNames(
            'font-light md:mb-[4px] lg:mb-[8px] xl:mb-[10px]',
          )}
        >
          * I&apos;m Business Intelligence Engineer <br />
          with interest in modern web development.
        </div>
      </div>
    </section>
  );
}

export default Hero;
