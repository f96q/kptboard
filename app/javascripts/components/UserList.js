import React from 'react'
import UserItem from './UserItem'
import { connector } from '../actionCreators'

export default function UserListImpl(props) {
  const {
    users,
    email,
    addUser,
    removeUser,
    setInvitationEmail
  } = props
  return (
    <div className="UserList">
      <input
        className="UserList-emailForm"
        data-test="email-form"
        type="email"
        placeholder="email"
        onChange={event => setInvitationEmail({ email: event.target.value })}
      >
      </input>
      <button
        className="UserList-emailFormButton fa fa-user-plus"
        data-test="email-form-button"
        type="button"
        onClick={() => {
          if (email) addUser({ email: email })
        }}
      >
      </button>
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
    </div>
  )
}

export const UserList = connector(
  state => ({
    users: state.user.users,
    email: state.user.email
  }),
  actions => ({
    addUser: actions.channel.addUser,
    removeUser: actions.channel.removeUser,
    setInvitationEmail: actions.user.setInvitationEmail
  })
)(UserListImpl)
