import styles from './next-lib-one.module.css';

/* eslint-disable-next-line */
export interface NextLibOneProps {}

export function NextLibOne(props: NextLibOneProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to NextLibOne!</h1>
    </div>
  );
}

export default NextLibOne;
