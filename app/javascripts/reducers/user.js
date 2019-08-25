import {
  buildActionCreator,
  createReducer
} from 'hard-reducer'

import { setRetrospective } from '../actionCreators/globalActions'

const {
  createAction
} = buildActionCreator({
  prefix: 'users/'
})

const initialState = {
  users: [],
  email: ''
}

export const addUser = createAction('add-user')
export const removeUser = createAction('remove-user')
export const setInvitationEmail = createAction('set-invitation-email')

export const reducer = createReducer(initialState)
  .case(setRetrospective, (state, payload) => {
    return {
      ...state,
      users: payload.retrospective.users
    }
  })
  .case(addUser, (state, payload) => {
    return {
      ...state,
      users: [...state.users, payload.user]
    }
  })
  .case(removeUser, (state, payload) => {
    return {
      ...state,
      users: state.users.filter(user => user.id != payload.id)
    }
  })
  .case(setInvitationEmail, (state, payload) => {
    return {
      ...state,
      email: payload.email
    }
  })
