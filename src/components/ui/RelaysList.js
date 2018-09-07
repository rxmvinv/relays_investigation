//RelaysList.js
import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import '../../stylesheets/RelaysList.scss';

const RelaysList = ({isLoggedIn, loadingList, dataRelays, getRelaysData=f=>f}) =>
        <div className="relays-list">
          { (dataRelays.length) ? (console.log('still empty')) : (getRelaysData(dataRelays)) }
          <h2>Relays:</h2>
          {(!dataRelays.length) ? (<div>Loading List...</div>) : (dataRelays.map((data) =>
            data._id ? (
              <Link key={data._id} to={'relays/' + data._id}>
                <img src={data.thumb ? data.thumb : '/images/default_relay.png'} alt="relay" /><h3>{data.city}</h3>
              </Link>
            ) : (data)
          ))}
          {isLoggedIn ? (<Link to='/offer-relay' className="offer-button">+</Link>) : ('')}
        </div>

RelaysList.propTypes = {
    isLoggedIn: PropTypes.bool,
    loadingList: PropTypes.bool,
    dataRelays: PropTypes.array,
    getRelaysData: PropTypes.func
}

export default withRouter(RelaysList);
