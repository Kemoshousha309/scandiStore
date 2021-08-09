import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import style from './App.module.scss';
import Nav from './Components/Nav/Nav';
import Backdrop from './Ui/Backdrop/Backdrop';


class App extends Component {

  state = {
    cartMenuOpen: false,
    currencyMenuOpen: false,
    BackdropOpen: false,
  }

  optionClickHandler = (e, id) => {
    switch (id) {
      case "cart":
        this.setState({cartMenuOpen: !this.state.cartMenuOpen, BackdropOpen: !this.state.BackdropOpen})
        break
      
      case "currency":
        this.setState({currencyMenuOpen: !this.state.currencyMenuOpen, BackdropOpen: !this.state.BackdropOpen})
        break
      default:
        break;
    }
  }

  BackdropClickedHandler = () => {
    this.setState({
      currencyMenuOpen: false,
      cartMenuOpen: false, 
      BackdropOpen: false
    })
  }

  render () {
    return (
      <BrowserRouter>
          <div className={style.Container}>   
                <header>
                    <Nav 
                      cartMenuOpen={this.state.cartMenuOpen}
                      currencyMenuOpen={this.state.currencyMenuOpen}
                      optionClickHandler={this.optionClickHandler}
                    />
                </header>
                <main>
                    <Backdrop clicked={this.BackdropClickedHandler} open={this.state.BackdropOpen} color="#39374838" />
                    <div style={{height: "20rem"}}></div>
                </main>
            </div>
      </BrowserRouter>
    )
  }
}

export default App;
