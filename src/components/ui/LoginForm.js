//LoginForm.js
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/LoginForm.scss'

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.checkLogin = this.checkLogin.bind(this);
    this.takeField = this.takeField.bind(this);
  }
  checkLogin(e) {
    e.preventDefault();

    let credsState = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(credsState);
    //if (success) {this.setState({redirToRelays: true});} else {new warning}
  }
  takeField(e) {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }

  render() {
    console.log(this.props.status);
    const status = (this.props.status) ? ((this.props.status === 401) ? (<p>Try again.</p>) : (<p>ok</p>)) : ('');
    const redirToRelays = this.props.redirToRelays;

    const redirectUser = redirToRelays ? (<Redirect to='/relays' />) : (
      <div className="sign-in">
        <h1>Sign in</h1>
        <form onSubmit={ this.checkLogin }>
          <input type='email' name='email' placeholder='Email' value={ this.state.email } onChange= { this.takeField } required />
          <input type='password' name='password' placeholder='Password' value={ this.state.password } onChange= { this.takeField } required />
          <input type='submit' value='Sign in' />
          {status}
        </form>
      </div>
    );

    const userSigned = this.props.isLoggedIn ? (<div>You're already signed in.</div>) : (redirectUser)

    return (
      userSigned
    )
  }
}

export default LoginForm;
