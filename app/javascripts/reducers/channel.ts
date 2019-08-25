import {
  ActionCreator,
  buildActionCreator,
  createReducer,
  Reducer
} from 'hard-reducer'

import { DeepReadonly } from 'utility-types'

const {
  createAction
} = buildActionCreator({
  prefix: 'channels/'
})

type ChannelState = {

}

const initialState: ChannelState = {
  retrospectivesUsers: null,
  labels: null
}

export const setChannel: ActionCreator<{

}> = createAction('set-channel')

export const createLabel: ActionCreator<{

}> = createAction('create-label')

export const updateLabel: ActionCreator<{

}> = createAction('update-label')

export const destroyLabel: ActionCreator<{

}> = createAction('destroy-label')

export const dropLabel: ActionCreator<{

}> = createAction('drop-label')

export const addUser: ActionCreator<{

}> = createAction('add-user')

export const removeUser: ActionCreator<{

}> = createAction('remove-user')

export const reducer: Reducer<DeepReadonly<ChannelState>> = createReducer(initialState)
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
