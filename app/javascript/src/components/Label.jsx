import React from 'react'
import { withHandlers } from 'recompose'

const edit = ({ label, openEditLabelModal }) => event => {
  openEditLabelModal(label.id, event.clientX, event.clientY)
  event.stopPropagation()
}

const destroy = ({ label, destroyLabel }) => event => {
  destroyLabel(label.id)
  event.stopPropagation()
}

const onDragStart = ({ label, dragStartLabel}) => event => {
  dragStartLabel(label.id)
}

const onDragEnd = ({ dragEndLabel }) => event => {
  dragEndLabel()
}

const Label = ({ label, edit, destroy, onDragStart, onDragEnd }) => (
  <div className={`Label is-${label.kind}`} onClick={edit} draggable="true" onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="Label-content">
        <div className="Label-header">
          <i className="Label-remove fa fa-remove" data-test="remove" onClick={destroy}></i>
          <div className="Label-createdAt" data-test="created-at">{label.createdAt}</div>
          <div className="Label-userName" data-test="user-name">{label.userName}</div>
        </div>
        <div className="Label-description" data-test="description">{label.description}</div>
      </div>
  </div>
)

export default withHandlers({
  edit: edit,
  destroy: destroy,
  onDragStart: onDragStart,
  onDragEnd: onDragEnd
})(Label)
