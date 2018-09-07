//Footer.js
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import '../../stylesheets/Footer.scss'

const Footer = ({signedUser, authorizedUser, authorizeUser=f=>f, locationUpdate=f=>f, history}) => {
  signedUser ? console.log('authorized') : console.log('unathorized');
  localStorage.authToken ? authorizeUser(authorizedUser) : console.log('no tokens');
  history.listen(location => locationUpdate(location));
  return (
    <footer>
      <h3>Copyright © 2018 • <a href="http://www.magic--romain.com">Magic Romain</a></h3>
    </footer>
  );
}

Footer.propTypes = {
    signedUser: PropTypes.object,
    authorizedUser: PropTypes.object,
    authorizeUser: PropTypes.func,
    history: PropTypes.object,
    locationUpdate: PropTypes.func
}

export default withRouter(Footer);
