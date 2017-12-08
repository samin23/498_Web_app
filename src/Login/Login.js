import React, { Component } from 'react';
import { Button, Input, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { FireVar } from '../Firebase/FirebaseConfig.js';
import PasswordMask from 'react-password-mask';

// import styles from './Search.scss'

class Login extends Component {
  constructor(){
    super();
    this.state = { email: '', password: '', status: ''}
    this.login = this.login.bind(this)
    this.register = this.register.bind(this)
    this.emailInputChangeHandler = this.emailInputChangeHandler.bind(this)
    this.passwordInputChangeHandler = this.passwordInputChangeHandler.bind(this)
  }

  login(){
    FireVar.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(function(firebaseUser) {
      console.log("logged in successfully")
      //Actions.addEntryPage()
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = (error.code);
      var errorMessage = (error.message);
      if(error){
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        }
        else {
          alert(errorMessage);
        }
      }
    });
  }

  register(){
    FireVar.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(async function(firebaseUser) {
      var user = FireVar.auth().currentUser;
      console.log("registered successfully")
      await fetch("http://localhost:4000/api/user", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firebaseID: user.uid,
          email: user.email
        })
      });
      window.location.assign('NewEntry');
      // Actions.addEntryPage()
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorMessage = (error.message);
      if(error){
        alert(errorMessage);
      }
    });
  }

  // Updates email whenever the email input is changed
  emailInputChangeHandler(event){
    this.setState({ email: event.target.value });
  }

  // Updates password whenever the password input is changed
  passwordInputChangeHandler(event){
    this.setState({ password: event.target.value });
  }

  render(){
      return(
          <div className='Login'>
              <h1>Login</h1>
              <div className='inputdiv'>
                    <Input
                      className='inputClass'
                      onChange={this.emailInputChangeHandler}
                      placeholder='Email'
                      value={this.state.email} />

                      <PasswordMask
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.passwordInputChangeHandler}
                        useVendorStyles={false}
                        />

              </div>
              <div className='loginButtons'>
                <Button className="ui button" role="button" onClick={this.login}>Login</Button>
                <Button className="ui button" role="button" onClick={this.register}>Register</Button>
              </div>
          </div>
      );
  }
}

Login.propTypes = {
    email: PropTypes.string,
    password: PropTypes.string
};

export default Login
