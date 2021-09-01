import style from "./CartItem.module.scss";
import CheckBtn from "../../../Ui/CheckBtn/CheckBtn";
import Btn from "../../../Ui/Btn/Btn";
import Icon from "../../../Ui/Icon";
import { connect } from "react-redux";
import { getPrice, separate } from "../../ProductPage/ProductPage";
import { mapSymbol } from "../../CurrencySelector/CurrencySelector";
import {
  remove_product_form_cart,
  upddate_amount,
} from "../../../store/actions";
import axios from "../../../axois";
import * as queries from "../../../store/queries";
import Spinner1 from "../../../Ui/Spinner1/Spinner1";
import { PureComponent } from "react";

class CartItem extends PureComponent {
  state = {
    productInfo: null,
    amount: null,
  };

  increment_amount = () => {
    const {
      state: { amount },
      props: {
        product: { cart_id },
        update_amount,
      },
    } = this;
    this.setState({ amount: amount + 1 });
    update_amount(amount + 1, cart_id);
  };

  decrement_amount = () => {
    const {
      state: { amount },
      props: {
        product: { cart_id },
        update_amount,
        remove_product_form_cart,
      },
    } = this;
    if (amount > 1) {
      this.setState({ amount: amount - 1 });
      update_amount(amount - 1, cart_id);
    } else {
      remove_product_form_cart(cart_id);
    }
  };

  componentDidMount() {
    const {
      props: {
        product: { id, amount },
        product,
      },
    } = this;
    if (product) {
      axios({
        data: {
          query: queries.product_query(id),
        },
      })
        .then((res) => {
          const {
            data: {
              data: { product },
            },
          } = res;
          this.setState({ productInfo: product });
        })
        .catch((err) => console.log(err));
      this.setState({ amount: amount });
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { amount: amount_s } = state;
    const { amount: amount_p } = props;
    let amount = amount_s;
    if (amount_p !== amount_s) {
      amount = amount_p;
    }

    return {
      amount: amount,
    };
  }

  render() {
    // _p for props && _s for State
    const {
      props: {
        big,
        product: { atts },
        product,
        currency: currency_p,
      },
      state: { productInfo },
    } = this;

    let scaleStyle = style.Container;
    if (big) {
      scaleStyle = style.ContainerBig;
    }

    let content = <Spinner1 />;

    if (product && productInfo) {
      // get attributes options that user choose
      const badages = [];
      for (const key in atts) {
        if (atts[key]) {
          badages.push(key);
        }
      }

      badages.forEach((i, index) => {
        const [itmeId, itemsId] = separate(i);
        badages[index] = [itmeId, itemsId];
      });

      const attOptoin = [];
      badages.forEach((i) => {
        productInfo.attributes.forEach((a) => {
          if (i[1] === a.id) {
            a.items.forEach((t) => {
              if (t.id === i[0]) {
                const type = a.type;
                const attTitle = a.name;
                attOptoin.push({ ...t, type, attTitle });
              }
            });
          }
        });
      });

      // prepare the price
      const [currency, price] = getPrice(productInfo, currency_p);

      content = (
        <div className={scaleStyle}>
          <div className={style.Left}>
            <span className={style.Name}>{productInfo.name}</span>
            <span className={style.Cat}>{productInfo.category}</span>
            <span className={style.Price}>
              {(price * this.state.amount).toFixed(2)} {mapSymbol(currency)}
            </span>
            <div className={style.Atts}>
              {attOptoin.map((i) => {
                return (
                  <div key={i.attTitle} className={style.attributeContainer}>
                    <p className={style.attTitle}>{i.attTitle}</p>
                    <CheckBtn
                      onlyView
                      type={i.type}
                      key={i.id + Math.random()}
                      changeHandler={() => {}}
                      id={i.id}
                      value={i.value}
                      checked={false}
                    >
                      {i.displayValue}
                    </CheckBtn>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={style.Right}>
            <div className={style.AmountSec}>
              <Btn onClick={() => this.increment_amount()} type="amount">
                <Icon icon="plus" size={18} color="#43464E" />
              </Btn>
              <span className={style.Amount}>{this.state.amount}</span>
              <Btn onClick={() => this.decrement_amount()} type="amount">
                <Icon icon="minus" size={18} color="#43464E" />
              </Btn>
            </div>
            <div className={style.ImgWrapper}>
              <img src={productInfo.gallery[0]} alt={productInfo.name}></img>
            </div>
          </div>
        </div>
      );
    }
    return content;
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_amount: (amount, id) => dispatch(upddate_amount(amount, id)),
    remove_product_form_cart: (id) => dispatch(remove_product_form_cart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
