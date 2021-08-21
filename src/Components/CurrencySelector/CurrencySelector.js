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
    this.setState({
      value: e.target.id,
    });
    this.props.set_currency(e.target.id);
    this.close();
  };

  componentDidMount() {
    this.props.set_currency(this.state.value);
  }

  render() {
    let openStyle = style.hide;
    if (this.state.show) {
      openStyle = style.show;
    }

    let arrowStyle = style.down;
    if (this.state.show) {
      arrowStyle = style.up;
    }

    let content = <p>loading ...</p>;

    // _p for props && _s for State
    const { currencies: currencies_p } = this.props;

    const { show: show_s, value: value_s } = this.state;

    if (currencies_p) {
      content = (
        <Aux>
          <Backdrop clicked={this.close} open={show_s} color="transparent" />
          <div className={style.Select}>
            <button onClick={this.close} value={value_s}>
              {mapSymbol(value_s)}
              <Icon
                className={arrowStyle}
                size={10}
                color="#43464E"
                icon="chevron-up"
              />
            </button>
            <ul className={openStyle}>
              {currencies_p.map((i) => {
                return (
                  <li key={i} onClick={this.updateValue} id={i}>
                    {mapSymbol(i)} {i}
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

export const mapSymbol = (c) => {
  switch (c) {
    case "GBP":
      return <span>&#163;</span>;
    case "AUD":
      return <span>&#36;</span>;
    case "YEN":
      return <span>&#165;</span>;
    case "RUB":
      return <span>&#8381;</span>;
    case "JPY":
      return <span>&#165;</span>;
    default:
      return <span>&#36;</span>;
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
