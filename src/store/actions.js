import axios from "../axois";
import * as actionTypes from "./actionTypes";
import * as queries from "./queries";

const set_currencies = (curs) => ({
  type: actionTypes.SET_CURRENCIES,
  currencies: curs,
});
const set_categories = (cats) => ({
  type: actionTypes.SET_CATEGORIES,
  categories: cats,
});
const set_products = (products) => ({
  type: actionTypes.SET_PRODUCTS,
  products: products,
});
const init_cart = (cart) => ({ type: actionTypes.INIT_CART, cart: cart });
export const set_currency = (cur) => ({
  type: actionTypes.SET_CURRENCY,
  currency: cur,
});
export const upddate_amount = (amount, id) => ({
  type: actionTypes.UPDATE_AMOUNT,
  id: id,
  amount: amount,
});
export const add_product_to_cart = (product) => ({
  type: actionTypes.ADD_PRODUCT_TO_CART,
  product: product,
});
export const remove_product_form_cart = (id) => ({
  type: actionTypes.REMOVE_PRODUCT_FROM_CART,
  id: id,
});

export const req_currencies = () => {
  return (dispatch) => {
    axios({
      data: {
        query: queries.CURRENCY_QUERY,
      },
    })
      .then((res) => {
        const {
          data: {
            data: { currencies },
          },
        } = res;
        dispatch(set_currencies(currencies));
      })
      .catch((err) => console.log(err));
  };
};

export const req_categories = () => {
  return (dispatch) => {
    axios({
      data: {
        query: queries.CATEGORIES_QUERY,
      },
    })
    .then((res) => {
        const {
          data: {
            data: { categories },
          },
        } = res;
        dispatch(set_categories(categories));
      })
      .catch((err) => console.log(err.response));
  };
};

export const req_products = () => {
  return (dispatch) => {
    axios({
      data: {
        query: queries.PRODUCTS_QUERY,
      },
    })
      .then((res) => {
        const {
          data: {
            data: { categories },
          },
        } = res;
        dispatch(set_products(categories));
      })
      .catch((err) => console.log(err.response));
  };
};

export const load_cart = () => {
  return (dispatch) => {
    let cart = {};
    if (localStorage.getItem("cart")) {
      if (isExpire("cart", 60 * 60 * 24)) {
        localStorage.removeItem("cart");
        localStorage.removeItem("cart_storeTime");
      } else {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
    }

    dispatch(init_cart(cart));
  };
};

const isExpire = (itemName, expireTime) => {
  const currentTime = new Date().getTime();
  const storeTime = parseInt(localStorage.getItem(`${itemName}_storeTime`));
  const remainTime = currentTime - storeTime;
  return remainTime >= expireTime;
};
