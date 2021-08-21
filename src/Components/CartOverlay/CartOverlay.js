import style from "./CartOverlay.module.scss";
import CartItem from "./CartItem/CartItem";
import Btn from "../../Ui/Btn/Btn";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { mapSymbol } from "../CurrencySelector/CurrencySelector";
import { PureComponent } from "react";

class CartOverlay extends PureComponent {
  render() {
    // _p for props && _s for State
    const {
      cart: cart_p,
      products: products_p,
      currency: currency_p,
      close: close_p,
    } = this.props;

    const cartArr = [];
    for (const key in cart_p) {
      cartArr.push(cart_p[key]);
    }

    // get All products
    const allProducts = [];
    products_p.forEach((i) => {
      allProducts.push(...i.products);
    });

    // get products prices
    const prices = [];
    cartArr.forEach((i) => {
      allProducts.forEach((p) => {
        if (i.id === p.id) {
          p.prices.forEach((c) => {
            if (c.currency === currency_p) {
              prices.push(c.amount * i.amount);
            }
          });
        }
      });
    });

    const total = prices.reduce((accum, current) => {
      return accum + current;
    }, 0);

    return (
      <div className={style.Container}>
        <div className={style.Header}>
          <h1>
            My Bag,{" "}
            <span>{cartArr.length > 0 ? `${cartArr.length} items` : null}</span>
          </h1>
        </div>
        <div className={style.Content}>
          {cartArr.map((i) => {
            return <CartItem key={i.id} product={i} amount={i.amount} />;
          })}
        </div>
        <div className={style.Footer}>
          <div className={style.TotalPrice}>
            <span>Total</span>
            <span>
              {total.toFixed(2)} {mapSymbol(currency_p)}
            </span>
          </div>
          <div className={style.CartActions}>
            <Link to="/cart" onClick={close_p}>
              <Btn type="outline">View bag</Btn>
            </Link>
            <Btn type="primary">check out</Btn>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: state.products,
    currency: state.currency,
  };
};

export default connect(mapStateToProps, null)(CartOverlay);
