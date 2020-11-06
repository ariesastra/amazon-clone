import React, { useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// Components
import Header from './components/layout/Header'
import Home from './components/homepage/Home'
import CheckoutPage from './components/checkoutPage/CheckoutPage'
import LoginPage from './components/loginPage/LoginPage'
import {auth} from './api/firebase'
import { useStateValue } from './redux/StateProvider'

// Style
import './scss/App.scss';

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // Run Once when the app component loads !
    auth.onAuthStateChanged(authUser => {
      console.log('USER IS : ', authUser);//debuging auth

      if (authUser) {
        // the user was login / the user just login
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      }
      else{
        // the user is logout
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
  }, [])

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
