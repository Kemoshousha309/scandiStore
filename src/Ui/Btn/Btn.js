import { PureComponent } from "react";
import style from "./Btn.module.scss";

class Btn extends PureComponent {
  render() {
    const {
      props: { type, disable, width, children, onClick },
    } = this;

    const classes = [style.Btn, style.outline];
    if (type === "primary") {
      classes[1] = style.primary;
    }
    if (type === "amount") {
      classes[2] = style.Amount;
    }
    if (disable) {
      classes.push(style.disable);
    }
    let inlineStyle = {};
    if (width) {
      inlineStyle.width = width;
    }
    return (
      <button
        disabled={disable}
        style={inlineStyle}
        onClick={onClick}
        className={classes.join(" ")}
      >
        {children}
      </button>
    );
  }
}

export default Btn;
