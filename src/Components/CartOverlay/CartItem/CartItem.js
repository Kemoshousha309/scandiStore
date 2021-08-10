import { Component } from "react";
import style from "./CartItem.module.scss";
import RadioBtn from "../../../Ui/RadioBtn/RadioBtn";
import Btn from "../../../Ui/Btn/Btn";
import Icon from "../../../Ui/Icon";

class CartItem extends Component { 
    render () {
        return (
            <div className={style.Container}>
                <div className={style.Left}>
                    <span className={style.Name} >Apollo</span>
                    <span className={style.Cat}>Running Short</span>
                    <span className={style.Price}>80$</span>
                    <div className={style.Sizes}>
                        <RadioBtn  disable={false} value="small" name="size"  >S</RadioBtn>
                        <RadioBtn   disable={true} value="meduim" name="size" >M</RadioBtn>
                    </div>
                </div>

                <div className={style.Right}>
                    <div className={style.AmountSec}>
                        <Btn type="amount">
                            <Icon icon="plus" size={18} color="#43464E" />
                        </Btn>
                        <span className={style.Amount} >3</span>
                        <Btn type="amount">
                            <Icon icon="minus" size={18 } color="#43464E" />
                        </Btn>
                    </div>
                    <div className={style.ImgWrapper}>
                        <img src="https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg" alt="product image" >
                        </img>
                    </div>
                </div>  
            </div>
        )
    }
}


export default CartItem;