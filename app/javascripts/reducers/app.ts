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
  prefix: 'app/'
})

export type Alert = {
  type: null | 'success' | 'alert'
  messages: string[]
}

type AppState = {
  alert: Alert
}

const initialState: DeepReadonly<AppState> = {
  alert: {
    type: null,
    messages: []
  }
}

export const setAlert: ActionCreator<{
  alert: Alert
}> = createAction('set-alert')

export const clearAlert: ActionCreator<{}> = createAction('clear-alert')

export const reducer: Reducer<DeepReadonly<AppState>> = createReducer(initialState)
  .case(setAlert, (state, payload) => {
    return {
      ...state,
      alert: payload.alert
    }
  })
  .case(clearAlert, (state, payload) => {
    return initialState
  })
