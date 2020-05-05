import React from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../actionCreators'

export const Label = (props) => {
  const dispatch = useDispatch()

  return (
    <div className={`Label is-${props.label.kind}`}
      onClick={event => {
        dispatch(actions.label.openEditLabelModal({ id: props.label.id, clientX: event.clientX, clientY: event.clientY }))
        event.stopPropagation()
      }}
    >
      <div className="Label-content">
        <div className="Label-header">
          <i className="Label-remove fa fa-remove"
            onClick={event => {
              dispatch(actions.channel.destroyLabel({ id: props.label.id }))
              event.stopPropagation()
            }}></i>
          <div className="Label-createdAt">{props.label.createdAt}</div>
          <div className="Label-userName">{props.label.userName}</div>
        </div>
        <div className="Label-description">{props.label.description}</div>
      </div>
    </div>
  )
}

