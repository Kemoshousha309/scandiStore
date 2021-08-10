import { Component } from "react";
import { NavLink } from "react-router-dom";
import DropMenu from "../../Ui/DropMenu/DropMenu";
import Item from "../../Ui/DropMenu/Item";
import Icon from "../../Ui/Icon";
import style from "./Nav.module.scss";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
import logo from "../../assests/logo.png";
import CartOverlay from "../CartOverlay/CartOverlay";
import { connect } from "react-redux";
import Aux from "../../hoc/Aux";
import Backdrop from "../../Ui/Backdrop/Backdrop";




class Nav extends Component {
    state = {
        cartOverlayOpen: false,
        backdropOpen: false
    }

    cartOverlayOpenHandler = () => {
        this.setState({
            cartOverlayOpen: !this.state.cartOverlayOpen,
            backdropOpen: !this.state.backdropOpen
        })
    }

    render() {
        return (
            <Aux>
                <Backdrop clicked={this.cartOverlayOpenHandler} open={this.state.backdropOpen} color="#39374838" />
                <nav className={style.Nav}>
                    <div className={style.NavCategories} >
                        <ul>
                            {
                                this.props.categories.map(i => {
                                    return  <li><NavLink activeClassName={style.Selectd} to={i.name}>{i.name}</NavLink></li>
                                })
                            }
                        </ul>
                    </div>
                    <div className={style.Logo}>
                    <NavLink activeClassName={style.Selectd} to="/"> <img src={logo} alt="logo" ></img></NavLink>
                    </div>
                    <div className={style.NavOptoins}>
                        <div className={style.Optoin}>
                        <CurrencySelector />
                        </div>
                        <div className={style.Optoin}>
                            <Icon onClick={this.cartOverlayOpenHandler}
                            icon="shopping-cart" size={16} color="#43464E" />
                            <DropMenu  open={this.state.cartOverlayOpen} >
                                <Item><CartOverlay /></Item>
                            </DropMenu>
                        </div>
                    </div>
                </nav>
            </Aux>
        )
    }
}



const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}
  

  
export default connect(mapStateToProps, null)(Nav);