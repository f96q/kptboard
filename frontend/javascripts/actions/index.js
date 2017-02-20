import * as types from '../constants/ActionTypes'

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
    this.state.subscriptions.labels.perform('create', { label: label })
  }

  updateLabel(id, label) {
    this.state.subscriptions.labels.perform('update', { id: id, label: label })
  }

  destroyLabel(id) {
    this.state.subscriptions.labels.perform('destroy', { id: id })
  }

  dragStartLabel(id) {
    this.dispatch({ type: types.DRAG_START_LABEL, id: id })
  }

  dragEndLabel() {
    this.dispatch({ type: types.DRAG_END_LABEL })
  }

  dropLabel(id, typ, index) {
    this.state.subscriptions.labels.perform('position', { id: id, typ: typ, position: index + 1 })
  }

  setUsers(users) {
    this.dispatch({
      type: types.SET_USERS,
      users: users
    })
  }

  addUser(email) {
    this.state.subscriptions.retrospectives.perform('add_user', { email: email })
  }

  removeUser(id) {
    this.state.subscriptions.retrospectives.perform('remove_user', { id: id })
  }

  clearAlert() {
    this.dispatch({ type: types.CLEAR_ALERT })
  }
}
