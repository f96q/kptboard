app.createLabelsChannel = function(cable, room, store) {
  return cable.subscriptions.create({channel: 'LabelsChannel', room: room}, {
    received: function(data) {
      store.dispatch(data)
    }
  });
}
