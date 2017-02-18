import * as types from '../constants/ActionTypes'
import channel from '../channels'

export default class ActionDispatcher {
  constructor(state, dispatch) {
    this.state = state
    this.dispatch = dispatch
  }

  setLabels(labels) {
    this.dispatch({
      type: types.SET_LABELS,
      labels: labels
    })
  }

  openNewLabelModal(typ, clientX, clientY) {
    this.dispatch({
      type: types.OPEN_NEW_LABEL_MODAL,
      clientX: clientX,
      clientY: clientY,
      typ: typ
    })
  }

  openEditLabelModal(id, clientX, clientY) {
    this.dispatch({
      type: types.OPEN_EDIT_LABEL_MODAL,
      clientX: clientX,
      clientY: clientY,
      id: id
    })
  }

  closeLabelModal() {
    this.dispatch({ type: types.CLOSE_LABEL_MODAL })
  }

  updateLabelModal(description) {
    this.dispatch({
      type: types.UPDATE_LABEL_MODAL,
      description: description
    })
  }

  createLabel(label) {
    channel.labels.perform('create', { label: label })
  }

  updateLabel(id, label) {
    channel.labels.perform('update', { id: id, label: label })
  }

  destroyLabel(id) {
    channel.labels.perform('destroy', { id: id })
  }

  dragStartLabel(id) {
    this.dispatch({ type: types.DRAG_START_LABEL, id: id })
  }

  dragEndLabel() {
    this.dispatch({ type: types.DRAG_END_LABEL })
  }

  dropLabel(id, typ, index) {
    channel.labels.perform('position', { id: id, typ: typ, position: index + 1 })
  }

  setUsers(users) {
    this.dispatch({
      type: types.SET_USERS,
      users: users
    })
  }

  addUser(email) {
    channel.retrospectives.perform('add_user', { email: email })
  }

  removeUser(id) {
    channel.retrospectives.perform('remove_user', { id: id })
  }
}
