import * as types from '../constants/ActionTypes'

const initialState = {
  retrospectives: null,
  retrospectivesUsers: null,
  labels: null
}

export default function subscriptions(state = initialState, action) {
  switch (action.type) {
    case types.SET_SUBSCRIPTIONS: {
      const retrospectives = action.subscriptions.retrospectives
      const retrospectivesUsers =  action.subscriptions.retrospectivesUsers
      const labels = action.subscriptions.labels
      return { ...state, retrospectives: retrospectives, labels: labels, retrospectivesUsers: retrospectivesUsers }
    }
  }
  return state
}
