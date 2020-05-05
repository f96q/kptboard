import React from 'react'

export class Label extends React.Component {
  render() {
    return (
      <div className={`Label is-${this.props.label.kind}`}
        onClick={event => {
          this.props.openEditLabelModal({ id: this.props.label.id, clientX: event.clientX, clientY: event.clientY })
          event.stopPropagation()
        }}
        draggable="true"
        onDragStart={() => this.props.dragStartLabel({ id: this.props.label.id })}
        onDragEnd={() => this.props.dragEndLabel()}
      >
        <div className="Label-content">
          <div className="Label-header">
            <i className="Label-remove fa fa-remove"
              data-test="remove"
              onClick={event => {
                this.props.destroyLabel({ id: this.props.label.id })
                event.stopPropagation()
              }}></i>
            <div className="Label-createdAt" data-test="created-at">{this.props.label.createdAt}</div>
            <div className="Label-userName" data-test="user-name">{this.props.label.userName}</div>
          </div>
          <div className="Label-description" data-test="description">{this.props.label.description}</div>
        </div>
      </div>
    )
  }
}
