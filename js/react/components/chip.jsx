// Base Dependenies
import React from 'react';

// Components
import Icon from './icon.jsx';

class Chip extends React.Component {

  render() {

    return (
      <span className="chip">
        {this.props.text + ' '}
        <Icon {...this.props} name="icon-close"/>
      </span>
    );
  }
}

export default Chip;
