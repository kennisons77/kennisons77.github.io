// Base Dependencies
import React from 'react';
import _ from 'lodash';
import cn from 'classnames';

// Components
import Multiselect from '../components/multiselect.jsx';
import Icon from '../components/icon.jsx';

export default class Exchange extends React.Component {

  constructor(props) {
    super(props);

    var options = [
      {
        label: '1 Play',
        id: 1
      },
      {
        label: '2 Plays',
        id: 2
      },
      {
        label: '3 Plays',
        id: 3
      }
    ];

    this.state = {
      options
    };
  }

  render() {

    return (
      <section className="modal">
        <div className="modal-icon">
          <Icon className="icon" name="icon-close"/>
        </div>
        <div className="modal-header">
          Exchange Credits
        </div>
        <div className="modal-container exchange-container">
          <Icon className="icon exchange-icon" name="icon-store"/>
          <div className="exchange-note">Exchange <strong>100 credits</strong> {'for'} <strong>1 extra play</strong>.</div>
          <form>
            <div className="exchange-selection">
              <Multiselect name="plays" options={this.state.options}/>
              <span>{'='}</span>
              <span>100 credits</span>
            </div>
            <div className="exchange-disclaimer">Limit 5 per day. Plays Expire the same day.</div>
            <button className="button full conpact">Exchange</button>
          </form>
        </div>
      </section>
    );
  }
}
