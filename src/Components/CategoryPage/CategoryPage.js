import { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { mapSymbol } from "../CurrencySelector/CurrencySelector";
import style from "./CategoryPage.module.scss";


class CategoryPage extends Component {



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
                            return (
                                <Link key={i.id} 
                                to={`/product?id=${i.id}&cat=${this.props.catName}`} 
                                className={style.GallaryItem} 
                                     >
                                        <img src={i.gallery[0]} alt={i.name} ></img>
                                        <span className={style. Name} >{i.name}</span>
                                        <span className={style.Price} >{price} {mapSymbol(currency)}</span>
                                </Link>  
                            )
                        })
                    }
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        currency: state.currency
    }
  }

  
  
export default connect(mapStateToProps, null)(CategoryPage);