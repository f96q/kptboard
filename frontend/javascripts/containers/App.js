import React, { Component } from 'react'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import Retrospective from '../components/Retrospective'
import LabelModal from '../components/LabelModal'
import Alert from '../components/Alert'
import * as Handlers from '../handlers/App'
import ActionCable from 'actioncable'
import humps from 'humps'
import findLabelPosition from '../utils/findLabelPosition'

const App = (props) => (
  <div>
    <Alert alert={props.alert} clearAlert={props.clearAlert} />
    <Retrospective
       dragStartId={props.dragStartId}
       labels={props.labels}
       users={props.users}
       email={props.email}
       openNewLabelModal={props.openNewLabelModal}
       dropLabel={props.dropLabel}
       addUser={props.addUser}
       removeUser={props.removeUser}
       setInvitationEmail={props.setInvitationEmail}
       destroyLabel={props.destroyLabel}
       openEditLabelModal={props.openEditLabelModal}
       dragStartLabel={props.dragStartLabel}
       dragEndLabel={props.dragEndLabel}
       destroyLabel={props.destroyLabel}
       openEditLabelModal={props.openEditLabelModal}
       dragStartLabel={props.dragStartLabel}
       dragEndLabel={props.dragEndLabel}
    />
    <LabelModal
       labelModal={props.labelModal}
       createLabel={props.createLabel}
       updateLabel={props.updateLabel}
       updateLabelModal={props.updateLabelModal}
       closeLabelModal={props.closeLabelModal}
     />
  </div>
)

const initialState = {
  alert: {
    type: null,
    messages: []
  },
  dragStartId: null,
  labelModal: {
    isOpen: false,
    clientX: 0,
    clientY: 0,
    label: {
      id: null,
      kind: null,
      description: ''
    }
  },
  labels: {
    keep: [],
    problem: [],
    try: []
  },
  users: [],
  email: '',
  labelsChannel: null,
  retrospectivesUsersChannel: null
}

export default compose(
  withState('alert', 'setAlert', initialState.alert),
  withState('dragStartId', 'setDragStartId', initialState.dragStartId),
  withState('labelModal', 'setLabelModal', initialState.labelModal),
  withState('labels', 'setLabels', initialState.labels),
  withState('users', 'setUsers', initialState.users),
  withState('email', 'setEmail', initialState.email),
  withState('labelsChannel', 'setLabelsChannel', initialState.labelsChannel),
  withState('retrospectivesUsersChannel', 'setRetrospectivesUsersChannel', initialState.retrospectivesUsersChannel),
  withHandlers(Handlers),
  lifecycle({
    componentDidMount() {
      const cable = ActionCable.createConsumer()
      const connected = function() { this.perform('open') }
      const received = (data) => {
        const action = humps.camelizeKeys(data)
        switch (action.type) {
          case 'SET_RETROSPECTIVE':
            this.props.setLabels(action.retrospective.labels)
          break

          case 'CREATE_LABEL': {
            let labels = { ...this.props.labels }
            labels[action.label.kind] = [action.label, ...labels[action.label.kind]]
            this.props.setLabels(labels)
          }
          break

          case 'UPDATE_LABEL': {
            let labels = { ...this.props.labels }
            const position = findLabelPosition(labels, action.id)
            if (position == null) oreturn
            labels[position.kind][position.index].description = action.label.description
            this.props.setLabels(labels)
          }
          break

          case 'DESTROY_LABEL': {
            let labels = { ...this.props.labels }
            const position = findLabelPosition(labels, action.id)
            if (position == null) return
            labels[position.kind].splice(position.index, 1)
            this.props.setLabels(labels)
          }
          break

          case 'DROP_LABEL': {
            let labels = { ...this.props.labels }
            const from = findLabelPosition(labels, action.id)
            if (from == null) return
            const label = { ...labels[from.kind][from.index] }
            labels[from.kind].splice(from.index, 1)
            if (label.kind != action.kind) {
              label.kind = action.kind
            }
            labels[action.kind].splice(action.index, 0, label)
            this.props.setLabels(labels)
          }
          break

          case 'ADD_USER':
            this.props.setUsers([...this.props.users, action.user])
          break

          case 'REMOVE_USER': {
            const id = action.id
            const users = this.props.users.filter(user => user.id != id)
            this.props.setUsers(users)
          }
          break

          case 'SET_ALERT':
            this.props.setAlert(action.alert)
          break
        }
      }
      cable.subscriptions.create({ channel: 'RetrospectivesChannel', room: this.props.retrospectiveId }, { connected: connected, received: received })
      this.props.setLabelsChannel(cable.subscriptions.create({ channel: 'LabelsChannel', room: this.props.retrospectiveId }, { received: received }))
      this.props.setRetrospectivesUsersChannel(cable.subscriptions.create({ channel: 'RetrospectivesUsersChannel', room: this.props.retrospectiveId }, { received: received }))
    }
  })
)(App)
