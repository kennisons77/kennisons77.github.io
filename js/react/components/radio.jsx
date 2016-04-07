// Base Components
import React from 'react';
import _ from 'lodash';

// Components
import Check from './check.jsx';

const defaults = {
  type: 'radio',
  className: 'radio-gap'
};

class Checkbox extends React.Component {

  render() {

    var props = _.clone(this.props);
    _.assign(props, defaults);

    return (
      <Check {...props}/>
    );
  }
}

export default Checkbox;
