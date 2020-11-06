import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// Components
import Header from './components/layout/Header'
import Home from './components/homepage/Home'
import CheckoutPage from './components/checkoutPage/CheckoutPage'
import LoginPage from './components/loginPage/LoginPage'

// Style
import './scss/App.scss';

function App() {
  return (
    // BEM
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            {/* login page */}
            <LoginPage />
          </Route>
          <Route path="/checkout">
            {/* Header Nav */}
            <Header />
            {/* Checkout Page */}
            <CheckoutPage />
          </Route>
          <Route path="/">
            {/* Header Nav */}
            <Header />
            {/* Homepage */}
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
