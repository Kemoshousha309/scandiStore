import style from "./Backdrop.module.scss";
import { PureComponent } from "react";

class Backdrop extends PureComponent {
  render() {
    const {
      props: { open, clicked, color },
    } = this;
    return open ? (
      <div
        onClick={clicked}
        style={{ backgroundColor: color }}
        className={style.Backdrop}
      ></div>
    ) : null;
  }
}

export default Backdrop;
