'use strict';

class RetrospectivesUserActions extends FluxActions {
  constructor(dispatcher) {
    super(dispatcher);
  }

  setUsers(users) {
    this.dispatch({
      type: RetrospectivesUserConstants.SET_USERS,
      users: users
    });
  }

  create(retrospectiveId, email) {
    webSocketUtils.trigger('retrospectives.add_user', {retrospective_id: retrospectiveId, email: email});
  }

  _create(user) {
    this.dispatch({
      type: RetrospectivesUserConstants.CREATE,
      user: user
    });
  }
}
