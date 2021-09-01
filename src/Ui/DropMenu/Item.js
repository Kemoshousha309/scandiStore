import { PureComponent } from "react";
import style from "./DropMenu.module.scss";

class Item extends PureComponent {
  render() {
    const {
      props: { children },
    } = this;
    return <li className={style.Item}>{children}</li>;
  }
}

export default Item;
