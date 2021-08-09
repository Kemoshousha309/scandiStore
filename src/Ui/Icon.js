import React, { Component } from "react";
import IcoMoon, { iconList } from "react-icomoon";
const iconSet = require("../assests/selection.json");

// to see the available icon list
// console.log(iconList(iconSet)); 

// 0: "cny, jpy, rmb, yen"
// 1: "euro_symbol"
// 2: "chevron-up"
// 3: "dollar-sign"
// 4: "shopping-cart"


// Here we use Icomoon for out icons.
// we also can use fontawsome. ..... maybe in other part of the project.


class Icon extends Component {
    render() {
        return <IcoMoon iconSet={iconSet} {...this.props} />
    }
}

export default Icon;