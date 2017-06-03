import * as types from '../constants/ActionTypes'

const initialState = {
  users: [],
  email: ''
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case types.SET_RETROSPECTIVE:
      return { ...state, users: action.retrospective.users }

    case types.ADD_USER:
      return { ...state, users: [...state, action.user] }

    case types.REMOVE_USER: {
      const users = state.users.filter(user => user.id != action.id)
      return { ...state, users: users }
    }

    case types.SET_EMAIL:
      return { ...state, email: action.email }
  }
  return state
}
