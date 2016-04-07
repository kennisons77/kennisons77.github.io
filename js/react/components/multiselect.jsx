// Base Dependenies
import React from 'react';
import _ from 'lodash';
import cn from 'classnames';

// Components
import Option from '../components/multiselect-option.jsx';

class Multiselect extends React.Component {
  constructor(props) {
    super(props);

    // Set defult state
    this.state = {
      open: false,
      checked: false,
      options: []
    };

    // Bind functions to instance
    _.bindAll(this, 'toggle', 'optonChange', 'nestedChange');
  }

  getDefault() {

    if (this.state.options.length !== 0) {
      return this.state.options;
    } else {
      return this.props.label || [_.find(this.props.options, {
        default: true
      }) || _.head(this.props.options)];
    }
  }

  nestedChange(data, {value}, pulled) {

    if (_.isEmpty(pulled)) {

      var value = _.difference(value, this.state.options);
      _.forEach(value, (item) => this.state.options.push(item));
    } else {

      _.pull.apply(_, [this.state.options].concat(pulled));
    }

    this.setState(this.state);
  }

  optonChange({target}, data) {

    var pulled = [];

    // If not multiselected ensure only one option is selected
    if (!this.props.multiple) {
      this.state.options.pop();
    }

    if (target.checked) {
      if (data.options) {
        _.forEach(data.options, (item) => this.state.options.push(item));
      } else {
        this.state.options.push(data);
      }
    } else {

      pulled.push(data);
      _.pull(this.state.options, data);
      if (data.options) {

        pulled = pulled.concat(data.options);
        _.pull.apply(_, [this.state.options].concat(data.options));
      }
    }

    this.setState(this.state);

    if (this.props.onChange) {
      this.props.onChange(this.props.name, {
        value: !this.props.multiple? _.head(this.state.options): this.state.options
      }, pulled);
    }
  }

  toggle(value) {
    var value = _.isObject(value) ? !this.state.open : value;
    this.state.open = value;
    this.setState(this.state);
  }

  render() {

    var classes = cn('multiselect', {
      'open': this.state.open
    });

    var props = {
      name: this.props.name,
      type: this.props.multiple ? 'checkbox' : 'radio',
      multiple: this.props.multiple
    };

    var options = _.map(this.props.options, (item, id) => {
      var key = {
        key: 'option-' + item.id,
        value: this.props.value || this.state.options
      };

      return (item.options ?
        <Multiselect {...key} {...props} onChange={this.nestedChange} nested item={item} options={item.options}/>:
        <Option {...key} {...props} onChange={this.optonChange} data={item}/>
      );
    });

    var selected = this.getDefault();

    return (
      <div onMouseLeave={this.toggle.bind(this, false)} className={classes}>
        {this.props.nested ?
          <Option value={this.props.value} onClick={this.toggle} onChange={this.optonChange} data={this.props.item} nested/>
          :<span onClick={this.toggle} className="multiselect-label">
            {_.isArray(selected)? _.map(selected, 'label').join(' - ') : selected}
          </span>
        }
        <div className="multiselect-options">
          {options}
        </div>
      </div>
    );
  }
}

export default Multiselect;
