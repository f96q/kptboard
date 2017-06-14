// @flow

export type User = {
  id: number,
  name: string
}

export type Users = Array<User>

export type UsersState = {
  users: Users,
  email: string
}

type ActionCableAction =
  | { type: 'ACTION_CABLE_ADD_USER', email: string }
  | { type: 'ACTION_CABLE_REMOVE_USER', id: number }

export type UserAction =
  | ActionCableAction
  | { type: 'SET_INVITATION_EMAIL', email: string }
  | { type: 'ADD_USER', user: User }
  | { type: 'REMOVE_USER', id: number }
