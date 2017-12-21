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

export default class Label extends Component<Props> {
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
      <div className={`Label is-${this.props.label.kind}`} onClick={this.edit.bind(this)} draggable="true" onDragStart={this.onDragStart.bind(this)} onDragEnd={this.onDragEnd.bind(this)}>
        <div className="Label-content">
          <div className="Label-header">
            <i className="Label-remove fa fa-remove" data-test="remove" onClick={this.destroy.bind(this)}></i>
            <div className="Label-createdAt" data-test="created-at">{this.props.label.createdAt}</div>
            <div className="Label-userName" data-test="user-name">{this.props.label.userName}</div>
          </div>
          <div className="Label-description" data-test="description">{this.props.label.description}</div>
        </div>
      </div>
    )
  }
}
