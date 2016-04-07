// Flux Components
import FluxStore from '../helpers/store.js';
import Dispatcher from '../dispatcher/dispatcher.js';
import LoginConstants from '../constants/offers.constants.js';

var location = {
  location: null,
  categories: [],
  searchTerm: '',
  changeSearch: false,
  changeLocation: false
};

class OfferStore extends FluxStore {

  getState() {
    return location;
  }
}

var offerstore = new OfferStore();

offerstore.dispatchToken = Dispatcher.register(action => {

  switch (action.type) {
    case LoginConstants.UPDATE_LOCATION:
      location.location = action.location;
      location.changeLocation = false;
      break;
    case LoginConstants.OPEN_MODAL:
      location[action.modal] = action.state;
      break;
    default:
      return;
  }
  
  offerstore.emitChange();

});

export default offerstore;
