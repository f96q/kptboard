import React from 'react'

const removeButton = ({ user, removeUser }) => (
  <i className="UserItem-remove fa fa-remove"
     data-test="remove"
     onClick={() => {
       if (window.confirm(`remove user ${user.name}`)) {
         removeUser(user.id)
       }
     }}
   />
)

const UserItem = ({ user, removeUser, isDestroy }) => (
  <div className="UserItem">
    <div className="fa fa-user">
    <div className="UserItem-name" data-test="name">{user.name}</div>
    </div>
    {isDestroy ? removeButton({ user, removeUser }) : null}
  </div>
)

export default UserItem

