import { NavLink } from "react-router-dom";
import DropMenu from "../../Ui/DropMenu/DropMenu";
import Item from "../../Ui/DropMenu/Item";
import Icon from "../../Ui/Icon";
import style from "./Nav.module.scss";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
import logo from "../../assests/logo.png";
import CartOverlay from "../CartOverlay/CartOverlay";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux";
import Backdrop from "../../Ui/Backdrop/Backdrop";
import { PureComponent } from "react";

class Nav extends PureComponent {
  state = {
    cartOverlayOpen: false,
    backdropOpen: false,
  };

  cartOverlayOpenHandler = () => {
    const {
      state: { cartOverlayOpen, backdropOpen },
    } = this;
    this.setState({
      cartOverlayOpen: !cartOverlayOpen,
      backdropOpen: !backdropOpen,
    });
  };

  render() {
    const {
      state: { cartOverlayOpen, backdropOpen },
      props: { cart, categories },
    } = this;

    // get number of products in cart
    const num = Object.keys(cart).length;


    return (
      <Aux>
        <Backdrop
          clicked={this.cartOverlayOpenHandler}
          open={backdropOpen}
          color="#39374838"
        />
        <nav className={style.Nav}>
          <div className={style.NavCategories}>
            <ul>
              <li>
                <NavLink activeClassName={style.Selectd} to="/all">
                  All
                </NavLink>
              </li>
              {categories.map((i) => {
                return (
                  <li key={i.name}>
                    <NavLink activeClassName={style.Selectd} to={i.name}>
                      {i.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={style.Logo}>
            <NavLink activeClassName={style.Selectd} to="/">
              {" "}
              <img src={logo} alt="logo"></img>
            </NavLink>
          </div>
          <div className={style.NavOptoins}>
            <div className={style.Optoin}>
              <CurrencySelector />
            </div>
            <div className={style.Optoin}>
              <Icon
                onClick={this.cartOverlayOpenHandler}
                icon="shopping-cart"
                size={16}
                color="#43464E"
              />
              {num > 0 ? (
                <span
                  onClick={this.cartOverlayOpenHandler}
                  className={style.CartCount}
                >
                  {num}
                </span>
              ) : null}
              <DropMenu open={cartOverlayOpen}>
                <Item>
                  {cartOverlayOpen ? (
                    <CartOverlay close={this.cartOverlayOpenHandler} />
                  ) : null}
                </Item>
              </DropMenu>
            </div>
          </div>
        </nav>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    cart: state.cart,
  };
};

export default connect(mapStateToProps, null)(Nav);
