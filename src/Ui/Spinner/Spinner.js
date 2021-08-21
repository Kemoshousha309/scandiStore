import { PureComponent } from "react";
import style from "./Spinner.module.scss";

class Spinner extends PureComponent {
  render() {
    return (
      <div className={style.skCubeGrid}>
        <div className={[style.skCube, style.skCube1].join(" ")}></div>
        <div className={[style.skCube, style.skCube2].join(" ")}></div>
        <div className={[style.skCube, style.skCube3].join(" ")}></div>
        <div className={[style.skCube, style.skCube4].join(" ")}></div>
        <div className={[style.skCube, style.skCube5].join(" ")}></div>
        <div className={[style.skCube, style.skCube6].join(" ")}></div>
        <div className={[style.skCube, style.skCube7].join(" ")}></div>
        <div className={[style.skCube, style.skCube8].join(" ")}></div>
        <div className={[style.skCube, style.skCube9].join(" ")}></div>
      </div>
    );
  }
}

export default Spinner;
