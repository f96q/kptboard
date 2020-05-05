import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import actioncable from 'actioncable'
import humps from 'humps'
import { actions } from '../actionCreators'

export const ActionCable = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const cable = actioncable.createConsumer()
    const received = (data) => {
      const result = humps.camelizeKeys(data)
      switch (result.type) {
        case 'SET_RETROSPECTIVE':
          dispatch(actions.global.setRetrospective({ retrospective: result.retrospective }))
        break
        case 'CREATE_LABEL':
          dispatch(actions.label.createLabel({ label: result.label }))
        break
        case 'UPDATE_LABEL':
          dispatch(actions.label.updateLabel({ id: result.id, label: result.label }))
          break
        case 'DESTROY_LABEL':
          dispatch(actions.label.destroyLabel({ id: result.id }))
          break
        case 'DROP_LABEL':
          dispatch(actions.label.dropLabel({ id: result.id, kind: result.kind, index: result.index }))
          break
        case 'ADD_USER':
          dispatch(actions.user.addUser({ email: result.email }))
          break
        case 'REMOVE_USER':
          dispatch(actions.user.removeUser({ id: result.id }))
          break
        case 'SET_ALERT':
          dispatch(actions.app.setAlert({ alert: result.alert }))
          break
        case 'CLEAR_ALERT':
          dispatch(actions.app.clearAlert({}))
          break
        }
      }
      const connected = function() { this.perform('open') }
      cable.subscriptions.create({ channel: 'RetrospectivesChannel', room: props.retrospectiveId }, { connected: connected, received: received })
      dispatch(actions.channel.setChannel({
        retrospectivesUsers: cable.subscriptions.create({ channel: 'RetrospectivesUsersChannel', room: props.retrospectiveId }, { received: received }),
        labels: cable.subscriptions.create({ channel: 'LabelsChannel', room: props.retrospectiveId }, { received: received })
      }))
  }, [])

  return <></>
}
