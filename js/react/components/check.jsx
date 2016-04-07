// Base Components
import React from 'react';

class Check extends React.Component {

  render() {

    return (
      <div className="input-container compact">
        <input {...this.props} type={this.props.type || 'checkbox'}/>
        <label htmlFor={this.props.id}>{this.props.label || this.props.name}</label>
      </div>
    );
  }
}

export default Check;
