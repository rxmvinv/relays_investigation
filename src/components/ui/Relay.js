//Relay.js
import React from 'react';
import { Link } from 'react-router-dom';

const Relay = (props) => (
  <div>
    <Link to={`/relays/${props._id}`}><img src={props.thumb} alt="relay" /><h3>{props.city}</h3></Link>
  </div>
);

Relay.defaultProps = {
  _id: '',
  thumb: '',
  city: ''
};

export default Relay;
