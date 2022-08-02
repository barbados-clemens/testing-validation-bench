import styles from './react-lib-one.module.scss';

/* eslint-disable-next-line */
export interface ReactLibOneProps {}

export function ReactLibOne(props: ReactLibOneProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ReactLibOne!</h1>
    </div>
  );
}

export default ReactLibOne;
