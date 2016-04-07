// Base Dependencies
import React from 'react';
import _ from 'lodash';

// Flux Components
import OffersStore from '../stores/offers.store.jsx';
import OffersActions from '../actions/offers.actions.js';

// Components
import Icon from '../components/icon.jsx';
import Input from '../components/input.jsx';
import Multiselect from '../components/multiselect.jsx';
import Radio from '../components/radio.jsx';

class Search extends React.Component {

  constructor(props) {

    super(props);

    var options = [
      {
        label: 'Dining',
        id: 0,
        options: [
          {
            label: 'Dining',
            id: 1
          },
          {
            label: 'Entertainment',
            id: 2
          },
          {
            label: 'Shopping',
            id: 3
          },
          {
            label: 'Video Games',
            id: 4
          },
          {
            label: 'Others',
            id: 5
          }
        ]
      },
      {
        label: 'Entertainment',
        id: 6
      },
      {
        label: 'Shopping',
        id: 7
      },
      {
        label: 'Video Games',
        id: 8
      },
      {
        label: 'Others',
        id: 9
      }
    ];

    this.state = _.assign({
      options
    }, OffersStore.getState());

    _.bindAll(this, 'change');
  }

  change(name, {value}) {
    this.state[name] = value;
    this.setState(this.state);
  }

  render() {
    var state = this.state;

    return (
      <div id="categories" className="modal">
      	<div onClick={() => OffersActions.open('changeSearch', false)} className="modal-icon">
          <Icon className="icon" name="icon-close"/>
        </div>
        <div className="modal-header">
          Search Offer
        </div>
        <div className="modal-container">
          <Input onChange={this.change} compact type="search" icon="icon-search" id="search" placeholder="Store Name" name="search"/>
          <Multiselect multiple options={state.options} name="categories" label="All Categories"/>
          <div className="category-types">
            <Radio id="all" label="All" name="search-type"/>
            <Radio id="popular" label="Popular" name="search-type"/>
            <Radio id="trending" label="Trending" name="search-type"/>
          </div>
          <button className="button button-sm full conpact">Search Offers</button>
        </div>
      </div>
    );
  }
}

export default Search;
