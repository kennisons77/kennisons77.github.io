// Base Dependencies
import React from 'react';
import _ from 'lodash';

// Flux Components
import OffersStore from '../stores/offers.store.jsx';
import OffersActions from '../actions/offers.actions.js';

// Components
import Icon from '../components/icon.jsx';

// Controllers
import Categories from './categories.controller.jsx';
import Location from './location.controller.jsx';

class Search extends React.Component {

  constructor(props) {

    super(props);

    this.state = OffersStore.getState();

    this.getState = this.getState.bind(this);
  }

  getState() {
    _.assign(this.state, OffersStore.getState());
    this.setState(this.state);
  }

  componentDidMount() {
    OffersStore.addChangeListener(this.getState);
  }

  componentWillUnmount() {
    OffersStore.removeChangeListener(this.getState);
  }

  locationText() {
    var location = this.state.location;
    return !!location?
      (_.isObject(location)?
        location.formatted_address:
        'Zipcode ' + location
      )
    : 'Set Location';
  }

  render() {
    var state = this.state;

    return (
      <div>
        <section className="search">
          {state.changeSearch? <Categories /> : null}
          <label onClick={() => OffersActions.open('changeSearch', true)} className="search-bar">
            <Icon name="icon-search"/>
            Search
          </label>
        </section>
        <section className="search">
          {state.changeLocation? <Location /> : null}
          <label onClick={() => OffersActions.open('changeLocation', true)} className="search-bar">
            <Icon name="icon-map-marker"/>
            {this.locationText()}
          </label>
        </section>
      </div>
    );
  }
}

export default Search;
