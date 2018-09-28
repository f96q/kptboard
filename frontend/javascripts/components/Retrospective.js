import React from 'react'
import { findDOMNode } from 'react-dom'
import { connector } from '../actionCreators'
import { Label } from './Label'
import { UserList } from './UserList'

class RetrospectiveImpl extends React.Component {
  openLabelForm(e) {
    const kind = this.closestKind(e.target)
    if (kind == null) return
    this.props.openNewLabelModal(kind, e.clientX, e.clientY)
  }

  closestKind(target) {
    for (let kind of ['keep', 'problem', 'try']) {
      if (this.refs[kind].contains(target)) {
        return kind
      }
    }
    return null
  }

  closestLabelIndex(kind, target) {
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
    const {
      labels,
      destroyLabel,
      openEditLabelModal,
      dragStartLabel,
      dragEndLabel
    } = this.props
    const label = (label) => {
      return (
        <Label key={label.id}
          label={label}
          ref={`label_${label.id}`}
          destroyLabel={destroyLabel}
          openEditLabelModal={openEditLabelModal}
          dragStartLabel={dragStartLabel}
          dragEndLabel={dragEndLabel}
        />
      )
    }
    const keepLabels = labels.keep.map(label)
    const problemLabels = labels.problem.map(label)
    const tryLabels = labels.try.map(label)
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

          <UserList />
        </div>
      </div>
    )
  }
}

export const Retrospective = connector(
  state => ({
    labels: state.labels.labels,
    dragStartId: state.labels.dragStartId
  }),
  actions => ({
    destroyLabel: actions.destroyLabel,
    openNewLabelModal: actions.openNewLabelModal,
    openEditLabelModal: actions.openEditLabelModal,
    dragStartLabel: actions.dragStartLabel,
    dragEndLabel: actions.dragEndLabel,
    dropLabel: actions.dropLabel,
    destroyLabel: actions.destroyLabel,
    openEditLabelModal: actions.openEditLabelModal,
    dragStartLabel: actions.dragStartLabel,
    dragEndLabel: actions.dragEndLabel
  }),
)(RetrospectiveImpl)
