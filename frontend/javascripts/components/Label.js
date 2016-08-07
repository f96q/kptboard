import React, { Component, PropTypes } from 'react'

export default class Label extends Component {
  destroy(e) {
    this.props.destroyLabel(this.props.label.id)
    e.stopPropagation()
  }

  edit(e) {
    this.props.openEditLabelModal(this.props.label.id, e.clientX, e.clientY)
    e.stopPropagation()
  }

  onDragStart() {
    this.props.dragStartLabel(this.props.label.id)
  }

  onDragEnd() {
    this.props.dragEndLabel()
  }

  render() {
    return (
      <div className={`Label is-${this.props.label.typ}`} onClick={this.edit.bind(this)} draggable="true" onDragStart={this.onDragStart.bind(this)} onDragEnd={this.onDragEnd.bind(this)}>
        <div className="Label-content">
          <div className="Label-header">
            <i className="Label-remove fa fa-remove" onClick={this.destroy.bind(this)}></i>
            <div className="Label-createdAt">{this.props.label.createdAt}</div>
            <div className="Label-userName">{this.props.label.userName}</div>
          </div>
          <div className="Label-description">{this.props.label.description}</div>
        </div>
      </div>
    )
  }
}

Label.propTypes = {
  label: PropTypes.shape({
    id: PropTypes.number.isRequired,
    typ: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  destroyLabel: PropTypes.func.isRequired,
  openEditLabelModal: PropTypes.func.isRequired,
  dragStartLabel: PropTypes.func.isRequired,
  dragEndLabel: PropTypes.func.isRequired
}
