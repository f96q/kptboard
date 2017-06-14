import ActionCable from 'actioncable'
import humps from 'humps'

let retrospectivesUsersChannel = null
let labelsChannel = null

const actionCable = store => next => action => {
  switch (action.type) {
    case 'ACTION_CABLE_CREATE':
      const cable = ActionCable.createConsumer()
      const received = (data) => {
        store.dispatch(humps.camelizeKeys(data))
      }
      const connected = function() { this.perform('open') }
      cable.subscriptions.create({ channel: 'RetrospectivesChannel', room: action.retrospectiveId }, { connected: connected, received: received })
      retrospectivesUsersChannel = cable.subscriptions.create({ channel: 'RetrospectivesUsersChannel', room: action.retrospectiveId }, { received: received })
      labelsChannel = cable.subscriptions.create({ channel: 'LabelsChannel', room: action.retrospectiveId }, { received: received })
    break

    case 'ACTION_CABLE_CREATE_LABEL':
      labelsChannel.perform('create', { label: action.label })
    break

    case 'ACTION_CABLE_UPDATE_LABEL':
      labelsChannel.perform('update', { id: action.id, label: action.label })
    break

    case 'ACTION_CABLE_DESTROY_LABEL':
      labelsChannel.perform('destroy', { id: action.id })
    break

    case 'ACTION_CABLE_DROP_LABEL':
      labelsChannel.perform('position', { id: action.id, typ: action.typ, position: action.index + 1 })
    break

    case 'ACTION_CABLE_ADD_USER':
      retrospectivesUsersChannel.perform('create', { email: action.email })
    break

    case 'ACTION_CABLE_REMOVE_USER':
      retrospectivesUsersChannel.perform('destroy', { id: action.id })
    break

    default:
      return next(action)
  }
}

export default actionCable
