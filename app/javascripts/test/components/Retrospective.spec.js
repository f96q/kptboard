import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { sel } from '../utils'
import Retrospective from '../../components/Retrospective'
import UserList from '../../components/UserList'
import Label from '../../components/Label'

function setup(dragStartId, labels) {
  const actions = {
    openNewLabelModal: expect.createSpy(),
    openEditLabelModal: expect.createSpy(),
    dragStartLabel: expect.createSpy(),
    dragEndLabel: expect.createSpy(),
    dropLabel: expect.createSpy(),
    destroyLabel: expect.createSpy(),
    openEditLabelModal: expect.createSpy()
  }
  const component = shallow(
    <Retrospective dragStartId={dragStartId} labels={labels} {...actions} />
  )

  return {
    component: component,
    label: component.find(Label),
    board: component.find(sel('board')),
    boardLabels: component.find(sel('board-labels')),
    actions: actions
  }
}

describe('Retrospective component', () => {
  const labels = {
    keep: [
      {
        id: 1,
        typ: 'keep',
        createdAt: '08-01',
        userName: 'name',
        description: 'description'
      }
    ],
    problem: [],
    try: []
  }

  const users = [
    { id: 1, name: 'name' }
  ]

  it('should render', () => {
    const { label } = setup(null, labels,'')
    expect(label.at(0).props()).toEqual({
      label: labels.keep[0],
      destroyLabel: expect.createSpy(),
      openEditLabelModal: expect.createSpy(),
      dragStartLabel: expect.createSpy(),
      dragEndLabel: expect.createSpy(),
    })
  })
})
