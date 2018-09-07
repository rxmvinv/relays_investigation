//UserCredentialsForm.js
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/UserCredentialsForm.scss'

class UserCredentialsForm extends Component {
  constructor(props) {
    super(props);
    this.state = { _id: '', login: '', email: '', password: '', image: '', passwordsec: '', distinctPass: '', sure: false };
    this.changeUserCreds = this.changeUserCreds.bind(this);
    this.removeAccount = this.removeAccount.bind(this);
    this.cancelRemoving = this.cancelRemoving.bind(this);
    this.changeUserDetails = this.changeUserDetails.bind(this);
    this.changeImage = this.changeImage.bind(this);
  }
  componentWillMount() {
    //console.log(this.props);
    if (this.props._id && this.props.login && this.props.email) {
      this.setState({_id: this.props._id, login: this.props.login, email: this.props.email, image: this.props.image});
    }
  }
  componentDidMount() {
    //this.setState({authorizedUser: this.state.signIn.currentUser})
  }
  changeUserCreds(e) {
    e.preventDefault();

    let authUser = this.state;

    let changedUser = {
      _id: authUser._id,
      login: authUser.login,
      email: authUser.email,
      password: authUser.password,
      image: authUser.image
    }

    if (authUser.password !== authUser.passwordsec) {
      this.setState({distinctPass: true});
    } else {
      this.setState({distinctPass: false});

      this.props.changeCurrentUser(changedUser);
      //this.setState({redirToHome: true});
    }
  }
  cancelRemoving() {
    this.setState({sure: false});
  }
  removeAccount() {
    let authUserId = this.state._id;

    console.log(this.state.sure);

    if (!this.state.sure) {
      this.setState({sure: true});
    } else {
      console.log(this.state);
      this.props.removeCurrentUser(authUserId);
      //this.setState({redirToHome: true});
    }
  }
  changeUserDetails(e) {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (name === 'passwordsec') {
      if (value !== this.state.password) {
        this.setState({distinctPass: true});
      } else {
        this.setState({distinctPass: false});
      }
    }
    if (name === 'password') {
      if (value !== this.state.passwordsec) {
        this.setState({distinctPass: true});
      } else {
        this.setState({distinctPass: false});
      }
    }

    this.setState({ [name]: value });
  }
  changeImage(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: {data: reader.result}
      });
      console.log(this.state)
    }

    reader.readAsDataURL(file)
  }
  removeImage(e) {
    e.preventDefault();
    console.log('Later');
    //this.setState({image: {data: ""}});
  }

  render() {
        let {image} = this.state; //this.state;
        let $imagePreview = null;
        if (image) {
          $imagePreview = (<img src={image.data} alt="user" />);
        } else {
          $imagePreview = (<div className="previewText">Your Current Image</div>);
        }

    const redirToHome = this.props.redirToHome;

    const status = (this.props.status) ? ((this.props.status === 401 || 404) ? (<p>Something is wrong. Try again.</p>) : (<p>ok</p>)) : ('');

    const warning = this.state.distinctPass ? (<p>Password doesn't match. Please reenter</p>) : ('');

    const userSure = this.state.sure ? (<div className="remove-me"><p>Are You sure? This will remove your account</p> <button onClick={ this.removeAccount }>Yes, remove</button><button onClick={ this.cancelRemoving }>Cancel</button></div>) : ('');

    const redirAfterChanges = redirToHome ? (<Redirect to='/' />) : (
      <div className="change-credentials">
        <h1>New credentials</h1>
        <p>You need to resign after changes</p>
        <form onSubmit={ this.changeUserCreds }>
          <input type='text' name='login' placeholder='Login' value={ this.state.login } onChange= { this.changeUserDetails } required />
          <input type='email' name='email' placeholder='Email' value={ this.state.email } onChange= { this.changeUserDetails } required />
          <input type='password' name='password' placeholder='Password' value={ this.state.password } onChange= { this.changeUserDetails } required />
          <label><input type='password' name='passwordsec' placeholder='Password Repeat' value={ this.state.passwordsec } onChange= { this.changeUserDetails } required />{warning}</label>
          <input type='file' onChange= { (e)=>this.changeImage(e) } />
          <input type='submit' value='Confirm' />
          {status}
        </form>
        <div className="img-preview">
          {$imagePreview}
        </div>
        <button className="remove-account" onClick= { this.removeAccount }>Remove account</button>
        {userSure}
      </div>
    );

    const whatToRender = this.props.isLoggedIn ? (redirAfterChanges) : (<div>Please sign in for these actions.</div>);
    return (
      whatToRender
    )
  }
}

export default UserCredentialsForm;
