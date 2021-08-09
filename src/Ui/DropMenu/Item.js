import { Component } from "react";
import style from "./DropMenu.module.scss";


class Item extends Component {
    render () {
        return(
            <li className={style.Item}>{this.props.children}</li>
        )
    }
}

export default Item;