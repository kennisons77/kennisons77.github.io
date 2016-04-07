// Base Dependencies
import React from 'react';
import _ from 'lodash';
import cn from 'classnames';

// Components
import Input from '../components/input.jsx';
import Icon from '../components/icon.jsx';
import Checkbox from '../components/checkbox.jsx';

export default class EditProfile extends React.Component {

  render() {

    return (
      <section className="modal profile">
        <div className="modal-icon">
          <Icon className="icon" name="icon-close"/>
        </div>
        <div className="modal-header">
          Change Location
        </div>
        <div className="modal-container profile-container">
          <div className="profile-header">
            <Icon className="profile-photo icon" name="icon-account-circle"/>
            <div className="profile-name">
              Gustavo Laguna
            </div>
            <button className="button compact button-sm">Edit Photo</button>
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="profile-stat-val">2</span>
                Level
              </div>
              <div className="profile-stat">
                <span className="profile-stat-val">10</span>
                Plays
              </div>
              <div className="profile-stat">
                <span className="profile-stat-val">1000</span>
                Creadits
              </div>
            </div>
          </div>
          <form className="profile-form">
            <Input label="Full Name"/>
            <Input label="Email Address" type="email"/>
            <Input label="Bio"/>
            <Input label="Old Password" type="password"/>
            <Input label="New Password" type="password"/>
            <Input label="Repeat Password" type="password"/>
            <Checkbox id="sent-email" label="Join Our Mailing List." name="subscribe"/>
            <button className="button button-sm full conpact">Save Changes</button>
          </form>
        </div>
      </section>
    );
  }
}
