import classNames from 'classnames';
import styles from './work-hero.module.scss';

export function WorkHero() {
  return (
    <section data-scroll-section className={classNames(styles.main)}>
      <div className={classNames(styles.hero)}>
        <h1
          className={classNames(styles.title)}
          data-scroll
          data-scroll-speed="5"
          data-scroll-direction="horizontal"
        >
          WORK
        </h1>
        <h1
          className={classNames(styles.title)}
          data-scroll
          data-scroll-speed="-4"
          data-scroll-direction="horizontal"
        >
          WORK
        </h1>
        <h1
          className={classNames(styles.title)}
          data-scroll
          data-scroll-speed="3"
          data-scroll-direction="horizontal"
        >
          WORK
        </h1>
      </div>
    </section>
  );
}

export default WorkHero;
