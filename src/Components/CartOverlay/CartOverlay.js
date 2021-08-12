import { Component } from "react";
import style from "./CartOverlay.module.scss"
import CartItem from "./CartItem/CartItem";
import Btn from "../../Ui/Btn/Btn";
import { Link } from "react-router-dom";
import { connect } from "react-redux";



class CartOverlay extends Component {
    render() {
        const cartArr = [];
        for(let key in this.props.cart){
            cartArr.push(this.props.cart[key])
        }

        return (
            <div className={style.Container}>
                <div className={style.Header}>
                    <h1>My Bag<span>,<i>2</i> items</span></h1>
                </div>

                <div className={style.Content} >
                {
                    cartArr.map(i => {
                    return <CartItem  product={i}  />
                    })
                }

                </div>

                <div className={style.Footer}>
                    <div className={style.TotalPrice}>
                        <span>Total</span>
                        <span>$100.00</span>
                    </div>

                    <div className={style.CartActions}>
                        <Link to="/cart" ><Btn type="outline">View bag</Btn></Link>
                        <Btn type="primary">check out</Btn>
                    </div>
                </div>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}
  

  
export default connect(mapStateToProps, null)(CartOverlay);
  

