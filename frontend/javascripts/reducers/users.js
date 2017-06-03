import * as types from '../constants/ActionTypes'

const initialState = {
  users: [],
  email: ''
}

export default function users(state = initialState, action) {
  switch (action.type) {
    case types.SET_RETROSPECTIVE:
      return Object.assign({}, state, { users: action.retrospective.users })

    case types.ADD_USER:
      return Object.assign({}, state, { users: [...state, action.user]  })

    case types.REMOVE_USER: {
      const users = state.users.filter(user => user.id != action.id)
      return Object.assign({}, state, { users: users })
    }

    case types.SET_EMAIL:
      return Object.assign({}, state, { email: action.email })
  }
  return state
}
