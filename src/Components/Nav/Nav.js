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

        // get number of products in cart
        let num = Object.keys(this.props.cart).length;

        return (
            <Aux>
                <Backdrop clicked={this.cartOverlayOpenHandler} open={this.state.backdropOpen} color="#39374838" />
                <nav className={style.Nav}>
                    <div className={style.NavCategories} >
                        <ul>
                        <li><NavLink activeClassName={style.Selectd} to="/all">All</NavLink></li>
                            {
                                this.props.categories.map(i => {
                                    return  <li key={i.name} ><NavLink activeClassName={style.Selectd} to={i.name}>{i.name}</NavLink></li>
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
                            {num > 0 ?  <span onClick={this.cartOverlayOpenHandler} className={style.CartCount}>{num}</span> : null}
                            <DropMenu  open={this.state.cartOverlayOpen} >
                                <Item>
                                    {
                                        this.state.cartOverlayOpen ? <CartOverlay close={this.cartOverlayOpenHandler} /> : null
                                    }    
                                </Item>
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
        categories: state.categories,
        cart: state.cart
    }
}
  

  
export default connect(mapStateToProps, null)(Nav);