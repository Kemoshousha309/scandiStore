import { Component } from "react";
import style from "./CheckBtn.module.scss"; 

class CheckBtn extends Component {

    render () {
        let classes = [];
        if(this.props.disable){
            classes.push(style.disable) 
        }

        let type = style.TextType
        if(this.props.type === "swatch"){
            type = style.SwatchType
        }
        classes.push(type);

   
        return (
            <div className={style.Container}>
                <input 
                disabled={this.props.disable} 
                onChange={(e) => this.props.changeHandler(e, this.props.id)} 
                type="checkbox" 
                id={this.props.id} 
                checked={this.props.checked}
                value={this.props.value} 
                />
                <label htmlFor={this.props.id} 
                    style={{backgroundColor: this.props.value}}
                    className={classes.join(" ")}
                >{this.props.type !== "swatch" ? this.props.children : null}</label>
            </div>
        )
    }   
}


export default CheckBtn;