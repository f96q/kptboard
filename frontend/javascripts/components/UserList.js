import React from 'react'
import { withHandlers } from 'recompose'
import UserItem from './UserItem'

const onChangeEmail = ({ setInvitationEmail }) => event => {
  setInvitationEmail(event.target.value)
}

const onClickAddUser = ({ email, addUser }) => event => {
  if (email) addUser(email)
}

const UserList = ({ users, removeUser, onChangeEmail, onClickAddUser }) => (
  <div className="UserList">
      <input
        className="UserList-emailForm"
        data-test="email-form"
        type="email"
        placeholder="email"
        onChange={onChangeEmail}
    >
    </input>
    <button
      className="UserList-emailFormButton fa fa-user-plus"
      data-test="email-form-button"
      type="button"
      onClick={onClickAddUser}
    >
    </button>
    <div className="UserList-items">
      {users.map(user => (
        <UserItem key={user.id} user={user} isDestroy={users.length > 1} removeUser={removeUser} />
      ))}
    </div>
  </div>
)

export default withHandlers({
  onChangeEmail: onChangeEmail,
  onClickAddUser: onClickAddUser
})(UserList)

