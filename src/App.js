import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Cart from './components/Cart'
import Header from './components/Header'
import RestaurantDetails from './components/RestaurantDetails'
import Footer from './components/Footer'
import ProtectedRouter from './components/ProtectedRouter'
import NotFound from './components/NotFound'
import KitchenContext from './context/KitchenContext'

import './App.css'

class App extends Component {
  state = {activeTheme: 'light'}

  changeTheme = activeTheme => {
    this.setState({activeTheme})
  }

  render() {
    const {activeTheme} = this.state

    return (
      <KitchenContext.Provider
        value={{
          activeTheme,
          changeTheme: this.changeTheme,
        }}
      >
        <>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <>
              <Header />
              <>
                <Switch>
                  <ProtectedRouter exact path="/" component={Home} />
                  <ProtectedRouter exact path="/cart" component={Cart} />
                  <ProtectedRouter
                    exact
                    path="/restaurant/:id"
                    component={RestaurantDetails}
                  />
                  <Route path="/not-found" component={NotFound} />
                  <Redirect to="/not-found" />
                </Switch>
              </>
              <Footer />
            </>
          </Switch>
        </>
      </KitchenContext.Provider>
    )
  }
}

export default App
