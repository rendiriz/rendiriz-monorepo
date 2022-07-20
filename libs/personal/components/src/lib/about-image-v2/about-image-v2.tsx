/* eslint-disable @next/next/no-img-element */
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
              src="https://ik.imagekit.io/tlk1n6viqhs/rendiriz_com/rendiriz_qdEOK-0mA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658330330013"
              data-hover="https://ik.imagekit.io/tlk1n6viqhs/rendiriz_com/monalisa_68lY9RNQd.png?ik-sdk-version=javascript-1.4.3&updatedAt=1658330329807"
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
