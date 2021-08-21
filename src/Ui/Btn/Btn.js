import { PureComponent } from "react";
import style from "./Btn.module.scss";

class Btn extends PureComponent {
  render() {
    const classes = [style.Btn, style.outline];
    if (this.props.type === "primary") {
      classes[1] = style.primary;
    }
    if (this.props.type === "amount") {
      classes[2] = style.Amount;
    }
    if (this.props.disable) {
      classes.push(style.disable);
    }
    let inlineStyle = {};
    if (this.props.width) {
      inlineStyle.width = this.props.width;
    }
    return (
      <button
        disabled={this.props.disable}
        style={inlineStyle}
        onClick={this.props.onClick}
        className={classes.join(" ")}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Btn;
