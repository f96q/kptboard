import * as types from '../constants/ActionTypes'

const initialState = {
  retrospectives: null,
  labels: null
}

export default function subscriptions(state = initialState, action) {
  switch (action.type) {
    case types.SET_SUBSCRIPTIONS:
      return Object.assign({}, state, action.subscriptions)
  }
  return state
}
