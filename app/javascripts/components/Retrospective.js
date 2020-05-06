import React from 'react'
import { findDOMNode } from 'react-dom'
import { connector } from '../actionCreators'
import { Label } from './Label'
import { UserList } from './UserList'

class RetrospectiveImpl extends React.Component {
  openLabelForm(e) {
    const kind = this.closestKind(e.target)
    if (kind == null) return
    this.props.openNewLabelModal({ kind: kind, clientX: e.clientX, clientY: e.clientY })
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

  onDrop(e) {
    e.preventDefault()

    const kind = this.closestKind(e.target)
    if (kind == null) return
    const index = this.closestLabelIndex(kind, e.target)
    if (index == null) return
    if (this.props.dragStartId) {
      this.props.dropLabel({ dragStartId: this.props.dragStartId, kind: kind, index: index })
    }
  }

  onDragOver(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div className="Retrospective">
        <div className="Retrospective-content">
          <div className="Retrospective-boards">
            <div className="Retrospective-board" data-test="board" ref="keep" onClick={this.openLabelForm.bind(this)}>
              <h4 className="Retrospective-boardTitle">Keep</h4>
              <div className="Retrospective-boardLabels" data-test="board-labels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>
                {this.props.labels.keep.map(label => <Label key={label.id} label={label} ref={`label_${label.id}`} destroyLabel={this.props.destroyLabel} openEditLabelModal={this.props.openEditLabelModal} dragStartLabel={this.props.dragStartLabel} dragEndLabel={this.props.dragEndLabel} />)}
              </div>
            </div>
            <div className="Retrospective-boards" ref="problem" onClick={this.openLabelForm.bind(this)}>
              <h4 className="Retrospective-boardTitle">Problem</h4>
               <div className="Retrospective-boardLabels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>
                {this.props.labels.problem.map(label => <Label key={label.id} label={label} ref={`label_${label.id}`} destroyLabel={this.props.destroyLabel} openEditLabelModal={this.props.openEditLabelModal} dragStartLabel={this.props.dragStartLabel} dragEndLabel={this.props.dragEndLabel} />)}
              </div>
            </div>
          </div>
          <div className="Retrospective-boards">
            <div className="Retrospective-board" ref="try" onClick={this.openLabelForm.bind(this)}>
              <h4 className="Retrospective-boardTitle">Try</h4>
              <div className="Retrospective-boardLabels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>
                {this.props.labels.try.map(label => <Label key={label.id} label={label} ref={`label_${label.id}`} destroyLabel={this.props.destroyLabel} openEditLabelModal={this.props.openEditLabelModal} dragStartLabel={this.props.dragStartLabel} dragEndLabel={this.props.dragEndLabel} />)}
              </div>
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
    labels: state.label.labels,
    dragStartId: state.label.dragStartId
  }),
  actions => ({
    openNewLabelModal: actions.label.openNewLabelModal,
    openEditLabelModal: actions.label.openEditLabelModal,
    dragStartLabel: actions.label.dragStartLabel,
    dragEndLabel: actions.label.dragEndLabel,
    dropLabel: actions.channel.dropLabel,
    destroyLabel: actions.channel.destroyLabel
  })
)(RetrospectiveImpl)
