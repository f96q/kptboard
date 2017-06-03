import * as types from '../constants/ActionTypes'

const initialState = {
  alert: {
    type: null,
    messages: []
  }
}

export default function application(state = initialState, action) {
  switch (action.type) {
    case types.SET_ALERT:
      return { ...state, alert: action.alert }
    case types.CLEAR_ALERT:
      return { ...state, initialState }
  }
  return state
}
