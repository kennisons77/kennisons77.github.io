// Base Dependencies
import React from 'react';
import _ from 'lodash';
import cn from 'classnames';
import $ from 'jquery';

// Constants
import JackpotConstants from '../constants/jackpot.constants.js';

class Jackpot extends React.Component {

  constructor(props) {
    super(props);

    _.bindAll(this,'selected', 'randomStart');

    this.state = {
      random: false,
      selected: []
    };

    _.assign(this.state, JackpotConstants);
  }

  componentDidMount() {
    $(window).on('touchmove scroll', (e) => {
      var windowTop = $(window).scrollTop() + $('body > header').outerHeight();
      var elemTop = $(this.refs.header).parent().offset().top;
      this.state.stickHeader = windowTop >= elemTop;
      this.state.headerHeight = $(this.refs.header).outerHeight();
      this.setState(this.state);
    });
  }

  remove(index) {
    this.state.selected.splice(index, 1);
    this.setState(this.state);
  }

  randomStart() {

    if (this.state.random === true) {
      return;
    }

    var numbers = [];
    var interval;

    this.state.random = true;
    this.state.selected = [];
    this.setState(this.state);

    for (var i = this.state.range[0]; i <= this.state.range[1]; i++) {
      numbers.push(i);
    };

    interval = setInterval(() => {
      this.state.selected.push(numbers.splice(_.random(numbers.length - 1), 1)[0]);
      this.setState(this.state);

      if (numbers.length === 0) {
        clearInterval(interval);
        this.randomEnd();
      }
    }, 5);

  }

  randomEnd() {
    var interval;
    var selected = this.state.selected;

    interval = setInterval(() => {
      selected.splice(_.random(selected.length - 1), 1);

      if (selected.length === this.state.numbers) {
        clearInterval(interval);
        this.state.random = false;
      }
      this.setState(this.state);
    }, 5);
  }

  selected(value) {
    if (this.state.selected.length < this.state.numbers && this.state.selected.indexOf(value) === -1) {
      this.state.selected.push(value);
      this.setState(this.state);
    }
  }

  render() {

    var numbers = [];
    var selections = [];

    for (let i = 0; i < this.state.numbers; i++) {
      var classes = cn('jackpot-number', {
        active: !this.state.random && !!this.state.selected[i]
      });
      numbers.push(<span className={classes} onClick={()=>this.remove(i)} key={'number-' + i} data-number={!this.state.random ? this.state.selected[i] : null}></span>);
    };

    for (let i = this.state.range[0]; i <= this.state.range[1]; i++) {
      var classes = cn('jackpot-number', {
        active: this.state.selected.indexOf(i) !== -1
      });
      selections.push(<span className={classes} onClick={()=>this.selected(i)} key={'selection-' + i} data-number={i}></span>);
    };

    var style = {
      display: this.state.stickHeader? 'block': 'none',
      height: this.state.headerHeight + 'px'
    };

    var header = cn('jackpot-header', {
      sticky: this.state.stickHeader
    });

    return (
      <section className="jackpot">
        <div className="jackpot-header-placeholder" style={style}></div>
        <header ref="header" className={header}>
          <div className="jackpot-header-selection">
            <h1>My Numbers</h1>
            <div className="jackpot-number-container">
              {numbers}
            </div>
          </div>
        </header>
        <div className="jackpot-selection">
          <h2>{'Pick ' + this.state.numbers + ' Numbers'}</h2>
          {selections}
        </div>
        <div className="jackpot-toolbar">
          <button className="button compact full button-wireframe" onClick={this.randomStart}>Auto Select</button>
          <button disabled={this.state.selected.length !== this.state.numbers || this.state.random === true} className="button compact full">Submit</button>
        </div>
      </section>
    );
  }
}

export default Jackpot;
