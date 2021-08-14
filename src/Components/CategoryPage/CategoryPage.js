import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { add_product_to_cart, remove_product_form_cart } from "../../store/actions";
import Icon from "../../Ui/Icon";
import StatusBar from "../../Ui/StatusBar/StatusBar";
import { mapSymbol } from "../CurrencySelector/CurrencySelector";
import { initAttrs, structre_atts_options } from "../ProductPage/ProductPage";
import style from "./CategoryPage.module.scss";






class CategoryPage extends Component {

    state = {
        status: {
            mess: null,
            type: "success"
        }
    }

    addCartHandler = (e, product) => {
        const initAtt = initAttrs(product.attributes) 
        const structured_obj = structre_atts_options(initAtt);
        const defualt_attrs = get_defualt_options(structured_obj)
        
        if(this.props.cart[product.id]){
            this.props.remove_product_form_cart(product.id)
            this.setState({status: {
                mess: "product is removed",
                type: "danger"
            }})

            // Timer 
            let lastTimer = null
            var timerId = setTimeout(() => {
                this.setState({status: {
                    mess: null
                }})
            }, 2000);
            if(lastTimer !== timerId && lastTimer){
                clearTimeout(lastTimer)
            }
            lastTimer = timerId

        }else{
            this.props.add_product_to_cart({
                id: product.id,
                atts: defualt_attrs
            })
            this.setState({status: {
                mess: "product is added",
                type: "success"
            }})
           
            // Timer 
            let lastTimer = null
            var timerId = setTimeout(() => {
                this.setState({status: {
                    mess: null
                }})
            }, 2000);
            if(lastTimer !== timerId && lastTimer){
                clearTimeout(lastTimer)
            }
            lastTimer = timerId
        }
    }

    render() {

        let products = null;
        this.props.products.forEach(i => {
            if(i.name === this.props.catName){
                products = i.products
            }    
        });
        
        return (
            <div className={style.Container}>
                <h1>{this.props.catName.toUpperCase()}</h1>
                <div className={style.Gallary}>
                    {
                        products.map(i => {
                            let [currency, price] = [null, null];
                            i.prices.forEach(c => {
                                if(this.props.currency === c.currency){
                                    [currency, price] = [c.currency, c.amount]
                                }
                            })
                            
                            let cartBtn = (
                                <span className={style.outStock}>
                                    out of stock
                                </span>
                            )
                            if(i.inStock){
                                cartBtn = (
                                    <button onClick={(e) => this.addCartHandler(e, i)} >
                                        <Icon icon="shopping-cart" size={16} color="#fff" />
                                    </button>
                                )
                            }

                            return (
                                <div key={i.id} 
                                to={`/product?id=${i.id}&cat=${this.props.catName}`} 
                                className={style.GallaryItem} 
                                     >
                                         <Link to={`/product?id=${i.id}&cat=${this.props.catName}`} >
                                        <img src={i.gallery[0]} alt={i.name} ></img>
                                         </Link>
                                        {cartBtn}
                                        <span className={style. Name} >{i.name}</span>
                                        <span className={style.Price} >{price} {mapSymbol(currency)}</span>
                                </div>  
                            )
                        })
                    }
                    
                </div>
                {
                    this.state.status.mess ? <StatusBar type={this.state.status.type} >{this.state.status.mess}</StatusBar> : null 
                }
            </div>
        )
    }
}



const get_defualt_options = (structre_atts_options) => {

    for(let key in structre_atts_options){
        let flag = false
        for(let k in structre_atts_options[key]){
            if(!flag){
                structre_atts_options[key][k] = true
                flag = true
            }
        }
    }

    const att = {}
    for(let key in structre_atts_options) {
        const item = structre_atts_options[key];
        
        for(let k in item) {
            att[k + "_" + key] = item[k]
        }
    }

    return att;
}



const mapStateToProps = state => {
    return {
        currency: state.currency,
        products: state.products,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        add_product_to_cart: (product) =>  dispatch(add_product_to_cart(product)),
        remove_product_form_cart: (id) =>  dispatch(remove_product_form_cart(id))
    }
}

  
  
export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);