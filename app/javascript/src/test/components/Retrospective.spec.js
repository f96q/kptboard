import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { sel } from '../utils'
import Retrospective from '../../components/Retrospective'
import UserList from '../../components/UserList'
import Label from '../../components/Label'

function setup(dragStartId, labels, users, email) {
  const actions = {
    addUser: expect.createSpy(),
    removeUser: expect.createSpy(),
    destroyLabel: expect.createSpy(),
    openEditLabelModal: expect.createSpy(),
    dragStartLabel: expect.createSpy(),
    dragEndLabel: expect.createSpy(),
    setInvitationEmail: expect.createSpy()
  }
  const component = shallow(
    <Retrospective dragStartId={dragStartId} labels={labels} users={users} email={email} {...actions} />
  )

  return {
    component: component,
    label: component.find(Label),
    userList: component.find(UserList),
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
    const { label, userList } = setup(null, labels, users, '')
    expect(label.at(0).props()).toEqual({
      label: labels.keep[0],
      destroyLabel: expect.createSpy(),
      openEditLabelModal: expect.createSpy(),
      dragStartLabel: expect.createSpy(),
      dragEndLabel: expect.createSpy(),
    })
    expect(userList.props()).toEqual({
      users: users,
      email: '',
      addUser: expect.createSpy(),
      removeUser: expect.createSpy(),
      setInvitationEmail: expect.createSpy()
    })
  })
})