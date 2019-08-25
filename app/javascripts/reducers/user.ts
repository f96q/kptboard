import {
  ActionCreator,
  buildActionCreator,
  createReducer,
  Reducer
} from 'hard-reducer'

import { DeepReadonly } from 'utility-types'

import { setRetrospective } from '../actionCreators/globalActions'

const {
  createAction
} = buildActionCreator({
  prefix: 'users/'
})

type User = {
  id: string
  name: string
}

type UserState = {
  users: User[]
  email: string
}

const initialState: DeepReadonly<UserState> = {
  users: [],
  email: ''
}

export const addUser: ActionCreator<{
  user: User
}> = createAction('add-user')

export const removeUser: ActionCreator<{
  id: string
}> = createAction('remove-user')

export const setInvitationEmail: ActionCreator<{
  email: string
}> = createAction('set-invitation-email')

export const reducer: Reducer<DeepReadonly<UserState>> = createReducer(initialState)
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
