import { Component } from "react";
import { connect } from "react-redux";
import Btn from "../../Ui/Btn/Btn";
import CheckBtn from "../../Ui/CheckBtn/CheckBtn";
import style from './ProductPage.module.scss';
import ReactHtmlParser from 'react-html-parser';
import { mapSymbol } from "../CurrencySelector/CurrencySelector";
import { add_product_to_cart } from "../../store/actions";
import StatusBar from "../../Ui/StatusBar/StatusBar";





class ProductPage extends Component {

    state = {
        addCart: false,
        status: {
            mess: null,
            type: "success"
        }
    }

    componentDidMount () {
        const params = getParams(this.props.location.search); 
        const product = getProduct(params.id, params.cat, this.props.products)
        const initAtt = initAttrs(product.attributes)
        this.setState({
            product: {
                id: product.id,
                atts: initAtt
            }
        })
    }

    addCartHandler = () => {
        this.props.add_product_to_cart(this.state.product)
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


    attChangeHandler = (e, id) => {

        const value = e.target.checked;
        const [clickedItemId, clickedItemsId] = separate(id)
        const attsClone = {...this.state.product.atts};

        for(let key in attsClone){
            const [itemId, itemsId] = separate(key)
            if(itemsId === clickedItemsId) {
                attsClone[key] = false
            }
        }

        attsClone[id] = value

        const productClone = {...this.state.product};
        productClone.atts = attsClone;

        // check the user choose an option to active add to chart
        const addCart = checkOptions(attsClone);

        this.setState({product: productClone, addCart: addCart})
        
    }

    render() {

        const params = getParams(this.props.location.search);   
        const product = getProduct(params.id, params.cat, this.props.products);

        const [currency, price] = getPrice(product, this.props.currency);
 

        let content = null;

        if(this.state.product) {
            content =  (
                <div className={style.Container} >
                    <div className={style.Left}>
    
                        <div className={style.ImgContainer}>
    
                            {
                                product.gallery.map(i => {
                                    if(i !== 0){
                                        return (    
                                            <img 
                                            key={i}
                                            src={i}
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
    
                        {
                            product.attributes.map(i => {
                                    return (
                                    <div key={i.name} className={style.Att} >
                                        <span>{i.name}:</span>
                                        <div>
                                            {
                                            i.items.map(x => {
                                                const id = x.id + "_" + i.id;
                                                return (
                                                    <CheckBtn 
                                                    type={i.type}
                                                    key={id}
                                                    changeHandler={this.attChangeHandler}
                                                    id={id}
                                                    value={x.value} 
                                                    checked={this.state.product.atts[id]}
                                                    >{x.displayValue}</CheckBtn>
                                                )
                                            })
                                            }
                                        </div>
                                    </div>
                                )
                            })   
                        }
    
                        <div className={style.Price} >
                                <span>price:</span>
                                <span>{price} {mapSymbol(currency)} </span>
                        </div>

                        {
                            product.inStock ? <Btn 
                            disable={!this.state.addCart} 
                            onClick={this.addCartHandler} 
                            width="100%" type="primary">Add to cart</Btn> : 
                            <span className={style.outStock}>out of stock</span>
                        }
    
    
                        <div className={style.Description}>
                            {
                                 ReactHtmlParser(product.description)
                            }
                        </div>
    
                    </div>
                    {
                    this.state.status.mess ? <StatusBar type={this.state.status.type} >{this.state.status.mess}</StatusBar> : null 
                }
                </div>
            )
        }

        return content;
    }
}




// UTILITY FUNCTIONS

export const getPrice = (product, cur) => {
    let [currency, price] = [null, null];
    product.prices.map(i => {
        if(cur === i.currency){
            [currency, price] = [i.currency, i.amount]
        }
    })
    return [currency, price]
}



export const getProduct = (id, cat, products) => {
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



export const separate = (str, splitor="_") => {
    const arr = str.split(splitor);
    return [arr[0], arr[1]]
}


export const structre_atts_options = (options) => {
    const structured_obj = {}
    for(let key in options){
        const [itemId, itemsId] = separate(key);
        structured_obj[itemsId] = {
            ...structured_obj[itemsId],
            [itemId]: options[key]
        }
    }
    return structured_obj;
}



const checkOptions = (options) => {
    // check if the user choose an option form each attribute

    // structure the options obj
    const structured_obj = structre_atts_options(options);

    // check if each property have at least a true value
    const accum = []
    for(let key in structured_obj){
        let check = false
        for(let k in structured_obj[key]){
            check = structured_obj[key][k] || check
        }
        accum.push(check)
    }

    return accum.every(i => i);

}


export const getParams = str => {
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


export const initAttrs = (attributes) => { 
        const attr = {}
        attributes.forEach(i => {
            attr[i.id] = i.items
        })
        const att  = {}
        for(let key in attr) {
            const item = attr[key];
            
            item.forEach(i => {
                att[i.id + "_" + key] = false
            })
        }

        return att
}


const mapStateToProps = state => {
    return {
        products: state.products,
        currency: state.currency
    }
}


const mapDispatchToProps = dispatch => {
    return {
        add_product_to_cart: (product) =>  dispatch(add_product_to_cart(product))
    }
}
  
  
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
  