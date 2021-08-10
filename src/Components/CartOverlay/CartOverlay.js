import { Component } from "react";
import style from "./CartOverlay.module.scss"
import CartItem from "./CartItem/CartItem";
import Btn from "../../Ui/Btn/Btn";

class CartOverlay extends Component {
    render() {
        return (
            <div className={style.Container}>
                <div className={style.Header}>
                    <h1>My Bag<span>,<i>2</i> items</span></h1>
                </div>

                <div className={style.Content} >
                    <CartItem />
                    <CartItem />

                </div>

                <div className={style.Footer}>
                    <div className={style.TotalPrice}>
                        <span>Total</span>
                        <span>$100.00</span>
                    </div>

                    <div className={style.CartActions}>
                        <Btn type="outline">View bag</Btn>
                        <Btn type="primary">check out</Btn>
                    </div>
                </div>

            </div>
        )
    }
}

export default CartOverlay; 