import classNames from 'classnames';
import styles from './theme.module.scss';

export function Theme({ theme, setTheme }: any) {
  return (
    <section data-scroll-section className={classNames(styles.main)}>
      <ul className={classNames('flex flex-row')}>
        <li>
          <button
            type="button"
            className={classNames(styles.button, 'link-hover')}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? 'light' : 'dark'}
          </button>
        </li>
      </ul>
    </section>
  );
}

export default Theme;
