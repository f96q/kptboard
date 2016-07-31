import React, { Component, PropTypes} from 'react'
import { findDOMNode } from 'react-dom'
import Label from './Label'
import UserList from './UserList'

export default class Retrospective extends Component {
  openLabelForm(e) {
    let typ = this.closestType(e.target)
    this.props.actions.openNewLabelModal(typ, e.clientX, e.clientY)
  }

  closestType(target) {
    for (let typ of ['keep', 'problem', 'try']) {
      if (this.refs[typ].contains(target)) {
        return typ
      }
    }
    return null
  }

  closestLabelIndex(typ, target) {
    for (let i in this.props.labels[typ]) {
      let label = this.props.labels[typ][i]
      if (findDOMNode(this.refs[`label_${label.id}`]).contains(target)) {
        return parseInt(i)
      }
    }
    return this.props.labels[typ].length
  }

  onDrop(e) {
    e.preventDefault()

    let typ = this.closestType(e.target)
    let index = this.closestLabelIndex(typ, e.target)

    this.props.actions.dropLabel(this.props.dragStartId, typ, index)
  }

  onDragOver(e) {
    e.preventDefault()
  }

  render() {
    const { actions } = this.props

    let label = (label) => {
      return (
        <Label key={label.id}
               label={label}
               ref={`label_${label.id}`}
               destroyLabel={actions.destroyLabel}
               openEditLabelModal={actions.openEditLabelModal}
               dragStartLabel={actions.dragStartLabel}
               dragEndLabel={actions.dragEndLabel} />
      )
    }

    let keepLabels = this.props.labels.keep.map(label)
    let problemLabels = this.props.labels.problem.map(label)
    let tryLabels = this.props.labels.try.map(label)

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

          <UserList users={this.props.users}
                    addUser={actions.addUser}
                    removeUser={actions.removeUser} />
        </div>
      </div>
    )
  }
}

Retrospective.propTypes = {
  dragStartId: PropTypes.number,
  labels: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}
