import React from 'react'
import actioncable from 'actioncable'
import humps from 'humps'
import { lifecycle } from 'recompose'
import { connector } from '../actionCreators'

export const ActionCable = connector(
  state => ({}),
  actions => ({
    setChannel: actions.channel.setChannel,
    setRetrospective: actions.global.setRetrospective,
    createLabel: actions.label.createLabel,
    updateLabel: actions.label.updateLabel,
    destroyLabel: actions.label.destroyLabel,
    dropLabel: actions.label.dropLabel,
    addUser: actions.user.addUser,
    removeUser: actions.user.removeUser,
    setAlert: actions.app.setAlert,
    clearAlert: actions.app.clearAlert
  }),
  lifecycle({
    componentDidMount() {
      const {
        retrospectiveId,
        setChannel,
        setRetrospective,
        createLabel,
        updateLabel,
        destroyLabel,
        dropLabel,
        addUser,
        removeUser,
        setAlert,
        clearAlert
      } = this.props
      const cable = actioncable.createConsumer()
      const received = (data) => {
        const result = humps.camelizeKeys(data)
        switch (result.type) {
          case 'SET_RETROSPECTIVE':
            setRetrospective({ retrospective: result.retrospective })
            break
          case 'CREATE_LABEL':
            createLabel({ label: result.label })
            break
          case 'UPDATE_LABEL':
            updateLabel({ id: result.id, label: result.label })
            break
          case 'DESTROY_LABEL':
            destroyLabel({ id: result.id })
            break
          case 'DROP_LABEL':
            dropLabel({ id: result.id, kind: result.kind, index: result.index })
            break
          case 'ADD_USER':
            addUser({ email: result.email })
            break
          case 'REMOVE_USER':
            removeUser({ id: result.id })
            break
          case 'SET_ALERT':
            setAlert({ alert: result.alert })
            break
          case 'CLEAR_ALERT':
            clearAlert()
            break
        }
      }
      const connected = function() { this.perform('open') }
      cable.subscriptions.create({ channel: 'RetrospectivesChannel', room: retrospectiveId }, { connected: connected, received: received })
      setChannel({
        retrospectivesUsers: cable.subscriptions.create({ channel: 'RetrospectivesUsersChannel', room: retrospectiveId }, { received: received }),
        labels: cable.subscriptions.create({ channel: 'LabelsChannel', room: retrospectiveId }, { received: received })
      })
    }
  })
)(function ActionCableImpl() {
  return null
})
