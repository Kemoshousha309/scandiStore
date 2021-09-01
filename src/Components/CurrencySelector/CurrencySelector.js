import style from "./CurrencySelector.module.scss";
import Icon from "../../Ui/Icon";
import Backdrop from "../../Ui/Backdrop/Backdrop";
import Aux from "../../hoc/Aux";
import { connect } from "react-redux";
import { set_currency } from "../../store/actions";
import { PureComponent } from "react";

class CurrencySelector extends PureComponent {
  state = {
    show: false,
    value: "USD",
    currencies: null,
  };

  close = () => this.setState({ show: !this.state.show });

  updateValue = (e) => {
    const {
      target: { id },
    } = e;
    this.setState({
      value: id,
    });
    this.props.set_currency(id);
    this.close();
  };

  componentDidMount() {
    this.props.set_currency(this.state.value);
  }

  render() {
    const {
      state: { show, value },
      props: { currencies },
    } = this;

    let openStyle = style.hide;
    let arrowStyle = style.down;
    if (show) {
      openStyle = style.show;
      arrowStyle = style.up;
    }

    let content = <p>loading ...</p>;

    if (currencies) {
      content = (
        <Aux>
          <Backdrop clicked={this.close} open={show} color="transparent" />
          <div className={style.Select}>
            <button onClick={this.close} value={value}>
              {mapSymbol(value)}
              <Icon
                className={arrowStyle}
                size={10}
                color="#43464E"
                icon="chevron-up"
              />
            </button>
            <ul className={openStyle}>
              {currencies.map((i) => {
                return (
                  <li key={i} onClick={this.updateValue} id={i}>
                    {mapSymbol(i, this.updateValue)} {i}
                  </li>
                );
              })}
            </ul>
          </div>
        </Aux>
      );
    }

    return content;
  }
}

export const mapSymbol = (c, updateValue) => {
  switch (c) {
    case "GBP":
      return <span id={c}>&#163;</span>;
    case "AUD":
      return <span id={c}>&#36;</span>;
    case "YEN":
      return <span id={c}>&#165;</span>;
    case "RUB":
      return <span id={c}>&#8381;</span>;
    case "JPY":
      return <span id={c}>&#165;</span>;
    default:
      return <span id={c}>&#36;</span>;
  }
};

const mapStateToProps = (state) => {
  return {
    currencies: state.currencies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_currency: (cur) => dispatch(set_currency(cur)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelector);
