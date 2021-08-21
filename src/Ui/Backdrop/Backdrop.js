import style from "./Backdrop.module.scss";
import { PureComponent } from "react";

class Backdrop extends PureComponent {
  render() {
    return this.props.open ? (
      <div
        onClick={this.props.clicked}
        style={{ backgroundColor: this.props.color }}
        className={style.Backdrop}
      ></div>
    ) : null;
  }
}

export default Backdrop;
