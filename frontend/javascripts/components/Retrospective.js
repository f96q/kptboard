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

export default class Retrospective extends Component {
  props: Props

  openLabelForm(e: MouseEvent) {
    const typ = this.closestType(e.target)
    if (typ == null) return
    this.props.openNewLabelModal(typ, e.clientX, e.clientY)
  }

  closestType(target: EventTarget) {
    for (let typ of ['keep', 'problem', 'try']) {
      if (this.refs[typ].contains(target)) {
        return typ
      }
    }
    return null
  }

  closestLabelIndex(typ: string, target: EventTarget) {
    for (let i in this.props.labels[typ]) {
      const label = this.props.labels[typ][i]
      const node = findDOMNode(this.refs[`label_${label.id}`])
      if (node == null) continue
      if (target instanceof Node && node.contains(target)) {
        return parseInt(i)
      }
    }
    return this.props.labels[typ].length
  }

  onDrop(e: Event) {
    e.preventDefault()

    const typ = this.closestType(e.target)
    if (typ == null) return
    const index = this.closestLabelIndex(typ, e.target)
    if (index == null) return
    if (this.props.dragStartId) {
      this.props.dropLabel(this.props.dragStartId, typ, index)
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
            <div className="Retrospective-board" ref="keep" onClick={this.openLabelForm.bind(this)}>
              <h4 className="Retrospective-boardTitle">Keep</h4>
              <div className="Retrospective-boardLabels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{keepLabels}</div>
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
