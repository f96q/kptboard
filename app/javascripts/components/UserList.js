import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../actionCreators'
import { UserItem } from './UserItem'

export const UserList = (props) => {
  const { users, email } = useSelector(state => ({
    users: state.user.users,
    email: state.user.email
  }))

  const dispatch = useDispatch()

  return (
    <div className="UserList">
      <input
        className="UserList-emailForm"
        data-test="email-form"
        type="email"
        placeholder="email"
        onChange={event => dispatch(actions.user.setInvitationEmail({ email: event.target.value }))}
      >
      </input>
      <button
        className="UserList-emailFormButton fa fa-user-plus"
        data-test="email-form-button"
        type="button"
        onClick={() => {
          if (email) dispatch(actions.channel.addUser({ email: email }))
        }}
      >
      </button>
      <div className="UserList-items">
        {users.map(user => (
          <UserItem
            key={user.id}
            user={user}
            isDestroy={users.length > 1}
          />
        ))}
      </div>
    </div>
  )
}
