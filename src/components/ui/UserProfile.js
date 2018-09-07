//UserProfile.js
import React from 'react';
import '../../stylesheets/UserProfile.scss'

const UserProfile = (props) => (
  <div>
    <h3>{props.user.login}</h3>
    <h3>{props.user.email}</h3>
  </div>
);

export default UserProfile;
