import { useIsomorphicLayoutEffect } from '@rendiriz-ecosystem/personal/hooks';
import styles from './cursor.module.scss';

export function Cursor() {
  useIsomorphicLayoutEffect(() => {
    console.log(
      "In the browser, I'm an `useLayoutEffect`, but in SSR, I'm an `useEffect`.",
    );
  }, []);

  return (
    <div className={styles.main}>
      <h1>Welcome to Cursor!</h1>
    </div>
  );
}

export default Cursor;
