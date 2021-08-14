import { Component } from "react";
import style from "./CartOverlay.module.scss"
import CartItem from "./CartItem/CartItem";
import Btn from "../../Ui/Btn/Btn";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { mapSymbol } from "../CurrencySelector/CurrencySelector";



class CartOverlay extends Component {
    render() {
        const cartArr = [];
        for(let key in this.props.cart){
            cartArr.push(this.props.cart[key])
        }

        
        // get All products
        const allProducts = [];
        this.props.products.forEach(i => {
            allProducts.push(...i.products)
        });
        
        // get products prices  
        const prices = []
        cartArr.forEach(i => {     
            allProducts.forEach(p => {
                if(i.id === p.id){
                    p.prices.forEach(c => {
                        if(c.currency === this.props.currency){
                            prices.push(c.amount * i.amount)
                        }                        
                    })
                }
            })
        })

        const total = prices.reduce((accum, current) => {
            return accum + current
        }, 0)


        return (
            <div className={style.Container}>
                <div className={style.Header}>
                    <h1>My Bag, <span>{cartArr.length > 0 ? `${cartArr.length} items`: null }</span></h1>
                </div>

                <div className={style.Content} >
                {
                    cartArr.map(i => {
                    return <CartItem  key={i.id} product={i} amount={i.amount} />
                    })
                }

                </div>

                <div className={style.Footer}>
                    <div className={style.TotalPrice}>
                        <span>Total</span>
                        <span>{total.toFixed(2)} {mapSymbol(this.props.currency)}</span>
                    </div>

                    <div className={style.CartActions}>
                        <Link to="/cart" onClick={this.props.close} ><Btn type="outline">View bag</Btn></Link>
                        <Btn type="primary">check out</Btn>
                    </div>
                </div>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        cart: state.cart,
        products: state.products,
        currency: state.currency         
    }
}
  

  
export default connect(mapStateToProps, null)(CartOverlay);
  

