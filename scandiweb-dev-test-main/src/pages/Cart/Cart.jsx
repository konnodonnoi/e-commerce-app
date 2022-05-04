import { PureComponent } from 'react';
import CartProduct from '../../PureComponents/Body/CartProduct/CartProduct';

import styles from './Cart.module.css';

class Cart extends PureComponent {
  componentDidMount() {
    document.title = 'Cart | Scandiweb Dev Test';
  }

  render() {
    return (
      <main>
        <section className={styles.section}>
          <h1 className={styles.title}>Cart</h1>

          <CartProduct />
        </section>
      </main>
    );
  }
}

export default Cart;
