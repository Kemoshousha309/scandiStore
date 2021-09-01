import { connect } from "react-redux";
import Btn from "../../Ui/Btn/Btn";
import CheckBtn from "../../Ui/CheckBtn/CheckBtn";
import style from "./ProductPage.module.scss";
import ReactHtmlParser from "react-html-parser";
import { mapSymbol } from "../CurrencySelector/CurrencySelector";
import { add_product_to_cart } from "../../store/actions";
import StatusBar from "../../Ui/StatusBar/StatusBar";
import Spinner1 from "../../Ui/Spinner1/Spinner1";
import axios from "../../axois";
import * as queries from "../../store/queries";
import { PureComponent } from "react";

class ProductPage extends PureComponent {
  state = {
    addCart: false,
    status: {
      mess: null,
      type: "success",
    },
    displayImag: null,
  };

  addCartHandler = () => {
    const {
      props: { add_product_to_cart },
      state: { product },
    } = this;

    add_product_to_cart(product);
    this.setState({
      status: {
        mess: "product is added",
        type: "success",
      },
    });

    // Timer
    let lastTimer = null;
    var timerId = setTimeout(() => {
      this.setState({
        status: {
          mess: null,
        },
      });
    }, 2000);
    if (lastTimer !== timerId && lastTimer) {
      clearTimeout(lastTimer);
    }
    lastTimer = timerId;
  };

  attChangeHandler = (e, id) => {
    const {
      target: { checked: value },
    } = e;
    const {
      state: {
        product: { atts },
      },
    } = this;
    const clickedItemsId = separate(id);
    const attsClone = { ...atts };
    for (const key in attsClone) {
      const itemsId = separate(key);
      if (itemsId[1] === clickedItemsId[1]) {
        attsClone[key] = false;
      }
    }
    attsClone[id] = value;
    const productClone = { ...this.state.product };
    productClone.atts = attsClone;
    // check the user choose an option to active add to chart
    const addCart = checkOptions(attsClone);
    this.setState({ product: productClone, addCart: addCart });
  };

  componentDidMount() {
    const {
      props: {
        location: { search },
      },
    } = this;
    const params = getParams(search);
    axios({
      data: {
        query: queries.product_query(params.id),
      },
    })
      .then((res) => {
        const {
          data: {
            data: { product },
          },
        } = res;
        this.setState({
          productInfo: product,
          displayImag: product.gallery[0],
        });
      })
      .catch((err) => console.log(err.response));
  }

  componentDidUpdate() {
    const {
      state: { product, productInfo },
    } = this;
    if (!product && productInfo) {
      const initAtt = initAttrs(productInfo.attributes);
      let addCart = false;
      if (Object.keys(initAtt).length === 0) {
        addCart = true;
      }
      this.setState({
        product: {
          id: productInfo.id,
          atts: initAtt,
        },
        addCart: addCart,
      });
    }
  }

  render() {
    let content = <Spinner1 />;

    const {
      state: {
        product,
        productInfo,
        addCart,
        displayImag,
        status: { mess, type },
      },
      props: { currency: currency_p },
    } = this;

    if (product && productInfo) {
      const [currency, price] = getPrice(productInfo, currency_p);
      content = (
        <div className={style.Container}>
          <div className={style.Left}>
            <div className={style.ImgContainer}>
              {productInfo.gallery.map((i) => {
                if (i !== 0) {
                  return (
                    <img
                      onClick={() => this.setState({ displayImag: i })}
                      key={i}
                      src={i}
                      alt={productInfo.name + i}
                      className={[style.Img, "img-fluid"].join(" ")}
                    ></img>
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <img
              src={displayImag}
              alt={productInfo.name}
              className={[style.MainImg, "img-fluid"].join(" ")}
            ></img>
          </div>
          <div className={style.Right}>
            <div className={style.Header}>
              <h1>{productInfo.name}</h1>
              <span>{productInfo.brand}</span>
            </div>
            {productInfo.attributes.map((i) => {
              return (
                <div key={i.name} className={style.Att}>
                  <span>{i.name}:</span>
                  <div>
                    {i.items.map((x) => {
                      const id = x.id + "_" + i.id;
                      return (
                        <CheckBtn
                          type={i.type}
                          key={id}
                          changeHandler={this.attChangeHandler}
                          id={id}
                          value={x.value}
                          checked={product.atts[id]}
                        >
                          {x.displayValue}
                        </CheckBtn>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div className={style.Price}>
              <span>price:</span>
              <span>
                {price} {mapSymbol(currency)}{" "}
              </span>
            </div>
            {productInfo.inStock ? (
              <Btn
                disable={!addCart}
                onClick={this.addCartHandler}
                width="100%"
                type="primary"
              >
                Add to cart
              </Btn>
            ) : null}
            <div className={style.Description}>
              {ReactHtmlParser(productInfo.description)}
            </div>
          </div>
          {mess ? <StatusBar type={type}>{mess}</StatusBar> : null}
        </div>
      );
    }
    return content;
  }
}

// UTILITY FUNCTIONS
export const getPrice = (product, cur) => {
  let [currency, price] = [null, null];
  product.prices.forEach((i) => {
    if (cur === i.currency) {
      [currency, price] = [i.currency, i.amount];
    }
  });
  return [currency, price];
};

export const separate = (str, splitor = "_") => {
  const arr = str.split(splitor);
  return [arr[0], arr[1]];
};

export const structre_atts_options = (options) => {
  const structured_obj = {};
  for (const key in options) {
    const [itemId, itemsId] = separate(key);
    structured_obj[itemsId] = {
      ...structured_obj[itemsId],
      [itemId]: options[key],
    };
  }
  return structured_obj;
};

const checkOptions = (options) => {
  // check if the user choose an option form each attribute

  // structure the options obj
  const structured_obj = structre_atts_options(options);
  // check if each property have at least a true value
  const accum = [];
  for (const key in structured_obj) {
    let check = false;
    for (const k in structured_obj[key]) {
      check = structured_obj[key][k] || check;
    }
    accum.push(check);
  }
  return accum.every((i) => i);
};

export const getParams = (str) => {
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === "&") {
      arr = str.split("&");
    } else {
    }
  }
  if (arr.length > 0) {
    // remove first char "?"
    arr[0] = arr[0].substring(1, arr[0].length);
  } else {
    arr[0] = str.substring(1, str.length);
  }
  const params = {};
  arr.forEach((i) => {
    const pair = i.split("=");
    params[pair[0]] = pair[1];
  });
  return params;
};

export const initAttrs = (attributes) => {
  const attr = {};
  attributes.forEach((i) => {
    attr[i.id] = i.items;
  });
  const att = {};
  for (const key in attr) {
    const item = attr[key];

    item.forEach((i) => {
      att[i.id + "_" + key] = false;
    });
  }
  return att;
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    currency: state.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_product_to_cart: (product) => dispatch(add_product_to_cart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
