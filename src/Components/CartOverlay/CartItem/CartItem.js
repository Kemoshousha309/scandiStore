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
    this.setState({ amount: this.state.amount + 1 });
    this.props.update_amount(this.state.amount + 1, this.props.product.id);
  };

  decrement_amount = () => {
    if (this.state.amount > 1) {
      this.setState({ amount: this.state.amount - 1 });
      this.props.update_amount(this.state.amount - 1, this.props.product.id);
    } else {
      this.props.remove_product_form_cart(this.props.product.id);
    }
  };

  componentDidMount() {
    if (this.props.product) {
      axios({
        data: {
          query: queries.product_query(this.props.product.id),
        },
      })
        .then((res) => {
          this.setState({ productInfo: res.data.data.product });
        })
        .catch((err) => console.log(err));
      this.setState({ amount: this.props.product.amount });
    }
  }

  static getDerivedStateFromProps(props, state) {
    let amount = state.amount;
    if (props.amount !== state.amount) {
      amount = props.amount;
    }

    return {
      amount: amount,
    };
  }

  render() {
    // _p for props && _s for State
    const { big: big_p, product: product_p, currency: currency_p } = this.props;

    const { productInfo: productInfo_s } = this.state;

    let scaleStyle = style.Container;
    if (big_p) {
      scaleStyle = style.ContainerBig;
    }

    let content = <Spinner1 />;

    if (product_p && productInfo_s) {
      // get attributes options that user choose
      const productAttrs = product_p.atts;
      const badages = [];
      for (const key in productAttrs) {
        if (productAttrs[key]) {
          badages.push(key);
        }
      }

      badages.forEach((i, index) => {
        const [itmeId, itemsId] = separate(i);
        badages[index] = [itmeId, itemsId];
      });

      const attOptoin = [];
      badages.forEach((i) => {
        productInfo_s.attributes.forEach((a) => {
          if (i[1] === a.id) {
            a.items.forEach((t) => {
              if (t.id === i[0]) {
                const type = a.type;
                attOptoin.push({ ...t, type });
              }
            });
          }
        });
      });

      // prepare the price
      const [currency, price] = getPrice(productInfo_s, currency_p);

      content = (
        <div className={scaleStyle}>
          <div className={style.Left}>
            <span className={style.Name}>{productInfo_s.name}</span>
            <span className={style.Cat}>{productInfo_s.category}</span>
            <span className={style.Price}>
              {(price * this.state.amount).toFixed(2)} {mapSymbol(currency)}
            </span>
            <div className={style.Sizes}>
              {attOptoin.map((i) => {
                return (
                  <CheckBtn
                    type={i.type}
                    key={i.id + Math.random()}
                    changeHandler={() => {}}
                    id={i.id}
                    value={i.value}
                    checked={false}
                  >
                    {i.displayValue}
                  </CheckBtn>
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
              <img
                src={productInfo_s.gallery[0]}
                alt={productInfo_s.name}
              ></img>
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
