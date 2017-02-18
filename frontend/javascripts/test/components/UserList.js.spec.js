import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import UserList from '../../components/UserList'
import UserItem from '../../components/UserItem'

function setup(users) {
  const actions = {
    removeUser: expect.createSpy(),
    addUser: expect.createSpy()
  }

  const component = shallow(
    <UserList users={users} actions={actions} />
  )

  return {
    component: component,
    userItem: component.find(UserItem),
    emailForm: component.find('.UserList-emailForm'),
    emailFormButton: component.find('.UserList-emailFormButton'),
    actions: actions
  }
}

describe('UserList component', () => {
  const users = [
    { id: 1, name: 'name' }
  ]

  it('should render users', () => {
    const { userItem } = setup(users)
    expect(userItem.at(0).props()).toEqual({
      isDestroy: true,
      user: users[0],
      removeUser: expect.createSpy()
    })
  })

  it('should call add user button click', () => {
    const { emailForm, emailFormButton, actions } = setup(users)
    emailForm.simulate('change', {target: {value: 'test@example.com'}})
    emailFormButton.simulate('click')
    expect(actions.addUser).toHaveBeenCalled()
  })
})
