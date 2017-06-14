// @flow

import { combineReducers } from 'redux'
import application from './application'
import labels from './labels'
import users from './users'

import type { State } from '../types'

export default combineReducers({
  application,
  labels,
  users
})

export const getAlert = (state: State) => {
  return state.application.alert
}

export const getDragStartId = (state: State) => {
  return state.labels.dragStartId
}

export const getLabelModal = (state: State) => {
  return state.labels.labelModal
}

export const getLabels = (state: State) => {
  return state.labels.labels
}

export const getUsers = (state: State) => {
  return state.users.users
}

export const getEmail = (state: State) => {
  return state.users.email
}
