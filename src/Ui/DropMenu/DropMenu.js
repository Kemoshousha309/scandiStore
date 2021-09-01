import { PureComponent } from "react";
import style from "./DropMenu.module.scss";

class DropMenu extends PureComponent {
  render() {
    // to make the DropMenu fit on the left and the right of the screen
    const {
      props: { dir, open, children },
    } = this;
    let dirStyle = style.right;
    if (dir === "left") {
      dirStyle = style.left;
    }

    let openStyle = style.close;
    if (open) {
      openStyle = style.open;
    }

    return (
      <div className={style.Container}>
        <ul className={[style.Menu, dirStyle, openStyle].join(" ")}>
          {children}
        </ul>
      </div>
    );
  }
}

export default DropMenu;
