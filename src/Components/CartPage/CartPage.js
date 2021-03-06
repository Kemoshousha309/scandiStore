import { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../CartOverlay/CartItem/CartItem";
import style from "./CartPage.module.scss";

class CartPage extends Component {
  render() {
    const {
      props: { cart },
    } = this;

    const cartArr = [];
    for (const key in cart) {
      cartArr.push({ ...cart[key], cart_id: key });
    }

    return (
      <div className={style.Container}>
        <h1>Cart</h1>
        {cartArr.length > 0 ? (
          cartArr.map((i) => {
            return <CartItem key={i.cart_id} big product={i} amount={i.amount} />;
          })
        ) : (
          <p>
            The shopping cart is empty, you should add some products to see them
            here
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, null)(CartPage);
