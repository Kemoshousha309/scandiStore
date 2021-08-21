import React, { Component } from "react";
import IcoMoon from "react-icomoon";
const iconSet = require("../assests/selection.json");

class Icon extends Component {
  render() {
    return <IcoMoon iconSet={iconSet} {...this.props} />;
  }
}

export default Icon;
