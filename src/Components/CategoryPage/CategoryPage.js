import { Component } from "react";
import style from "./CategoryPage.module.scss";

class CategoryPage extends Component {
    render() {
        return (
            <div className={style.Container}>
                <h1>{this.props.catName}</h1>
                <div className={style.Gallary}>
                    <div className={style.GallaryItem}>
                        <img src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087" alt="product photo" ></img>
                        <span className={style.Name} >Apollo Running Short</span>
                        <span className={style.Price} >13$</span>
                    </div>  

                    <div className={style.GallaryItem}>
                        <img src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087" alt="product photo" ></img>
                        <span className={style.Name} >Apollo Running Short</span>
                        <span className={style.Price} >13$</span>
                    </div>  

                    <div className={style.GallaryItem}>
                        <img src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087" alt="product photo" ></img>
                        <span className={style.Name} >Apollo Running Short</span>
                        <span className={style.Price} >13$</span>
                    </div>  


                    <div className={style.GallaryItem}>
                        <img src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087" alt="product photo" ></img>
                        <span className={style.Name} >Apollo Running Short</span>
                        <span className={style.Price} >13$</span>
                    </div>  

                    
                    
                </div>
            </div>
        )
    }
}

export default CategoryPage;

