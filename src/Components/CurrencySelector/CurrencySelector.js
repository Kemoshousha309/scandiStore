import { Component } from "react";
import style from "./CurrencySelector.module.scss";
import Icon from "../../Ui/Icon";
import Backdrop from "../../Ui/Backdrop/Backdrop";
import Aux from "../../hoc/Aux"
import { connect } from "react-redux";
import { set_currency } from "../../store/actions";

// This is a custom component to select the currency

class CurrencySelector extends Component {
    state = {
        show: false,
        value: "USD",
        currencies: null,
    }

    close = () => this.setState({show: !this.state.show})
    updateValue = (e) => {
        this.setState({
            value: e.target.id,
        })
        this.props.set_currency(e.target.id)
        this.close()
    }

    componentDidMount () {
        this.props.set_currency(this.state.value)
    }


    render () {
        let openStyle = style.hide;
        if(this.state.show){
            openStyle = style.show;
        }

        let arrowStyle = style.down;
        if(this.state.show){
            arrowStyle = style.up;
        }


        let content  = <p>loading ...</p>

        const currencies = this.props.currencies;
        if(currencies){ 
            content = (
                <Aux>
                    <Backdrop clicked={this.close} open={this.state.show} color="transparent" />
                    <div className={style.Select}>
                        <button onClick={this.close} value={this.state.value}>
                            {mapSymbol(this.state.value)}
                            <Icon className={arrowStyle} size={10} color="#43464E" icon="chevron-up" /> 
                        </button>
                        <ul className={openStyle}>
                            {
                                currencies.map(i => {
                                    return  <li key={i} onClick={this.updateValue} id={i}>{mapSymbol(i)} {i}</li>
                                })
                            }
                        </ul>
                    </div>
                </Aux>
            )
        }

        return content;
    }
}


export const mapSymbol = (c) => {
    switch (c) {
        case "GBP": return <span>&#163;</span>
        case "AUD": return <span>&#36;</span>
        case "YEN": return <span>&#165;</span>
        case "RUB": return <span>&#8381;</span>
        case "JPY": return <span>&#165;</span>
        default: return <span>&#36;</span>
    }
}


const mapStateToProps = state => {
    return {
        currencies: state.currencies
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        set_currency: (cur) => dispatch(set_currency(cur))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(CurrencySelector);
  