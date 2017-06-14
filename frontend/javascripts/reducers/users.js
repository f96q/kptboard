// @flow

import type { Action } from '../types'
import type { Users, UsersState } from '../types/users'

const initialState: UsersState = {
  users: [],
  email: ''
}

const users = (state: UsersState = initialState, action: Action): UsersState => {
  switch (action.type) {
    case 'SET_RETROSPECTIVE':
      return { ...state, users: action.retrospective.users }

    case 'ADD_USER':
      return { ...state, users: [...state.users, action.user] }

    case 'REMOVE_USER': {
      const id = action.id
      const users = state.users.filter(user => user.id != id)
      return { ...state, users: users }
    }

    case 'SET_INVITATION_EMAIL':
      return { ...state, email: action.email }

    default:
      return state
  }
}

export default users
