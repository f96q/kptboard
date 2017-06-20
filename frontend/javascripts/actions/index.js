// @flow

import type { Labels, Label, CreateLabel, UpdateLabel } from '../types/labels'
import type { Users } from '../types/users'
import type { Action } from '../types/'

export const openNewLabelModal = (kind: string, clientX: number, clientY: number): Action => {
  return {
    type: 'OPEN_NEW_LABEL_MODAL',
    clientX: clientX,
    clientY: clientY,
    kind: kind
  }
}

export const openEditLabelModal = (id: number, clientX: number, clientY: number): Action => {
  return {
    type: 'OPEN_EDIT_LABEL_MODAL',
    clientX: clientX,
    clientY: clientY,
    id: id
  }
}

export const closeLabelModal = (): Action => {
  return { type: 'CLOSE_LABEL_MODAL' }
}

export const updateLabelModal = (description: string): Action => {
  return {
    type: 'UPDATE_LABEL_MODAL',
    description: description
  }
}

export const dragStartLabel = (id: number): Action => {
  return { type: 'DRAG_START_LABEL', id: id }
}

export const dragEndLabel = (): Action => {
  return { type: 'DRAG_END_LABEL' }
}

export const setInvitationEmail = (email: string): Action => {
  return { type: 'SET_INVITATION_EMAIL', email: email }
}

export const clearAlert = (): Action => {
  return { type: 'CLEAR_ALERT' }
}

export const createLabel = (label: CreateLabel): Action => {
  return { type: 'ACTION_CABLE_CREATE_LABEL', label: label }
}

export const updateLabel = (id: number, label: UpdateLabel): Action =>{
  return { type: 'ACTION_CABLE_UPDATE_LABEL', id: id, label: label }
}

export const destroyLabel = (id: number): Action => {
  return { type: 'ACTION_CABLE_DESTROY_LABEL', id: id }
}

export const dropLabel = (id: number, kind: string, index: number): Action => {
  return { type: 'ACTION_CABLE_DROP_LABEL', id: id, kind: kind, index: index }
}

export const addUser = (email: string): Action => {
  return { type: 'ACTION_CABLE_ADD_USER', email: email }
}

export const removeUser = (id: number): Action => {
  return { type: 'ACTION_CABLE_REMOVE_USER', id: id }
}

