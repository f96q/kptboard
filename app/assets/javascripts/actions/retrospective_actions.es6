app.RetrospectiveActions = {
  setLabels: function(labels) {
    return {
      type: app.ActionTypes.SET_LABELS,
      labels: labels
    };
  },
  openDialogLabel: function(label, clientX, clientY, actions) {
    return {
      type: app.ActionTypes.OPEN_DIALOG_LABEL,
      clientX: clientX,
      clientY: clientY,
      label: label,
      actions: actions
    };
  },
  createLabel: function(label) {
    app.WebSocketDispatcher.trigger('labels.create', {label: label});
    return dispatch => {};
  },
  updateLabel: function(id, label) {
    app.WebSocketDispatcher.trigger('labels.update', {id: id, label: label});
    return dispatch => {};
  },
  destroyLabel: function(id) {
    app.WebSocketDispatcher.trigger('labels.destroy', {id: id});
    return dispatch => {};
  },
  dragStartLabel: function(id) {
    return {type: app.ActionTypes.DRAG_START_LABEL, id: id};
  },
  dragEndLabel: function() {
    return {type: app.ActionTypes.DRAG_END_LABEL};
  },
  dropLabel: function(id, typ, index) {
    app.WebSocketDispatcher.trigger('labels.update_position', {id: id, typ: typ, position: index + 1});
    return dispatch => {};
  },
  setUsers: function(users) {
    return {
      type: app.ActionTypes.SET_USERS,
      users: users
    };
  },
  addUser: function(email) {
    app.WebSocketDispatcher.trigger('retrospectives.add_user', {email: email});
    return dispatch => {};
  },
  removeUser: function(id) {
    app.WebSocketDispatcher.trigger('retrospectives.remove_user', {id: id});
    return dispatch => {};
  }
};
