// Base Dependencies
import React from 'react';

// Components
import Input from '../components/input.jsx';
import Checkbox from '../components/checkbox.jsx';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    _.bindAll(this, 'submitForm');

    this.state = {};
  }

  submitForm(event) {
    this.setState(_.assign({}, this.state, {
      touched: true
    }));

    event.preventDefault();
    return false;
  }

  render() {
    return (
      <form noValidate>
        <div className="row">
          <Input touched={this.state.touched} required type="text" id="message-name" label="Name" name="name"/>
          <Input touched={this.state.touched} required type="text" id="message-phone" label="Phone" name="phone"/>
        </div>
        <div className="row">
          <Input touched={this.state.touched} required type="email" id="message-email" label="Email" name="email"/>
          <Input touched={this.state.touched} required type="text" id="message-subject" label="Subject" name="subject"/>
        </div>
        <Input touched={this.state.touched} required onChange={this._onChange} onInit={this._onChange} type="text" id="message-message" label="Message" name="message"/>
        <Checkbox id="message-subscribe" label="Join Our Mailing List." name="subscribe"/>
        <button onClick={this.submitForm} className="button">Send</button>
      </form>
    );
  }
}

export default LoginForm;
