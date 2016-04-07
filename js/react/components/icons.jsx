import React from 'react';
import Icon from './icon.jsx';

class Icons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      icons: []
    };

    $.get(this.props.url, getIcons.bind(this));

    function getIcons(sprite) {
      var icons = [];

      $(sprite).find('symbol').each(function getId(i, symbol) {
        icons.push(symbol.id);
      });

      this.setState({icons: icons});
    };
  }

  render() {
    var icons = [];
    this.state.icons.forEach((function(iconName, index) {
      icons.push(
        <div key={iconName} className="icon-sample card-z3">
          <Icon name={iconName} url={this.props.url}/>
          <div className="icon-text">{iconName}</div>
        </div>
      );
    }).bind(this));
    return (
      <div className="icons">
        {icons}
      </div>
    );
  }
}

export default Icons;
