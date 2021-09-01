import { PureComponent } from "react";
import style from "./CheckBtn.module.scss";

class CheckBtn extends PureComponent {
  render() {
    const {
      props: { disable, type, onlyView, value, id, changeHandler, children, checked },
    } = this;

    const classes = [];
    if (disable) {
      classes.push(style.disable);
    }

    let btnType = style.TextType;
    if (type === "swatch") {
      btnType = style.SwatchType;
    }
    classes.push(btnType);

    let styleObj = { backgroundColor: value, cursor: "pointer" };
    if (onlyView) {
      styleObj.cursor = "default";
    }

    return (
      <div className={style.Container}>
        <input
          disabled={disable}
          onChange={(e) => changeHandler(e, id)}
          type="checkbox"
          id={id}
          checked={checked}
          value={value}
        />
        <label
          htmlFor={id}
          className={classes.join(" ")}
          style={styleObj}
        >
          {type !== "swatch" ? children : null}
        </label>
      </div>
    );
  }
}

export default CheckBtn;
