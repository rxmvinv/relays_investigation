//Home.js
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../stylesheets/Home.scss';

const Home = ({isLoggedIn, authorizedUser}) =>
    <div className="home-content">
      <div className="home-map">
        <h1>RUSSIAN TOR RELAYS INVESTIGATION</h1>
        <p>Screenshots and data are taken from Torflow Uncharted https://torflow.uncharted.software/</p>
      </div>
      <div className="home-description">
        <p>This project was made for demonstration of russian relays activity.
          Here You might find strange places of these relays location like Kremlin or Police Departments.
          You're able to offer new strange relays after registration.
          After admin confirmation it would be publicated in list.
        </p>
        {isLoggedIn ? (<div className="greet-user">Hi, <span>{authorizedUser.login}</span></div>) : (
          <div>
            <Link to='/login'>Sign In</Link>
            <Link to='/register'>Sign Up</Link>
          </div>
        )}
        <Link to='/relays'>Go To Relays</Link>
      </div>
    </div>

Home.propTypes = {
    isLoggedIn: PropTypes.bool,
    authorizedUser: PropTypes.object
}

export default Home;
