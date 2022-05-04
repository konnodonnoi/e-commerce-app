import { PureComponent, } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from '@apollo/client';
import { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from './PureComponents/Body/Container';
import Navbar from './PureComponents/Header/Navbar/Navbar';
import Loader from './PureComponents/Loader';

import './App.css';

const Category = lazy(() =>
  import('./pages/Category' /* webpackChunkName: "category-page" */),
);

const Product = lazy(() =>
  import('./pages/Product' /* webpackChunkName: "product-page" */),
);

const Cart = lazy(() =>
  import('./pages/Cart' /* webpackChunkName: "cart-page" */),
);

const Checkout = lazy(() =>
  import('./pages/Checkout' /* webpackChunkName: "checkout-page" */),
);

class App extends PureComponent {
  render() {
    const { data } = this.props;
    const { error, loading } = data;
    // const [cartItems, setCartItems] = useState([]);

    const all = data?.categories?.reduce((acc, item) => {
      acc.push(...item.products);
      return acc;
    }, []);

    return (
      <Container>
        <Navbar categories={data.categories} />

        <Suspense fallback={<Loader />}>
          <Switch>
            {data.categories && (
              <Route exact path="/">
                <Category
                  products={all}
                  error={data.error}
                  loading={data.loading}
                />
              </Route>
            )}

            {data.categories &&
              data.categories.map(category => {
                return (
                  <Route exact path={`/${category.name}`} key={category.name}>
                    <Category
                      products={category.products}
                      name={category.name}
                      error={data.error}
                      loading={data.loading}
                    />
                  </Route>
                );
              })}

            {data.categories &&
              data.categories.map(category => {
                return (
                  <Route
                    exact
                    path={`/${category.name}/:productId`}
                    key={category.name}
                  >
                    <Product />
                  </Route>
                );
              })}

            <Route exact path="/Cart">
              <Cart />
            </Route>

            <Route exact path="/Checkout">
              <Checkout />
            </Route>
          </Switch>
        </Suspense>

        {error && <p>{JSON.stringify(error.message)}</p>}

        {loading && <Loader />}
      </Container>
    );
  }
}

export default graphql(
  gql`
    query {
      categories {
        name
        products {
          id
          name
          inStock
          gallery
          category
          prices {
            currency
            amount
          }
          brand
        }
      }
    }
  `,
)(App);
