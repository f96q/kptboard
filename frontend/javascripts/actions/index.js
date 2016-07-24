import * as types from '../constants/ActionTypes'
import channel from '../channels'

export function setLabels(labels) {
  return {
    type: types.SET_LABELS,
    labels: labels
  }
}

export function openNewLabelModal(typ, clientX, clientY) {
  return {
    type: types.OPEN_NEW_LABEL_MODAL,
    clientX: clientX,
    clientY: clientY,
    typ: typ
  }
}

export function openEditLabelModal(id, clientX, clientY) {
  return {
    type: types.OPEN_EDIT_LABEL_MODAL,
    clientX: clientX,
    clientY: clientY,
    id: id
  }
}

export function closeLabelModal() {
  return { type: types.CLOSE_LABEL_MODAL }
}

export function updateLabelModal(description) {
  return {
    type: types.UPDATE_LABEL_MODAL,
    description: description
  }
}

export function createLabel(label) {
  channel.labels.perform('create', { label: label })
  return dispatch => {}
}

export function updateLabel(id, label) {
  channel.labels.perform('update', { id: id, label: label })
  return dispatch => {}
}

export function destroyLabel(id) {
  channel.labels.perform('destroy', { id: id })
  return dispatch => {}
}

export function dragStartLabel(id) {
  return { type: types.DRAG_START_LABEL, id: id }
}

export function dragEndLabel() {
  return { type: types.DRAG_END_LABEL }
}

export function dropLabel(id, typ, index) {
  channel.labels.perform('position', { id: id, typ: typ, position: index + 1 })
  return dispatch => {}
}

export function setUsers(users) {
  return {
    type: types.SET_USERS,
    users: users
  }
}

export function addUser(email) {
  channel.retrospectives.perform('add_user', { email: email })
  return dispatch => {}
}

export function removeUser(id) {
  channel.retrospectives.perform('remove_user', { id: id })
  return dispatch => {}
}

