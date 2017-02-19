import { combineReducers } from 'redux'
import labels from './labels'
import users from './users'
import subscriptions from './subscriptions'

export default combineReducers({
  labels,
  users,
  subscriptions
})

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
  return state.users
}

export function getSubscriptions(state) {
  return state.subscriptions
}
