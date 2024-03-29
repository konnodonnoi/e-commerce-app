import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';

import SingleProduct from '../../PureComponents/Body/SingleProduct/SingleProduct';
import Loader from '../../PureComponents/Loader';

import styles from './Product.module.css';

class Product extends PureComponent {
  componentDidMount() {
    document.title = 'Product | Scandiweb Junior Dev Test II';
  }

  render() {
    const { data } = this.props;
    const { loading, error } = data;

    return (
      <main className={styles.main}>
        {data.product && <SingleProduct product={data.product} />}

        {error && <p>{JSON.stringify(data?.error?.message)}</p>}

        {loading && <Loader />}
      </main>
    );
  }
}

export default withRouter(
  graphql(
    gql`
      query GET_PRODUCT($productId: String!) {
        product(id: $productId) {
          id
          name
          inStock
          gallery
          description
          category
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          prices {
            currency
            amount
          }
          brand
        }
      }
    `,
    {
      options: props => ({
        variables: {
          productId: props.match.params.productId,
        },
      }),
    },
  )(Product),
);
