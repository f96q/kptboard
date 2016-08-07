import humps from 'humps'

export default function createLabelsChannel(cable, room, store) {
  return cable.subscriptions.create({ channel: 'LabelsChannel', room: room }, {
    received: function(data) {
      store.dispatch(humps.camelizeKeys(data))
    }
  })
}
