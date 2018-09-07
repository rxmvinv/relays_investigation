//RelayDetailed.js
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import '../../stylesheets/RelayDetailed.scss';

const RelayDetailed = ({match, currentRelay, getCurrentRelay=f=>f}) =>
        <div className="relays-list">
          {getCurrentRelay(match.params.relay_id)}
          {currentRelay ? (
            <div className="relay-detailed">
              <div className="relay-details">
                <div className="relay-fields">
                  <img src={'/' + currentRelay.thumb} alt='thumb' />
                  <article>
                    <p>City: {currentRelay.city}</p>
                    <p>Address: {currentRelay.address}</p>
                    <p>Date: {currentRelay.date}</p>
                    <p>User: {currentRelay.useremail}</p>
                    <p>Details: {currentRelay.details}</p>
                  </article>
                </div>
                <div className="relay-images">
                  <img src={'/' + currentRelay.flow} alt='flow' />
                  <img src={'/' + currentRelay.map} alt='map' />
                  <img src={'/' + currentRelay.mapdetails} alt='mapdetails' />
                  <img src={'/' + currentRelay.panorama} alt='panorama' />
                </div>
              </div>
            </div>
          ) : (<div>loading...</div>)}
        </div>

RelayDetailed.propTypes = {
    match: PropTypes.object,
    currentRelay: PropTypes.object,
    getCurrentRelay: PropTypes.func
}

export default withRouter(RelayDetailed);
