import { PureComponent } from 'react';

import styles from './Loader.module.css';

class Loader extends PureComponent {
  render() {
    return <div className={styles.loader}></div>;
  }
}

export default Loader;
