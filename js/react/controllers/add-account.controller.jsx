// Base Dependencies
import React, {Component} from 'react';
import _ from 'lodash';

// Components
import Input from '../components/input.jsx';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      institution: ''
    };

    _.bindAll(this, 'onChange');
  }

  onChange(name, {value}) {
    this.state[name] = value;

    if (value) {
      this.state.results = _.fill(new Array(5), 'Institution Name');
    }

    this.setState(this.state);
  }

  render() {
    var {state} = this;

    return (
      <div className="new-account">
        <h1>Add Account</h1>
        <form noValidate>
          <Input compact onChange={this.onChange} icon="icon-search" type="text" id="search-institution" placeholder="Serach" name="institution"/>
        </form>
        {state.institution?
          <div className="new-account-unsupported">
            <span>{"Sorry we don't support "}<strong>{state.institution}</strong> yet</span>
            <button className="button-wireframe-ligth full">{'Request ' + state.institution}</button>
            <span>{"We'll notify you once it's added"}</span>
          </div>
          :null
        }
      </div>
    );
  }
}

export default LoginForm;
