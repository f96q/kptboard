import {
  buildActionCreator,
  createReducer
} from 'hard-reducer'

const {
  createAction
} = buildActionCreator({
  prefix: 'channels/'
})

const initialState = {
  retrospectivesUsers: null,
  labels: null
}

export const setChannel = createAction('set-channel')
export const createLabel = createAction('create-label')
export const updateLabel = createAction('update-label')
export const destroyLabel = createAction('destroy-label')
export const dropLabel = createAction('drop-label')
export const addUser = createAction('add-user')
export const removeUser = createAction('remove-user')

export const reducer = createReducer(initialState)
  .case(setChannel, (state, payload) => {
    return {
      ...state,
      retrospectivesUsers: payload.retrospectivesUsers,
      labels: payload.labels
    }
  })
  .case(createLabel, (state, payload) => {
    state.labels.perform('create', payload)
    return state
  })
  .case(updateLabel, (state, payload) => {
    state.labels.perform('update', payload)
    return state
  })
  .case(destroyLabel, (state, payload) => {
    state.labels.perform('destroy', payload)
    return state
  })
  .case(dropLabel, (state, payload) => {
    state.labels.perform('position', { id: payload.dragStartId, kind: payload.kind, position: payload.index + 1 })
    return state
  })
  .case(addUser, (state, payload) => {
    state.retrospectivesUsers.perform('create', payload)
    return state
  })
  .case(removeUser, (state, payload) => {
    state.retrospectivesUsers.perform('destroy', payload)
    return state
  })
