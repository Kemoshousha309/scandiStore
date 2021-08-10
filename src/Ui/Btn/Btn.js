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

        return(
            <button className={classes.join(" ")}>{this.props.children}</button>
        )
    }
}

export default Btn;