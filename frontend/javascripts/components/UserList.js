// @flow

import React from 'react'

import UserItem from './UserItem'

import type { Users } from '../types/users'
import type { addUser, removeUser, setInvitationEmail } from '../types/actions'

type Props = {
  users: Users,
  email: string,
  addUser: addUser,
  removeUser: removeUser,
  setInvitationEmail: setInvitationEmail
}

const UserList = ({ users, email, addUser, removeUser, setInvitationEmail }: Props) => {
  const isDestroy = users.length > 1
  return (
    <div className="UserList">
      <input
        className="UserList-emailForm"
        type="email"
        placeholder="email"
        onChange={(event: SyntheticInputEvent) => setInvitationEmail(event.target.value)}
      >
      </input>
      <button
        className="UserList-emailFormButton fa fa-user-plus"
        type="button"
        onClick={() => {
          if (email) addUser(email)
        }}
      >
      </button>
      <div className="UserList-items">
        {users.map(user => (
          <UserItem key={user.id} user={user} isDestroy={isDestroy} removeUser={removeUser} />
        ))}
      </div>
    </div>
  )
}

export default UserList
