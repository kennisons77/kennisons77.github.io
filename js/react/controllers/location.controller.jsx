// Base Dependencies
import React from 'react';
import _ from 'lodash';
import cn from 'classnames';

// Flux Components
import OffersActions from '../actions/offers.actions.js';

// Components
import Icon from '../components/icon.jsx';
import Input from '../components/input.jsx';
import Progress from '../components/progress.jsx';

// Helpers
import geocode from '../helpers/geocode.jsx';

class Search extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      search: '',
      zipcoded: false,
      validAddress: false,
      fetchigLocation: false,
      fetchigLocationSuccess: false,
      posibleLocation: []
    };

    _.bindAll(this, 'changeLocation', 'setLocation', 'getCurrentLocation');
    this.getAddress = _.debounce(this.getAddress.bind(this), 300);
  }

  getAddress() {

    if (!!this.state.address) {

      geocode.getGeocode(this.state.address, {
        componentRestrictions: {
          country: 'US'
        }
      }).then((locations) => {
        this.state.posibleLocation = locations;
        this.setState(this.state);
      });
    }
  }

  getCurrentLocation() {

    this.state.fetchigLocation = true;
    this.setState(this.state);

    geocode.getCity().then(({city}) => {
      var {zipcode, address} = this.state;
      this.state.fetchigLocation = false;
      this.state.fetchigLocationSuccess = true;
      if (!zipcode && !address) {

        this.state.geocode = city;
        this.choseLocation(city);
      } else {
        this.setState(this.state);
      }
    }).catch(() => {
      this.state.fetchigLocation = false;
      this.state.fetchigLocationSuccess = false;
    });
  }

  changeLocation(name, {value, valid}) {
    var zipcode = parseInt(value);
    var address;

    // Check if zipcode is a valid integer
    zipcode = !_.isNaN(zipcode) && zipcode == value ? zipcode : null; //eslint-disable-line eqeqeq

    // If the zipcode is not a valid integer search city
    if (zipcode === null) {
      address = value;
      this.getAddress();
      this.state.selected = null;
      this.state.validAddress = false;
    } else {
      this.state.validAddress = value.length === 5;
    }

    this.state.selected = null;
    this.state.geocode = null;
    this.state.posibleLocation = [];
    this.state.address = address;
    this.state.zipcode = zipcode;
    this.setState(this.state);
  }

  choseLocation(item) {
    this.state.selected = item;
    this.setState(this.state);
  }

  setLocation(item) {
    if (!!this.state.selected) {
      this.state.location = this.state.selected;
    } else {
      if (!!this.state.zipcode) {
        this.state.location = this.state.zipcode;
      };
    }
    OffersActions.changeLocation(this.state.location);
  }

  generateLocations() {

    return _.map(this.state.posibleLocation, (item) => {
      var classes = cn('location-results', {
        selected: item === this.state.selected
      });
      return (
        <div onClick={this.choseLocation.bind(this, item)} key={item.place_id} className={classes}>
          <Icon name="icon-map-marker"/>
          {item.formatted_address}
        </div>
      );
    });
  }

  generateGeolocationButton() {
    var {state} = this;
    var classes = cn('location-results', {
      selected: state.geocode
    });
    var {fetchigLocation, fetchigLocationSuccess} = state;

    return (

      <div onClick={this.getCurrentLocation} key={0} className={classes}>
        <Icon name="icon-gps"/>
        {!!state.geocode?
          state.geocode.formatted_address
          :'Current Location'
        }
        <Progress active={fetchigLocation} success={fetchigLocationSuccess} fail={!fetchigLocationSuccess}/>
      </div>
    );
  }

  getInputProps() {

    var length = !!this.state.zipcode? 5 : null;

    return {
      id: 'zipcode',
      type: 'search',
      icon: 'icon-map-marker',
      name: 'zipcode',
      hint: 'Enter a 5 digit Zipcode or an Address',
      onChange: this.changeLocation,
      maxlength: length,
      minlength: length,
      placeholder: 'City / Zipcode'
    };
  }

  render() {
    var locations = this.generateLocations();
    var {state} = this;

    locations.unshift(this.generateGeolocationButton());

    return (
      <div className="modal">
        <div onClick={() => OffersActions.open('changeLocation', false)} className="modal-icon ">
          <Icon className="icon" name="icon-close"/>
        </div>
        <div className="modal-header">
          Change Location
        </div>
        <div className="modal-container">
          <Input {...this.getInputProps()}/>
          <div className="location-container">
            {locations}
          </div>
          <button onClick={this.setLocation} disabled={!(state.validAddress || !!state.selected)} className="button button-sm full conpact">Change Location</button>
        </div>
      </div>
    );
  }
}

export default Search;
