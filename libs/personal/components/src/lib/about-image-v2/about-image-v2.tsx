import { useEffect } from 'react';
import classNames from 'classnames';
import styles from './about-image-v2.module.scss';
import Scene from './scene';

export function AboutImageV2() {
  useEffect(() => {
    new Scene();
  }, []);

  return (
    <>
      <section className={styles.main}>
        <article className={styles.tile}>
          <figure className={styles.tileFigure}>
            <img
              src="/rendiriz.png"
              data-hover="/rendiriz-2.png"
              className={classNames(styles.tileImage, 'about-tile-image')}
              alt="My image"
              width="425"
              height="635"
            />
          </figure>
        </article>
      </section>

      <canvas className={styles.canvas} id="about-image-stage"></canvas>
    </>
  );
}

export default AboutImageV2;
