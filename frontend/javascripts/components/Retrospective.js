// @flow

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'

import Label from './Label'
import UserList from './UserList'

import type { Labels } from '../types/labels'
import type { Users } from '../types/users'
import type {
  clearAlert,
  createLabel,
  updateLabel,
  destroyLabel,
  dragStartLabel,
  dragEndLabel,
  dropLabel,
  openNewLabelModal,
  openEditLabelModal,
  updateLabelModal,
  closeLabelModal,
  addUser,
  removeUser,
  setInvitationEmail,
} from '../types/actions'

type Props = {
  dragStartId: ?number,
  labels: {
    keep: Labels,
    problem: Labels,
    try: Labels
  },
  users: Users,
  email: string,
  destroyLabel: destroyLabel,
  dragStartLabel: dragStartLabel,
  dragEndLabel: dragEndLabel,
  dropLabel: dropLabel,
  openNewLabelModal: openNewLabelModal,
  openEditLabelModal: openEditLabelModal,
  addUser: addUser,
  removeUser: removeUser,
  setInvitationEmail: setInvitationEmail
}

export default class Retrospective extends Component<Props> {
  openLabelForm(e: MouseEvent) {
    const kind = this.closestKind(e.target)
    if (kind == null) return
    this.props.openNewLabelModal(kind, e.clientX, e.clientY)
  }

  closestKind(target: EventTarget) {
    for (let kind of ['keep', 'problem', 'try']) {
      if (this.refs[kind].contains(target)) {
        return kind
      }
    }
    return null
  }

  closestLabelIndex(kind: string, target: EventTarget) {
    for (let i in this.props.labels[kind]) {
      const label = this.props.labels[kind][i]
      const node = findDOMNode(this.refs[`label_${label.id}`])
      if (node == null) continue
      if (target instanceof Node && node.contains(target)) {
        return parseInt(i)
      }
    }
    return this.props.labels[kind].length
  }

  onDrop(e: Event) {
    e.preventDefault()

    const kind = this.closestKind(e.target)
    if (kind == null) return
    const index = this.closestLabelIndex(kind, e.target)
    if (index == null) return
    if (this.props.dragStartId) {
      this.props.dropLabel(this.props.dragStartId, kind, index)
    }
  }

  onDragOver(e: Event) {
    e.preventDefault()
  }

  render() {
    const props = this.props
    const label = (label) => {
      return (
        <Label
          key={label.id}
          label={label}
          ref={`label_${label.id}`}
          destroyLabel={props.destroyLabel}
          openEditLabelModal={props.openEditLabelModal}
          dragStartLabel={props.dragStartLabel}
          dragEndLabel={props.dragEndLabel}
      />)
    }
    const keepLabels = this.props.labels.keep.map(label)
    const problemLabels = this.props.labels.problem.map(label)
    const tryLabels = this.props.labels.try.map(label)

    return (
      <div className="Retrospective">
        <div className="Retrospective-content">
          <div className="Retrospective-boards">
            <div className="Retrospective-board" data-test="board" ref="keep" onClick={this.openLabelForm.bind(this)}>
              <h4 className="Retrospective-boardTitle">Keep</h4>
              <div className="Retrospective-boardLabels" data-test="board-labels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{keepLabels}</div>
            </div>

            <div className="Retrospective-boards" ref="problem" onClick={this.openLabelForm.bind(this)}>
              <h4 className="Retrospective-boardTitle">Problem</h4>
              <div className="Retrospective-boardLabels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{problemLabels}</div>
            </div>
          </div>

          <div className="Retrospective-boards">
            <div className="Retrospective-board" ref="try" onClick={this.openLabelForm.bind(this)}>
              <h4 className="Retrospective-boardTitle">Try</h4>
              <div className="Retrospective-boardLabels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{tryLabels}</div>
            </div>
          </div>

          <UserList
            users={this.props.users}
            email={this.props.email}
            addUser={this.props.addUser}
            removeUser={this.props.removeUser}
            setInvitationEmail={this.props.setInvitationEmail}
          />
        </div>
      </div>
    )
  }
}
