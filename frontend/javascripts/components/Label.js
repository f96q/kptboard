import React from 'react'

export class Label extends React.Component {
  render() {
    const {
      destroyLabel,
      openEditLabelModal,
      dragStartLabel,
      dragEndLabel,
      label
    } = this.props
    return (
      <div className={`Label is-${this.props.label.kind}`}
        onClick={event => {
          openEditLabelModal(label.id, event.clientX, event.clientY)
          event.stopPropagation()
        }}
        draggable="true"
        onDragStart={() => dragStartLabel(label.id)}
        onDragEnd={() => dragEndLabel()}
      >
        <div className="Label-content">
          <div className="Label-header">
            <i className="Label-remove fa fa-remove"
              data-test="remove"
              onClick={event => {
                destroyLabel(label.id)
                event.stopPropagation()
              }}></i>
            <div className="Label-createdAt" data-test="created-at">{label.createdAt}</div>
            <div className="Label-userName" data-test="user-name">{label.userName}</div>
          </div>
          <div className="Label-description" data-test="description">{label.description}</div>
        </div>
      </div>
    )
  }
}
