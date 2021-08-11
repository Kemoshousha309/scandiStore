import { Component } from "react";
import style from "./Btn.module.scss";

class Btn extends Component {
    render() {
        let classes =[style.Btn, style.outline]

        if(this.props.type === "primary"){
            classes[1] = style.primary
        }
        if(this.props.type === "amount"){
            classes[2] = style.Amount
        }
        let inlineStyle = {}
        if(this.props.width){
            inlineStyle.width = this.props.width
        }
        return(
            <button style={inlineStyle} className={classes.join(" ")}>{this.props.children}</button>
        )
    }
}

export default Btn;