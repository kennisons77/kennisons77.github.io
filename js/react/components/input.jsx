// Base Dependencies
import React, {PropTypes, Component} from 'react';
import _ from 'lodash';
import cn from 'classnames';

// Component
import Icon from './icon.jsx';

// Helpers
import validations from '../helpers/validations.jsx';

class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      touched: false
    };

    this.state = _.assign(this.state, this.validate(''));

    _.bindAll(this, 'setTouched', 'handleChange', 'clearField');
  }

  clearField() {
    this.state.value = '';
    this.refs.input.value = '';
    this._onChange(this.state);
    this.setState(this.state);
  }

  componentDidMount() {
    if (this.props.onInit) {
      this.props.onInit(this.props.name, this.state);
    }
  }

  setTouched() {
    this.setState({
      touched: true
    });
  }

  validate(value) {

    var value = _.trim(value);
    var errors = {};
    var message = '';

    if (this.props.required) {
      errors.required = !_.isEmpty(value);
      
      if (!errors.required) {
        message = 'This field is required.';
      }
    }

    if (this.props.type === 'email' && !!value && !validations.email(value)) {
      errors.email = false;
      message = 'Enter a valid email.';
    }

    if (this.props.type === 'number' && !!value && !validations[this.props.format || 'number'](value)) {
      errors.email = false;
      message = 'Enter a valid ' + (this.props.format || 'number') + '.';
    }

    if (!!this.props.maxlength) {
      errors.maxlength = value.length <= this.props.maxlength;
    }

    if (!!this.props.minlength) {
      errors.minlength = value.length >= this.props.minlength;
    }

    return {
      value,
      errors,
      message,
      valid: !_.size(_.omitBy(errors, _.identity))
    };
  }

  handleChange(event) {

    var change = this.validate(event.target.value);
    this.setState(change);
    this._onChange(_.assign({}, this.state, change));
  }

  getInputProps() {

    var {touched, id, type, required, placeholder} = this.props;
    var state = this.state;

    var errors = _.clone(state.errors);

    // If untouched don't display errors
    if (!(touched || state.touched)) {
      errors = {};
    }

    var classes = cn({
      'float-label': !!state.value.length,
      'error': !!_.size(_.omitBy(errors, _.identity)),
      'touched': state.touched
    });

    return {
      id,
      type,
      ref: 'input',
      onBlur: this.setTouched,
      onChange: this.handleChange,
      required,
      className: classes,
      placeholder
    };
  }

  render() {
    var state = this.state;
    var props = this.props;

    var container = cn('input-container', {
      compact: props.compact
    });

    return (
      <div className={container}>
        {!!props.icon ? <Icon name={props.icon}/> : null}
        {props.type === 'search' && !!state.value ?
          <Icon onClick={this.clearField} className="icon close" name="icon-close"/>
          :null
        }
        <input {...this.getInputProps()}/>
        {!!props.label ?
          <label htmlFor={props.id}>{props.label}</label>
          :null
        }
        {!!state.message ?
          <span className="input-error">{state.message}</span>
          :null
        }
        {!!props.hint ?
          <span className="input-hint">{props.hint}</span>
          :null
        }
        {!!props.maxlength ?
          <span className="input-counter">
            <span className="input-counter-length">{state.value.length}</span>/
            <span className="input-counter-limit">{props.maxlength}</span>
          </span>
          :null
        }
      </div>
    );
  }

  _onChange(state) {
    if (this.props.onChange) {
      this.props.onChange(this.props.name, state);
    }
  }
}

Input.propTypes = {
  type: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string
};

Input.defaultProps = {
  type: 'text'
};

export default Input;
