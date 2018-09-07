//Menu.js
import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, Redirect } from 'react-router-dom';
import UserProfile from './UserProfile';
import '../../stylesheets/Menu.scss'

const Menu = ({isLoggedIn, redirToHome, toggle, authorizedUser, toggleProfile=f=>f, logoutUser=f=>f}) =>
              {
                return (
                  <div className="nav-menu" >
                    {isLoggedIn ? (
                      <div className="user-profile">
                        <img src={(authorizedUser.image) ? (authorizedUser.image.data) : ('images/default_thumb.png')} alt='user' onClick={() => toggleProfile(toggle)} />
                        <div className={toggle}>
                          <UserProfile user={authorizedUser} />
                          <div className="user-buttons">
                            <Link to='/offer-relay'>Offer Relay</Link>
                            <Link to='/change-credentials'>Edit Profile</Link>
                            <button onClick={() => logoutUser()}>Sign Out</button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="auth-links">
                        <img src='/images/default_thumb.png' alt='user' onClick={() => toggleProfile(toggle)} />
                        <div className={toggle}>
                          <Link to='/login'>Sign in</Link>
                          <Link to='/register'>Sign up</Link>
                        </div>
                      </div>
                    )}
                    <div className="navigate-links">
                      <NavLink to='/' >HOME</NavLink>
                      <NavLink to='/relays' >RELAYS</NavLink>
                    </div>
                    {redirToHome ? (<Redirect to='/' />) : ('')}
                  </div>
                )
              }

Menu.propTypes = {
    isLoggedIn: PropTypes.bool,
    redirToHome: PropTypes.bool,
    toggle: PropTypes.string,
    authorizedUser: PropTypes.object,
    toggleProfile: PropTypes.func,
    logoutUser: PropTypes.func
}

export default Menu;
