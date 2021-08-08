import { Component } from "react";
import Aux from "../hoc/Aux";
import Nav from "../Nav/Nav";
import style from "./Layout.module.scss"

class Layout extends Component {
    render () {
        return (
            <div className={style.Container}>   
                <header>
                    <Nav />
                </header>
                <main>
                    page
                </main>
            </div>
        )
    }
}

export default Layout;