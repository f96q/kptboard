import React from 'react'

export default function UserItem(props) {
  const {
    user,
    isDestroy,
    removeUser
  } = props
  const removeButton = () => {
    return (
      <i
        className="UserItem-remove fa fa-remove"
        data-test="remove"
        onClick={() => {
          if (window.confirm(`remove user ${user.name}`)) {
            removeUser({ id: user.id })
          }
        }}
      />
    )
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
