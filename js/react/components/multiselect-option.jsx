// Base Dependenies
import React from 'react';
import _ from 'lodash';

class Option extends React.Component {

  onChange(event) {
    this.props.onChange(event, this.props.data);
  }

  render() {
    
    var {data} = this.props;
    var props = {
      id: this.props.name + '-' + data.id,
      ref: 'input',
      type: this.props.type || 'checkbox',
      name: this.props.name,
      value: data.id,
      onChange: this.onChange.bind(this)
    };

    if (this.props.value && this.refs.input) {
      this.refs.input.checked = !!_.find(this.props.value, data);

      if (this.props.nested) {
        this.refs.input.checked = _.intersection(this.props.value, data.options).length > 0;
      }
    }

    return (
      <div className="multiselect-option">
        <input {...props}/>
        <label htmlFor={props.id}></label>
        <label htmlFor={this.props.nested? '' : props.id} onClick={this.props.onClick} className="multiselect-option-text">
          {data.label || data.id}
        </label>
      </div>
    );
  }
}

export default Option;
