import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

class Store extends EventEmitter {
  
  emitChange(data) {
    this.emit(CHANGE_EVENT, data);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

Store.dispatchToken = null;

export default Store;
