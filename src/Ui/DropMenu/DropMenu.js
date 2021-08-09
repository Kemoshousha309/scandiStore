import { Component } from "react";
import style from "./DropMenu.module.scss"

class DropMenu extends Component {
    render() {

        // to make the DropMenu fit on the left and the right of the screen
        let dirStyle = style.right
        if(this.props.dir === "left"){dirStyle = style.left}

        let openStyle = style.close
        if(this.props.open){openStyle = style.open}

        return(
            <div className={style.Container}>
                <ul  className={[style.Menu, dirStyle, openStyle].join(" ")}>
                    {this.props.children}
                </ul>
            </div>
        )
    }
}

export default DropMenu;