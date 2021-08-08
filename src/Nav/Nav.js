import { Component } from "react";
import { NavLink } from "react-router-dom";
import style from "./Nav.module.scss";

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
                <div className={style.NavOptions}>NavOptions</div>
            </nav>
        )
    }
}


export default Nav;