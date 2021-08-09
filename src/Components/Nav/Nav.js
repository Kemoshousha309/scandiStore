import { Component } from "react";
import { NavLink } from "react-router-dom";
import DropMenu from "../../Ui/DropMenu/DropMenu";
import Item from "../../Ui/DropMenu/Item";
import Icon from "../../Ui/Icon";
import style from "./Nav.module.scss";
import CurrencySelector from "../CurrencySelector/CurrencySelector";


class Nav extends Component {
    render() {
        return (
            <nav className={style.Nav}>
                <div className={style.NavCategories} >
                    <ul>
                        <li><NavLink activeClassName={style.Selectd} to="/women">women</NavLink></li>
                        <li><NavLink activeClassName={style.Selectd} to="/men">men</NavLink></li>
                        <li><NavLink activeClassName={style.Selectd} to="/kids">kids</NavLink></li>
                    </ul>
                </div>
                <div className={style.BackBtn}>btn</div>
                <div className={style.NavOptoins}>
                    <div className={style.Optoin}>
                      <CurrencySelector />
                    </div>
                    <div className={style.Optoin}>
                        <Icon onClick={(e) => this.props.optionClickHandler(e, "cart")}
                         icon="shopping-cart" size={16} color="#43464E" />
                        <DropMenu  open={this.props.cartMenuOpen} >
                            <Item>the first currency is dollar</Item>
                            <Item>the second currency is euro</Item>
                            <Item>the third currency is yen</Item>
                            <Item>the third currency is yen</Item>
                            <Item>the third currency is yen</Item>
                            <Item>the third currency is yen</Item>
                            <Item>the third currency is yen</Item>  
                        </DropMenu>
                    </div>
                </div>
            </nav>
        )
    }
}


export default Nav;