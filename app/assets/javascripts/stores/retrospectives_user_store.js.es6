'use strict';

class RetrospectivesUserStore extends FluxStore {
  constructor(dispatcher) {
    super(dispatcher);
  }

  getInitialState() {
    return {
      users: []
    };
  }

  getUsers() {
    return this.state.users;
  }

  invokeOnDispatch(action) {
    switch (action.type) {
      case RetrospectivesUserConstants.SET_USERS:
        Object.assign(this.state.users, action.users);
        this.emitChange();
      break;

      case RetrospectivesUserConstants.CREATE:
        this.state.users.push(action.user);
        this.emitChange();
      break;
    }
  }
}
