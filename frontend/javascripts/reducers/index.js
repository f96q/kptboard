import { combineReducers } from 'redux'
import application from './application'
import labels from './labels'
import users from './users'
import subscriptions from './subscriptions'

export default combineReducers({
  application,
  labels,
  users,
  subscriptions
})

export function getAlert(state) {
  return state.application.alert
}

export function getDragStartId(state) {
  return state.labels.dragStartId
}

export function getLabelModal(state) {
  return state.labels.labelModal
}

export function getLabels(state) {
  return state.labels.labels
}

export function getUsers(state) {
  return state.users.users
}

export function getEmail(state) {
  return state.users.email
}

export function getSubscriptions(state) {
  return state.subscriptions
}
