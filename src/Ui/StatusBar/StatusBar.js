import { PureComponent } from "react";
import style from "./StatusBar.module.scss";

class StatusBar extends PureComponent {
  render() {
    const {
      props: { type, children },
    } = this;
    const classes = [style.Message, style.success];
    if (type === "danger") {
      classes[1] = style.danger;
    }
    return (
      <div className={style.Container}>
        <p className={classes.join(" ")}>{children}</p>
      </div>
    );
  }
}

export default StatusBar;
