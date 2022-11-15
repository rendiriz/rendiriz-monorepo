import Image from 'next/image';
import styles from './hero-v2.module.scss';

export const HeroV2 = () => {
  return (
    <section data-scroll-section className={styles.main}>
      <div className="relative">
        <div className="flex justify-center opacity-20">
          <Image
            src="https://ik.imagekit.io/tlk1n6viqhs/rendiriz_com/h1_hwN4jJCEA.jpg"
            width={275}
            height={375}
            alt="Hero"
          />
        </div>
        <div className="absolute w-full text-slate-800 dark:text-stone-100 mix-blend-difference flex flex-col justify-center space-y-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="font-serif text-center text-5xl md:text-8xl">
            RENDI RIZ
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroV2;
