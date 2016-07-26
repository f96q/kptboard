import * as types from '../constants/ActionTypes'

const initialState = {
  users: []
}

export default function usersReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.SET_RETROSPECTIVE:
      return action.retrospective.users

    case types.ADD_USER: {
      return [...state, action.user]
    }

    case types.REMOVE_USER: {
      return state.filter(user => user.id != action.id)
    }
  }
  return state
}
