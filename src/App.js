import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import style from './App.module.scss';
import CategoryPage from './Components/CategoryPage/CategoryPage';
import Nav from './Components/Nav/Nav';
import { req_categories, req_currencies, set_loading } from './store/actions';
import Spinner from './Ui/Spinner/Spinner';



// resturcture the app component
class App extends Component {
  
  componentDidMount() {
      this.props.onLoadApp()
  }

  render () {

    // make a spinner ..
    let content = <Spinner />

    const stateContent = [
      this.props.categories,
      this.props.currencies,
      
    ]

    if(stateContent.every(i => i)){
      content =  (
        <div className={style.Container}>   
              <header>
                  <Nav />
              </header>
              <main>
              <Switch>
                {this.props.categories.map(i => {
                  return <Route path={`/${i.name}`}><CategoryPage catName={i.name} /> </Route>
                })}
                 <Redirect from="/" exact to={`/${this.props.categories[0].name}`} />
              </Switch>
              </main>
          </div>
    )
    }
    return content;
  }
}



const mapStateToProps = state => {
  return {
      currencies: state.currencies,
      categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadApp: () => {
      dispatch(req_currencies())
      dispatch(req_categories())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
