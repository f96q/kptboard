import React, { Component, PropTypes } from 'react'

export default class Label extends Component {
  destroy(event) {
    this.props.destroyLabel(this.props.label.id)
    event.stopPropagation()
  }

  edit(event) {
    this.props.openEditLabelModal(this.props.label.id, event.clientX, event.clientY)
    event.stopPropagation()
  }

  onDragStart(event) {
    this.props.dragStartLabel(this.props.label.id)
  }

  onDragEnd(event) {
    this.props.dragEndLabel()
  }

  render() {
    return (
      <div className={`js-label retrospective__label retrospective__label--${this.props.label.typ}`} onClick={this.edit.bind(this)} data-id={this.props.label.id} draggable="true" onDragStart={this.onDragStart.bind(this)} onDragEnd={this.onDragEnd.bind(this)}>
        <div className="retrospective__label-content">
          <div className="retrospective__label-header">
            <i className="retrospective__label-remove fa fa-remove" onClick={this.destroy.bind(this)}></i>
            <div className="retrospective__label-created-at">{this.props.label.created_at}</div>
            <div className="retrospective__label-user-name">{this.props.label.user_name}</div>
          </div>
          <div className="retrospective__label-description">{this.props.label.description}</div>
        </div>
      </div>
    )
  }
}

Label.propTypes = {
  label: PropTypes.shape({
    id: PropTypes.number.isRequired,
    typ: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    user_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  destroyLabel: PropTypes.func.isRequired,
  openEditLabelModal: PropTypes.func.isRequired,
  dragStartLabel: PropTypes.func.isRequired,
  dragEndLabel: PropTypes.func.isRequired
}
