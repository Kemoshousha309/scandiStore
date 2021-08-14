import { Component } from "react";
import style from "./StatusBar.module.scss"

class StatusBar extends Component {
    render() {
        let classes = [style.Message, style.success];
        if(this.props.type === "danger") {
            classes[1] = style.danger
        }
        return (
            <div className={style.Container}>
                <p className={classes.join(" ")}>{this.props.children}</p>
            </div>
        )
    }
}

export default StatusBar;