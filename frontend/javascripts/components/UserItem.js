// @flow

import React from 'react'

import type { User } from '../types/users'
import type { removeUser } from '../types/actions'

type Props = {
  user: User,
  removeUser: removeUser,
  isDestroy: boolean
}

const UserItem = ({ user, removeUser, isDestroy }: Props) => {
  const removeButton = () => {
    return (
      <i
        className="UserItem-remove fa fa-remove"
        data-test="remove"
        onClick={() => {
          if (window.confirm(`remove user ${user.name}`)) {
            removeUser(user.id)
          }
        }}
      />)
  }
  return (
    <div className="UserItem">
      <div className="fa fa-user">
        <div className="UserItem-name" data-test="name">{user.name}</div>
      </div>
      {isDestroy ? removeButton() : null}
    </div>
  )
}

export default UserItem
