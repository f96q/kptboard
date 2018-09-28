import React from 'react'
import { UserItem } from './UserItem'
import { connector } from '../actionCreators'

export const UserList = connector(
  state => ({
    email: state.users.email
  }),
  actions => ({
    addUser: actions.addUser,
    setInvitationEmail: actions.setInvitationEmail
  })
)(function UserListImpl(props) {
  const {
    email,
    addUser,
    setInvitationEmail
  } = props
  return (
    <div className="UserList">
      <input
        className="UserList-emailForm"
        data-test="email-form"
        type="email"
        placeholder="email"
        onChange={event => setInvitationEmail(event.target.value)}
      >
      </input>
      <button
        className="UserList-emailFormButton fa fa-user-plus"
        data-test="email-form-button"
        type="button"
        onClick={() => {
          if (email) addUser(email)
        }}
      >
      </button>
      <UserListItems />
    </div>
  )
})

const UserListItems = connector(
  state => ({
    users: state.users.users
  }),
  actions => ({
    removeUser: actions.removeUser
  })
)(function UserListItemsImpl(props) {
  const {
    users,
    removeUser
  } = props
  return (
    <div className="UserList-items">
      {users.map(user => (
        <UserItem
          key={user.id}
          user={user}
          isDestroy={users.length > 1}
          removeUser={removeUser}
         />
      ))}
    </div>
  )
})
