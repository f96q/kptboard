// @flow

import React, { Component } from 'react'

import type { Label as LabelType } from '../types/labels'
import type { destroyLabel, openEditLabelModal, dragStartLabel, dragEndLabel } from '../types/actions'

type Props = {
  label: LabelType,
  destroyLabel: destroyLabel,
  openEditLabelModal: openEditLabelModal,
  dragStartLabel: dragStartLabel,
  dragEndLabel: dragEndLabel
}

export default class Label extends Component {
  props: Props

  destroy(e: Event) {
    this.props.destroyLabel(this.props.label.id)
    e.stopPropagation()
  }

  edit(e: MouseEvent) {
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
