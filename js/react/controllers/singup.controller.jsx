// Base Dependencies
import React from 'react';
import _ from 'lodash';
import cn from 'classnames';

// Components
import Input from '../components/input.jsx';
import Checkbox from '../components/checkbox.jsx';
import Icon from '../components/icon.jsx';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    _.bindAll(this, '_onChange', 'submitForm');

    this.state = {
      step: 1,
      steps: 2,
      fields: {},
      valid: {}
    };

  }

  submitForm(event) {
    event.preventDefault();

    this.state.touched = true;

    if (this.state.step === 1) {

      var validStep = _.pick(this.state.valid, ['routing', 'socialSecurity', 'zipCode']);
      if (!_.size(_.omitBy(validStep, _.identity))) {
        _.assign(this.state,{
          step: 2,
          touched: false
        });
      }
    }

    this.setState(this.state);
    return false;
  }

  render() {

    var steps = [];
    var stepClass = [];

    for (var i = 1; i <= this.state.steps; i++) {
      var step = this.state.step;
      var classes = cn({
        active: step === i
      });

      stepClass.push(cn('step', {
        'in': i > step,
        'out': i < step,
        'current': i === step
      }));

      steps.push(<span key={'step-' + i} className={classes}></span>);
    };

    return (
      <form noValidate>
        <div className="access-steps">
          {steps}
        </div>
        <div className={stepClass[0]}>
          <Input touched={this.state.touched} required onChange={this._onChange} onInit={this._onChange} type="number" format="integer" id="signup-routing" label="Bank Routing Number" name="routing"/>
          <Input touched={this.state.touched} required onChange={this._onChange} onInit={this._onChange} type="number" format="integer" id="signup-social-number" label="Last 4 of Social Security" name="socialSecurity" maxlength="4"/>
          <Input touched={this.state.touched} required onChange={this._onChange} onInit={this._onChange} type="number" format="integer" id="signup-zip-code" label="Postal Zip Code" name="zipCode"/>
          <button onClick={this.submitForm} className="button full">Validate</button>
        </div>
        <div className={stepClass[1]}>
          <button onClick={this.submitForm} className="button button-wireframe-ligth full">
            <Icon name="icon-facebook"/>
            Sign up with Facebook
          </button>
          <button onClick={this.submitForm} className="button button-wireframe-ligth full">
            <Icon name="icon-twitter"/>
            Sign up with Twitter
          </button>
          <hr className="or"/>
          <Input touched={this.state.touched} required onChange={this._onChange} onInit={this._onChange} type="text" id="signup-name" label="Name" name="name"/>
          <Input touched={this.state.touched} required onChange={this._onChange} onInit={this._onChange} type="email" id="signup-email" label="Email" name="email"/>
          <Input touched={this.state.touched} required onChange={this._onChange} onInit={this._onChange} type="password" id="signup-password" label="Password" name="password"/>
          <Input touched={this.state.touched} required onChange={this._onChange} onInit={this._onChange} type="password" id="signup-password-repeat" label="Repeat Password" name="passwordRepeat"/>
          <Checkbox id="signup-resident" label="I am a United State resident." name="resident"/>
          <Checkbox id="signup-terms" label="I accept the terms of service." name="acceptTerms"/>
          <button onClick={this.submitForm} className="button full">Validate</button>
        </div>
      </form>
    );
  }

  _onChange(field, {valid, value}) {
    _.merge(this.state.fields, {
      [field]: value
    });
    _.merge(this.state.valid, {
      [field]: valid
    });
    this.setState(this.state);
  }
}

export default LoginForm;
