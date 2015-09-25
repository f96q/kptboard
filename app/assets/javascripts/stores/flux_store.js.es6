'use strict';

class FluxStore {
  constructor(dispatcher) {
    this.state = this.getInitialState();
    this.eventEmitter = new EventEmitter();
    this.dispatcher = dispatcher;
    this.changeEvent = 'change';
    this.dispatcher.register((action) => {
      this.invokeOnDispatch(action);
    });
  }

  getState() {
    return this.state;
  }

  getInitialState() {
    return {};
  }

  addListener(listener) {
    this.eventEmitter.addListener(this.changeEvent, listener);
  }

  removeListener(listener) {
    this.eventEmitter.removeListener(this.changeEvent, listener);
  }

  emitChange() {
    this.eventEmitter.emit(this.changeEvent);
  }

  invokeOnDispatch(action) {

  }
}
