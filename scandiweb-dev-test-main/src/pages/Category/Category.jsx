import { PureComponent } from 'react';

import ProductsList from '../../PureComponents/Body/ProductsList';
import Loader from '../../PureComponents/Loader';

import styles from './Category.module.css';

class Category extends PureComponent {
  componentDidMount() {
    document.title = 'Category | Scandiweb Dev Test';
  }

  render() {
    const products = this.props.products;
    const categoryName = this.props.name;
    const loading = this.props.loading;
    const error = this.props.error;

    return (
      <main>
        <section className={styles.category}>
          {categoryName ? (
            <h1 className={styles.title}>{categoryName}</h1>
          ) : (
            <h1 className={styles.title}>{'all'}</h1>
          )}

          {products && (
            <ProductsList products={products} category={categoryName} />
          )}
        </section>

        {error && <p>{JSON.stringify(error.message)}</p>}

        {loading && <Loader />}
      </main>
    );
  }
}

export default Category;
