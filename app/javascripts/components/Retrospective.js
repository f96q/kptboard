import React, { useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../actionCreators'
import { Label } from './Label'
import { UserList } from './UserList'

export const Retrospective = (props) => {
  const { labels, dragStartId } = useSelector(state => ({
    labels: state.label.labels,
    dragStartId: state.label.dragStartId
  }))

  const dispatch = useDispatch()

  return (
    <div className="Retrospective">
      <div className="Retrospective-content">
        <div className="Retrospective-boards">
          <div className="Retrospective-board" onClick={event => dispatch(actions.label.openNewLabelModal({ kind: 'keep', clientX: event.clientX, clientY: event.clientY }))}>
            <h4 className="Retrospective-boardTitle">Keep</h4>
            <ReactSortable group="label" className="Retrospective-boardLabels" list={labels.keep} setList={labels => console.log(labels)} onStart={event => dispatch(actions.label.dragStartLabel({ id: labels.keep[event.oldIndex].id }))} onEnd={event => dispatch(actions.channel.dropLabel({ dragStartId: dragStartId, kind: 'keep', index: event.newIndex })) }>
              {labels.keep.map((label) => <Label key={label.id} label={label} />)}
            </ReactSortable>
          </div>
          <div className="Retrospective-boards" onClick={event => dispatch(actions.label.openNewLabelModal({ kind: 'problem', clientX: event.clientX, clientY: event.clientY }))}>
            <h4 className="Retrospective-boardTitle">Problem</h4>
            <ReactSortable group="label" className="Retrospective-boardLabels" list={labels.problem} setList={labels => console.log(labels)} onStart={event => dispatch(actions.label.dragStartLabel({ id: labels.problem[event.oldIndex].id }))} onEnd={event => dispatch(actions.channel.dropLabel({ dragStartId: dragStartId, kind: 'problem', index: event.newIndex })) }>
              {labels.problem.map(label => <Label key={label.id} label={label} />)}
            </ReactSortable>
          </div>
        </div>
        <div className="Retrospective-boards" onClick={event => dispatch(actions.label.openNewLabelModal({ kind: 'try', clientX: event.clientX, clientY: event.clientY }))}>
          <div className="Retrospective-board">
            <h4 className="Retrospective-boardTitle">Try</h4>
            <ReactSortable group="label" className="Retrospective-boardLabels" list={labels.try} setList={labels => console.log(labels)} onStart={event => dispatch(actions.label.dragStartLabel({ id: labels.try[event.oldIndex].id }))} onEnd={event => dispatch(actions.channel.dropLabel({ dragStartId: dragStartId, kind: 'try', index: event.newIndex })) }>
              {labels.try.map(label => <Label key={label.id} label={label} />)}
            </ReactSortable>
          </div>
        </div>
        <UserList />
      </div>
   </div>
  )
}
