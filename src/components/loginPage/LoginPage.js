import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {auth} from '../../api/firebase'

// component

// style
import '../../scss/LoginPage.scss'

// material ui
import { Button } from '@material-ui/core';

function LoginPage() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // AUTHENTICATION WITH FIREBASE
    const signIn = e => {
        // Firebase Connection
        auth.signInWithEmailAndPassword(email, password)
        .then(
            auth => {
                history.push('/')
            }
        ).catch(
            error => alert(error.message)
        )
        
        e.preventDefault();
    }

    const register = e => {
        // Firebase Connection
        auth.createUserWithEmailAndPassword(
            email, 
            password,
        ).then(
            (auth) => {
                // it success create new user with email and password
                console.log(auth);
                if (auth) {
                    history.push('/')
                }
            }
        ).catch(
            error => alert(error.message)
        )

        e.preventDefault();
    }

    return (
        <div className="loginpage">
            <Link to="/">
                <img src="https://i.pinimg.com/originals/fe/da/d8/fedad83f2215483d6df01669661502f2.png" alt="Logo Amazon" className="loginpage__logo"/>
            </Link>
            <div className="loginpage__container">
                <h1>Sign In</h1>
                <form action="" className="loginpage__form">
                    <h5>Email</h5>
                    <input type="email" className="loginpage__input" 
                        value={email} 
                        // on change function for set email in what ever user type in input
                        onChange={e => setEmail(e.target.value)}
                    />
                    <h5>Password</h5>
                    <input type="password" className="loginpage__input" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}    
                    /> 
                    <Button className="loginpage__button" onClick={signIn}>
                        Sign In
                    </Button>
                </form>
                <p>
                    By continuing, you agree to Arie Sastra's E-Commerce <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_condition_of_use?ie=UTF8&nodeId=508088">Conditions of Use</a> and <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496">Privacy Notice</a>.
                </p>
                <Button className="loginpage__register" onClick={register}>
                    Sign Up Here
                </Button>
            </div>
        </div>
    )
}

export default LoginPage
