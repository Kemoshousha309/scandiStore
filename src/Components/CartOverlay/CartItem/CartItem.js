import { Component } from "react";
import style from "./CartItem.module.scss";
import CheckBtn from "../../../Ui/CheckBtn/CheckBtn";
import Btn from "../../../Ui/Btn/Btn";
import Icon from "../../../Ui/Icon";
import { connect } from "react-redux";
import { getPrice, separate } from "../../ProductPage/ProductPage";
import { mapSymbol } from "../../CurrencySelector/CurrencySelector";
import { upddate_amount } from "../../../store/actions";

 

class CartItem extends Component { 

    state = {
        amount: null
    }

    increment_amount = () => {
        this.setState({amount: this.state.amount + 1})
        this.props.update_amount(this.state.amount + 1, this.props.product.id)
    }

    decrement_amount = () => {
        if(this.state.amount !== 1){
            this.setState({amount: this.state.amount - 1})
            this.props.update_amount(this.state.amount - 1, this.props.product.id)
        }
    }

  
    componentDidMount () {
        if(this.props.product){
            this.setState({amount: this.props.product.amount})
        }
    }


    render () {

         let scaleStyle = style.Container
        if(this.props.big){
            scaleStyle = style.ContainerBig
        }

        // get All products
        const allProducts = [];
        this.props.products.forEach(i => {
            allProducts.push(...i.products)
        });

        
        let content = null;
        
        if(this.props.product){
            
            // get product info to disply
            let productInfo = null
            allProducts.forEach(i => {
                if(i.id === this.props.product.id){
                    productInfo = i;
                }
            })

            
            // get attributes options that user choose
            const productAttrs = this.props.product.atts
            const badages = []
            for(let key in productAttrs){
                if(productAttrs[key]){
                    badages.push(key)
                }
            }

            badages.forEach((i, index) => {
                const [itmeId, itemsId] = separate(i)
                badages[index] = [itmeId, itemsId]
            });

            let attOptoin = [];
            badages.forEach(i => {
                productInfo.attributes.forEach(a => {
                    if(i[1] === a.id){
                        a.items.forEach(t => {
                            if(t.id === i[0]){
                                attOptoin.push(t)
                            }
                        });
                    }
                })
            });

            // prepare the price
            const [currency, price] = getPrice(productInfo, this.props.currency);

            content = (
                <div className={scaleStyle}>
                        <div className={style.Left}>
                        <span className={style.Name} >{productInfo.name}</span>
                        <span className={style.Cat}>{productInfo.category}</span>
                        <span className={style.Price}>{price} {mapSymbol(currency)}</span>
                        <div className={style.Sizes}>
                            {
                                attOptoin.map(i => {
                                    return (
                                        <CheckBtn 
                                        changeHandler={() => {}}
                                        id={i.id}
                                        value={i.value}
                                        checked={true}
                                        >{i.displayValue}</CheckBtn>

                                    )
                                })
                            }
                        </div>
                    </div>
    
                    <div className={style.Right}>
                        <div className={style.AmountSec}>
                            <Btn  onClick={() => this.increment_amount()} type="amount">
                                <Icon icon="plus" size={18} color="#43464E" />
                            </Btn>
                            <span className={style.Amount} >{this.state.amount}</span>
                            <Btn onClick={() => this.decrement_amount()} type="amount">
                                <Icon icon="minus" size={18 } color="#43464E" />
                            </Btn>
                        </div>
                        <div className={style.ImgWrapper}>
                            <img src={productInfo.gallery[0]} alt="product image" >
                            </img>
                        </div>
                    </div>  
                </div>
            )
        }

        return content;
    }
}

const mapStateToProps = state => {
    return {
        products: state.products,
        currency: state.currency
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        update_amount: (amount, id) => dispatch(upddate_amount(amount, id)) 
    }
}
 
  
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
  