import { Component } from "react";
import { connect } from "react-redux";
import Btn from "../../Ui/Btn/Btn";
import RadioBtn from "../../Ui/RadioBtn/RadioBtn";
import style from './ProductPage.module.scss';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { mapSymbol } from "../CurrencySelector/CurrencySelector";



class ProductPage extends Component {
    render() {

        const params = getParams(this.props.location.search);   
        const product = getProduct(params.id, params.cat, this.props.products);

        let [currency, price] = [null, null];
        product.prices.map(i => {
            if(this.props.currency === i.currency){
                [currency, price] = [i.currency, i.amount]
            }
        })

        return (
            <div className={style.Container} >
                <div className={style.Left}>

                    <div className={style.ImgContainer}>

                        {
                            product.gallery.map(i => {
                                if(i !== 0){
                                    return (    
                                        <img src={i}
                                        alt={product.name + i}
                                        className={style.Img}></img>
                                        )
                                }
                            })
                        }

                    </div>

                    <img src={product.gallery[0]}
                    alt={product.name}
                    className={style.MainImg}></img>

                </div>
                <div className={style.Right}>

                    <div className={style.Header}>
                        <h1>{product.name}</h1>
                        <span>{product.brand}</span>
                    </div>

                    <div className={style.Sizes} >
                            <span>sizes:</span>
                            <div>
                                <RadioBtn  big disable={true} value="x-larg" name="size"  >xl</RadioBtn>
                                <RadioBtn   big disable={true} value="small" name="size" >s</RadioBtn>
                                <RadioBtn  big disable={false} value="mduim" name="size"  >m</RadioBtn>
                                <RadioBtn   big disable={true} value="larg" name="size" >l</RadioBtn>
                            </div>
                    </div>

                    <div className={style.Price} >
                            <span>price:</span>
                            <span>{price} {mapSymbol(currency)} </span>
                    </div>

                    <Btn width="100%" type="primary">Add to cart</Btn>

                    <div className={style.Description}>
                        {
                             ReactHtmlParser(product.description)
                        }

                    </div>

                </div>
            </div>
        )
    }
}

const getProduct = (id, cat, products) => {
    let relatedProducts = null
    products.forEach(i => {
        if(i.name === cat) {
            relatedProducts = i.products
        }
    });
    let product = null;
    relatedProducts.forEach(i => {
        if(i.id === id) {
            product = i
        }
    });

    return product;
}

const getParams = str => {
    let arr = null 
    for(let i=0; i < str.length; i++) {
        const char = str[i];
        if(char === "&" ){
            arr = str.split("&")  
        }
    }
    arr[0] = arr[0].substring(1, arr[0].length)
    
    const params = {}
    arr.forEach(i => {
        const pair = i.split("=")
        params[pair[0]] = pair[1]
    });

    return params; 
}

const mapStateToProps = state => {
    return {
        products: state.products,
        currency: state.currency
    }
  }
  
  
export default connect(mapStateToProps, null)(ProductPage);
  