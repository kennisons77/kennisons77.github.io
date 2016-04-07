import React from 'react';
class Icon extends React.Component {

  render() {
    return (
      <svg className="icon-source icon" {...this.props} viewBox="0 0 48 48">
        <use xlinkHref={(this.props.url || 'img/sprite.svg') + '#' + this.props.name}/>
      </svg>
    );
  }
}

export default Icon;
