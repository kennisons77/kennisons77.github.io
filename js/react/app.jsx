import ReactDOM from 'react-dom';
import LoginController from '../react/controllers/contact.controller.jsx';
import SingupController from '../react/controllers/singup.controller.jsx';
import SearchController from '../react/controllers/search.controller.jsx';
import JackpotController from '../react/controllers/jackpot.controller.jsx';
import EditProfileController from '../react/controllers/edit-profile.controller.jsx';
import ExchangeController from '../react/controllers/exchange.controller.jsx';
import AddAccountController from '../react/controllers/add-account.controller.jsx';

if (document.getElementById('LoginForm')) {
  ReactDOM.render(<LoginController/>, document.getElementById('LoginForm'));
}

if (document.getElementById('sinup-form')) {
  ReactDOM.render(<SingupController/>, document.getElementById('sinup-form'));
}

if (document.getElementById('jackpot-container')) {
  ReactDOM.render(<JackpotController/>, document.getElementById('jackpot-container'));
}

if (document.getElementById('search-box')) {
  ReactDOM.render(<SearchController/>, document.getElementById('search-box'));
}

if (document.getElementById('profile-edit')) {
  ReactDOM.render(<EditProfileController/>, document.getElementById('profile-edit'));
}

if (document.getElementById('exchange')) {
  ReactDOM.render(<ExchangeController/>, document.getElementById('exchange'));
}

if (document.getElementById('new-account')) {
  ReactDOM.render(<AddAccountController/>, document.getElementById('new-account'));
}
