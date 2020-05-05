import React from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../actionCreators'

export const UserItem = (props) => {
  const dispatch = useDispatch()

  return (
    <div className="UserItem">
      <div className="fa fa-user">
        <div className="UserItem-name" data-test="name">{props.user.name}</div>
      </div>
      {props.isDestroy && (
        <i
          className="UserItem-remove fa fa-remove"
          data-test="remove"
          onClick={() => {
            if (window.confirm(`remove user ${props.user.name}`)) {
              dispatch(actions.channel.removeUser({ id: props.user.id }))
            }
          }}
        />
      )}
    </div>
  )
}
