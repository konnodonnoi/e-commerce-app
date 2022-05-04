import { PureComponent } from 'react';
import CurrencySwitcher from '../CurrencySwitcher';
import CartPreview from '../../Body/CartPreview/CartPreview';
import styles from '../Navbar/navbar.module.css';
import { NavLink } from 'react-router-dom';
import { ReactComponent as LogoImage } from '../../../images/logo.svg';
import routes from '../../../routes';

class Navigation extends PureComponent {
  render() {
    const categories = this.props.categories;

    return (
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink
            exact
            to={routes.home}
            className={styles.link}
            activeClassName={styles['link--active']}
          >
            all
          </NavLink>
        </li>

        {categories &&
          categories.map(category => {
            return (
              <li className={styles.item} key={category.name}>
                <NavLink
                  exact
                  to={`/${category.name}`}
                  className={styles.link}
                  activeClassName={styles['link--active']}
                >
                  {category.name}
                </NavLink>
              </li>
            );
          })}
      </ul>
    );
  }
};

class Logo extends PureComponent {
  render() {
    return <LogoImage className={styles.logo} title="Logo" alt="Logo" />;
  }
};


class Header extends PureComponent {
  render() {
    return (
      <header className={styles.header}>
        <Navigation categories={this.props.categories} />
        <Logo />
        <div className={styles.wrapper}>
          <CurrencySwitcher />
          <CartPreview />
        </div>
      </header>
    );
  }
}

export default Header;
