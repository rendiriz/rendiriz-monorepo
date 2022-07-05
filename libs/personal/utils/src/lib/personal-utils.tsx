import styles from './personal-utils.module.css';

/* eslint-disable-next-line */
export interface PersonalUtilsProps {}

export function PersonalUtils(props: PersonalUtilsProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to PersonalUtils!</h1>
    </div>
  );
}

export default PersonalUtils;
