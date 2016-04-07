import React, { Component, PropTypes } from 'react';
import TimeLine from 'timelinelite';

import cn from 'classnames';

class Progress extends Component {

  options(active) {
    var {type} = this.props;

    switch (type) {
      case 'indeterminate': {
        if (active) {
          this.indeterminate();
        } else {
          if (!!this.timeline) {
            this.timeline.kill();
          }
        }
        break;
      }
    }
  }

  indeterminate() {
    var timeline = new TimeLine({
      onComplete: () => timeline.play(0)
    });

    var {progress} = this.refs;

    timeline.fromTo(progress, 1,
      {width: '0%', 'margin-left': '0%'},
      {width: '100%', 'margin-left': '100%'}
    );
    timeline.fromTo(progress, 1,
      {width: '80%', 'margin-left': '-80%'},
      {width: '20%', 'margin-left': '100%'}
    );

    this.timeline = timeline;
  }

  componentWillUnmount() {
    this.options(false);
  }

  getClass() {
    var {active ,success, fail} = this.props;
    return cn('progress', 'progress-bar', {
      active,
      success: !active && success,
      fail: !active && fail
    });
  }

  render() {

    this.options(this.props.active);

    return (
      <div className={this.getClass()}>
        <span ref="progress" style={this.state} className="progress-completion"></span>
      </div>
    );
  }
}

Progress.propTypes = {
  type: PropTypes.string,
  active: PropTypes.bool,
  success: PropTypes.bool,
  fail: PropTypes.bool
};

Progress.defaultProps = {
  type: 'indeterminate',
  active: false,
  success: false,
  fail: false
};

export default Progress;
