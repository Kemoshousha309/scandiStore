import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  add_product_to_cart,
  remove_product_form_cart,
} from "../../store/actions";
import Icon from "../../Ui/Icon";
import StatusBar from "../../Ui/StatusBar/StatusBar";
import { mapSymbol } from "../CurrencySelector/CurrencySelector";
import { initAttrs, structre_atts_options } from "../ProductPage/ProductPage";
import style from "./CategoryPage.module.scss";
import Spinner1 from "../../Ui/Spinner1/Spinner1";
import * as queries from "../../store/queries";
import axios from "../../axois";
import { PureComponent } from "react";

class CategoryPage extends PureComponent {
  state = {
    status: {
      mess: null,
      type: "success",
    },
  };

  addCartHandler = (e, product) => {
    const initAtt = initAttrs(product.attributes);
    const structured_obj = structre_atts_options(initAtt);
    const defualt_attrs = get_defualt_options(structured_obj);

    if (this.props.cart[product.id]) {
      this.props.remove_product_form_cart(product.id);
      this.setState({
        status: {
          mess: "product is removed",
          type: "danger",
        },
      });

      // Timer
      let lastTimer = null;
      const timerId = setTimeout(() => {
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
    } else {
      if (Object.keys(defualt_attrs).length > 0) {
        // redirect to product page
        this.props.history.push(`/product?id=${product.id}`);
      } else {
        this.props.add_product_to_cart({
          id: product.id,
          atts: defualt_attrs,
        });
        this.setState({
          status: {
            mess: "product is added",
            type: "success",
          },
        });
        // Timer
        let lastTimer = null;
        const timerId = setTimeout(() => {
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
      }
    }
  };

  componentDidMount() {
    if (this.props.catName === "all") {
      axios({
        data: {
          query: queries.ALL_CATEGORIES_QUERY,
        },
      })
        .then((res) => {
          this.setState({ category: res.data.data.category });
        })
        .catch((err) => console.log(err.response));
    } else {
      axios({
        data: {
          query: queries.cat_query(this.props.catName),
        },
      })
        .then((res) => {
          this.setState({ category: res.data.data.category });
        })
        .catch((err) => console.log(err.response));
    }
  }

  render() {
    let content = <Spinner1 />;
    if (this.state.category) {
      // _p for props && _s for State
      const {
        category: { products: products_s },
        status: { type: statusType, mess: statusMess },
      } = this.state;

      const { catName: catName_p, currency: currency_p } = this.props;

      // prepare structured array to fit the grid
      const structuredArr = [];
      for (let i = 0; i < products_s.length; i += 3) {
        const slice = products_s.slice(i, i + 3);
        structuredArr.push(slice);
      }

      content = (
        <div className={style.Container}>
          <h1>{catName_p.toUpperCase()}</h1>
          <div className={style.Gallary}>
            {structuredArr.map((row, index) => {
              return (
                <div key={index} className="row">
                  {row.map((i, index) => {
                    // prepare the price
                    let [currency, price] = [null, null];
                    i.prices.forEach((c) => {
                      if (currency_p === c.currency) {
                        [currency, price] = [c.currency, c.amount];
                      }
                    });

                    // prepare the cart btn, classes and out stock
                    let column = null;
                    if (i.inStock) {
                      column = (
                        <div className="col-sm-4" key={i.id}>
                          <div className={style.productContainer}>
                            <button
                              className={style.addCart}
                              onClick={(e) => this.addCartHandler(e, i)}
                            >
                              <Icon
                                icon="shopping-cart"
                                size={16}
                                color="#fff"
                              />
                            </button>
                            <Link to={`/product?id=${i.id}&cat=${catName_p}`}>
                              <div
                                to={`/product?id=${i.id}&cat=${catName_p}`}
                                className={style.GallaryItem}
                              >
                                <img
                                  className="img-fluid"
                                  src={i.gallery[0]}
                                  alt={i.name}
                                ></img>
                                <span className={style.Name}>{i.name}</span>
                                <span className={style.Price}>
                                  {price} {mapSymbol(currency)}
                                </span>
                              </div>
                            </Link>
                          </div>
                        </div>
                      );
                    } else {
                      column = (
                        <div className="col-sm-4" key={i.id}>
                          <div
                            to={`/product?id=${i.id}&cat=${catName_p}`}
                            className={[style.GallaryItem, style.outStock].join(
                              " "
                            )}
                          >
                            <span className={style.outStockText}>
                              out of Stock
                            </span>
                            <img
                              className="img-fluid"
                              src={i.gallery[0]}
                              alt={i.name}
                                ></img>
                            <span className={style.Name}>{i.name}</span>
                            <span className={style.Price}>
                              {price} {mapSymbol(currency)}
                            </span>
                          </div>
                        </div>
                      );
                    }
                    return column;
                  })}
                </div>
              );
            })}
          </div>
          {statusMess ? (
            <StatusBar type={statusType}>{statusMess}</StatusBar>
          ) : null}
        </div>
      );
    }

    return content;
  }
}

// UTILITY FUNCTIONS
const get_defualt_options = (structre_atts_options) => {
  for (const key in structre_atts_options) {
    let flag = false;
    for (const k in structre_atts_options[key]) {
      if (!flag) {
        structre_atts_options[key][k] = true;
        flag = true;
      }
    }
  }

  const att = {};
  for (const key in structre_atts_options) {
    const item = structre_atts_options[key];

    for (const k in item) {
      att[k + "_" + key] = item[k];
    }
  }

  return att;
};

const mapStateToProps = (state) => {
  return {
    currency: state.currency,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_product_to_cart: (product) => dispatch(add_product_to_cart(product)),
    remove_product_form_cart: (id) => dispatch(remove_product_form_cart(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CategoryPage));
