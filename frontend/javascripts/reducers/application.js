// @flow

import type { Action } from '../types'
import type { ApplicationState } from '../types/application'

const initialState: ApplicationState = {
  alert: {
    type: null,
    messages: []
  }
}

const application = (state: ApplicationState = initialState, action: Action): ApplicationState => {
  switch (action.type) {
    case 'SET_ALERT':
      return { ...state, alert: action.alert }
    case 'CLEAR_ALERT':
      return initialState

    default:
      return state
  }
}

export default application
