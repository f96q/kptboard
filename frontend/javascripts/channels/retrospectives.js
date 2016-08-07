import humps from 'humps'

export default function createRetrospectivesChannel(cable, room, store) {
  return cable.subscriptions.create({ channel: 'RetrospectivesChannel', room: room }, {
    connected: function() {
      this.perform('open');
    },
    received: function(data) {
      store.dispatch(humps.camelizeKeys(data))
    }
  })
}
