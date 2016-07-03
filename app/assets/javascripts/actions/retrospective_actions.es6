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
    app.labelsChannel.perform('create', {label: label});
    return dispatch => {};
  },
  updateLabel: function(id, label) {
    app.labelsChannel.perform('update', {id: id, label: label});
    return dispatch => {};
  },
  destroyLabel: function(id) {
    app.labelsChannel.perform('destroy', {id: id});
    return dispatch => {};
  },
  dragStartLabel: function(id) {
    return {type: app.ActionTypes.DRAG_START_LABEL, id: id};
  },
  dragEndLabel: function() {
    return {type: app.ActionTypes.DRAG_END_LABEL};
  },
  dropLabel: function(id, typ, index) {
    app.labelsChannel.perform('position', {id: id, typ: typ, position: index + 1});
    return dispatch => {};
  },
  setUsers: function(users) {
    return {
      type: app.ActionTypes.SET_USERS,
      users: users
    };
  },
  addUser: function(email) {
    app.retrospectivesChannel.perform('add_user', {email: email})
    return dispatch => {};
  },
  removeUser: function(id) {
    app.retrospectivesChannel.perform('remove_user', {id: id})
    return dispatch => {};
  }
};
