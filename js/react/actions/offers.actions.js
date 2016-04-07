import Dispatcher from '../dispatcher/dispatcher.js';
import LoginConstants from '../constants/offers.constants.js';

export default {
  open,
  changeLocation
};

function open(modal, state) {
  Dispatcher.dispatch({
    state,
    modal,
    type: LoginConstants.OPEN_MODAL
  });
}

function changeLocation(location) {
  Dispatcher.dispatch({
    location,
    type: LoginConstants.UPDATE_LOCATION
  });
}
