import React, { Component, PropTypes} from 'react'
import $ from 'jquery'
import Label from './Label'
import UserList from './UserList'

export default class Retrospective extends Component {
  openLabelForm(event) {
    let typ = $(event.target).closest('.js-board').data('typ')
    this.props.actions.openNewLabelModal(typ, event.clientX, event.clientY)
  }

  onDrop(event) {
    event.preventDefault()
    let typ = null
    let index = null
    if ($(event.target).hasClass('js-labels')) {
      typ = $(event.target).closest('.js-board').data('typ')
      index = this.props.labels[typ].length
    } else {
      let id = $(event.target).closest('.js-label').data('id')
      typ = $(event.target).closest('.js-board').data('typ')
      for (let i in this.props.labels[typ]) {
        let label = this.props.labels[typ][i]
        if (label.id == id) {
          index = parseInt(i)
          break
        }
      }
    }
    this.props.actions.dropLabel(this.props.dragStartId, typ, index)
  }

  onDragOver(event) {
    event.preventDefault()
  }

  render() {
    const { actions } = this.props

    let label = (label) => {
      return (
        <Label key={label.id}
               label={label}
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
      <div className="retrospective">
        <div className="retrospective__content">
          <div className="retrospective__boards">
            <div className="retrospective__board js-board" data-typ="keep" onClick={this.openLabelForm.bind(this)}>
              <h4 className="retrospective__board-title">Keep</h4>
              <div className="retrospective__labels js-labels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{keepLabels}</div>
            </div>

            <div className="retrospective__board js-board" data-typ="problem" onClick={this.openLabelForm.bind(this)}>
              <h4 className="retrospective__board-title">Problem</h4>
              <div className="retrospective__labels js-labels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{problemLabels}</div>
            </div>
          </div>

          <div className="retrospective__boards">
            <div className="retrospective__board js-board" data-typ="try" onClick={this.openLabelForm.bind(this)}>
              <h4 className="retrospective__board-title">Try</h4>
              <div className="retrospective__labels js-labels" onDrop={this.onDrop.bind(this)} onDragOver={this.onDragOver.bind(this)}>{tryLabels}</div>
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
