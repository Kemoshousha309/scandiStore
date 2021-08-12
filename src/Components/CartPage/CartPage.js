import { Component } from "react";
import { connect } from "react-redux";
import CartItem from "../CartOverlay/CartItem/CartItem";
import style  from "./CartPage.module.scss";



class CartPage extends Component {
    render () {
        const cartArr = [];
        for(let key in this.props.cart){
            cartArr.push(this.props.cart[key])
        }

        return(
            <div className={style.Container}>
                <h1>Cart</h1>
                {
                    cartArr.map(i => {
                       return <CartItem big  product={i}  />
                    })
                }
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}
  

  
export default connect(mapStateToProps, null)(CartPage);
  