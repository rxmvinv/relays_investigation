//OfferForm.js
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/OfferForm.scss'

class OfferForm extends Component {
  constructor(props) {
    super(props);
    this.state = { confirmed: false, city: '', address: '', details: '', date: '', useremail: '', thumb: '', flow: '', map: '', mapdetails: '', panorama: '' };
    this.offerRelay = this.offerRelay.bind(this);
    this.offerDetailsRelay = this.offerDetailsRelay.bind(this);
    this.createImage = this.createImage.bind(this);
  }
  componentWillMount() {
    var useremail;

    if (this.props.useremail) {
      useremail = this.props.useremail
    }
    this.setState({useremail: useremail});
  }
  offerRelay(e) {
    e.preventDefault();

    let relayForm = this.state;

    this.props.offerNewRelay(relayForm);
    //this.setState({redirBackToRelays: true});
  }
  offerDetailsRelay(e) {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({ [name]: value });
  }
  createImage(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    let changedState = {};
    let targetName = e.target.name;
    changedState[targetName] = '';

    reader.onloadend = () => {
      changedState[targetName] = reader.result;
      this.setState(changedState);
      console.log(this.state);
    }

    file ? reader.readAsDataURL(file) : console.log('huh');
  }

  render() {
    const redirBackToRelays = this.props.redirBackToRelays;

    let { thumb, flow, map, mapdetails, panorama } = this.state;
    let $thumbPreview, $flowPreview, $mapPreview, $mapdetailsPreview, $panoramaPreview = null;

    thumb ? ($thumbPreview = (<img src={thumb} alt="thumb" />)) : ($thumbPreview = (<div className="previewThumb">Main</div>))
    flow ? ($flowPreview = (<img src={flow} alt="flow" />)) : ($flowPreview = (<div className="previewFlow">Details</div>))
    map ? ($mapPreview = (<img src={map} alt="map" />)) : ($mapPreview = (<div className="previewMap">Map</div>))
    mapdetails ? ($mapdetailsPreview = (<img src={mapdetails} alt="mapdetails" />)) : ($mapdetailsPreview = (<div className="previewMap">Map Details</div>))
    panorama ? ($panoramaPreview = (<img src={panorama} alt="panorama" />)) : ($panoramaPreview = (<div className="previewPanorama">Panorama</div>))

    const redirAfterOffer = redirBackToRelays ? (<Redirect to='/relays' />) : (
      <div className="offer-relay">
        <h1>Offer new relay</h1>
        <form onSubmit={ this.offerRelay }>
          <input type='text' name='city' placeholder='City' value={ this.state.city } onChange= { this.offerDetailsRelay } required />
          <input type='text' name='address' placeholder='Address' value={ this.state.address } onChange= { this.offerDetailsRelay } required />
          <input type='text' name='details' placeholder='Details' value={ this.state.details } onChange= { this.offerDetailsRelay } required />
          <input type='date' name='date' placeholder='Date' value={ this.state.date } onChange= { this.offerDetailsRelay } required />
          <input name='thumb' type='file' onChange= { (e)=>this.createImage(e) } />
          <input name='flow' type='file' onChange= { (e)=>this.createImage(e) } />
          <input name='map' type='file' onChange= { (e)=>this.createImage(e) } />
          <input name='mapdetails' type='file' onChange= { (e)=>this.createImage(e) } />
          <input  name='panorama' type='file' onChange= { (e)=>this.createImage(e) } />
          <div className="previews">
            {$thumbPreview}
            {$flowPreview}
            {$mapPreview}
            {$mapdetailsPreview}
            {$panoramaPreview}
          </div>
          <input type='submit' value='Offer relay' />
        </form>
      </div>
    );

    const whatToRender = this.props.isLoggedIn ? (redirAfterOffer) : (<div>Please sign in before actions.</div>);
    return (
      whatToRender
    )
  }
}

export default OfferForm;
