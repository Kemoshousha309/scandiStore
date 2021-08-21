import { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import style from "./App.module.scss";
import CartPage from "./Components/CartPage/CartPage";
import CategoryPage from "./Components/CategoryPage/CategoryPage";
import Nav from "./Components/Nav/Nav";
import ProductPage from "./Components/ProductPage/ProductPage";
import {
  load_cart,
  req_categories,
  req_currencies,
  req_products,
} from "./store/actions";
import Spinner from "./Ui/Spinner/Spinner";

class App extends PureComponent {
  componentDidMount() {
    this.props.onLoadApp();
  }

  render() {
    let content = <Spinner />;

    const stateContent = [this.props.categories, this.props.products];

    if (stateContent.every((i) => i)) {
      // _p for props && _s for State
      const { products: products_p, categories: categories_p } = this.props;

      content = (
        <div className={style.Container}>
          <header>
            <Nav />
          </header>
          <main>
            <Switch>
              <Route path="/all">
                <CategoryPage products={products_p} catName="all" />{" "}
              </Route>
              {categories_p.map((i) => {
                return (
                  <Route key={i.name} path={`/${i.name}`}>
                    <CategoryPage
                      {...this.props}
                      products={products_p}
                      catName={i.name}
                    />{" "}
                  </Route>
                );
              })}
              <Route path="/product" component={ProductPage} />
              <Route path="/cart" component={CartPage} />
              <Redirect from="/" exact to={`/all`} />
            </Switch>
          </main>
        </div>
      );
    }
    return content;
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadApp: () => {
      dispatch(req_currencies());
      dispatch(req_categories());
      dispatch(req_products());
      dispatch(load_cart());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
