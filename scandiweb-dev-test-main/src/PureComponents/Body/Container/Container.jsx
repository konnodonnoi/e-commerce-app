import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import styles from './Container.module.css';

class Container extends PureComponent {
  render() {
    return <div className={styles.container}>{this.props.children}</div>;
  }
}

Container.defaultProps = {
  children: [],
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
