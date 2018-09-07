//RegisterForm.js
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/RegisterForm.scss'

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { login: '', email: '', password: '', image: '', passwordsec: '', distinctPass: false, emailValid: true };
    this.registrationStart = this.registrationStart.bind(this);
    this.createUserDetails = this.createUserDetails.bind(this);
  }

  registrationStart(e) {
    e.preventDefault();

    let regForm = this.state;
    let createdUser = {
      login: regForm.login,
      email: regForm.email,
      password: regForm.password,
      image: regForm.image
    };

    if (regForm.password !== regForm.passwordsec) {
      this.setState({distinctPass: true});
    } else if (!regForm.emailValid) {
      this.setState({emailValid: false});
    } else {
      this.setState({distinctPass: false});
      this.setState({emailValid: true});

      this.props.registerNewUser(createdUser);
      console.log(this.props.emptyUser.response.status);
    }

  }
  createUserDetails(e) {
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
    if (name === 'email') {
      if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        this.setState({emailValid: true});
      } else {
        this.setState({emailValid: false});
      }
    }

    this.setState({ [name]: value });
  }
  createImage(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      //this.setState({
        //image: file,
        //imagePreviewUrl: reader.result
      //});
      this.setState({
        image: reader.result
      });
      console.log(this.state)
    }

    reader.readAsDataURL(file)
  }

  render() {
    //
    const redirToLogin = this.props.redirToLogin;

    const emptyUser = this.props.emptyUser;
    const userExist = (emptyUser.response.status) ? ((emptyUser.response.status === 404) ? (<p>User already exist. Login and email should be unique. Try again</p>) : (<p>ok</p>)) : ('')

    const warning = this.state.distinctPass ? (<p>Password doesn't match. Please reenter</p>) : ('');

    const warningSec = this.state.emailValid ? ('') : (<p>Please enter valid email</p>);

/*
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }
*/

    let {image} = this.state;
    let $imagePreview = null;
    if (image) {
      $imagePreview = (<img src={image} alt="user" />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Your Profile</div>);
    }

    const redirectAfterReg = redirToLogin ? (<Redirect to='/login' />) : (
      <div className="sign-up">
        <h1>Sign up</h1>
        <form onSubmit={ this.registrationStart }>
          <input type='text' name='login' placeholder='Login' value={ this.state.login } onChange= { this.createUserDetails } required />
          <label><input type='email' name='email' placeholder='Email' value={ this.state.email } onChange= { this.createUserDetails } required />{warningSec}</label>
          <input type='password' name='password' placeholder='Password' value={ this.state.password } onChange= { this.createUserDetails } required />
          <label><input type='password' name='passwordsec' placeholder='Password Repeat' value={ this.state.passwordsec } onChange= { this.createUserDetails } required />{warning}</label>
          <input type='file' onChange= { (e)=>this.createImage(e) } />
          <div className="agreement">
            <p>
              <span>Please read before registration.</span>
              It's an experimental test project it's main goal is to demonstrate coding skills.
              Consider it's stage as "always in development".
              Additional benefit of project is to publicate some strange relays possibly controlled by russian government.
              Because it's just a demonstration project it might has bugs and any data might be leaked and collected by third party.
              That's why it's a strong recommendation to use some unimportant email without any sensitive subscriptions conversations or contacts.
              Responsibility of administration is just to maintain and update content based on Your requests.
            </p>
          </div>
          {userExist}
          <input type='submit' value='Sign up' />
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
        <div className="captcha">HERE WILL BE CAPTCHA</div>
      </div>
    );

    const whatToRender = this.props.isLoggedIn ? (<div>You're already registered.</div>) : (redirectAfterReg);
    return (
      whatToRender
    )
  }
}

export default RegisterForm;
