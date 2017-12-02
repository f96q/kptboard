import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { sel } from '../utils'
import UserList from '../../components/UserList'
import UserItem from '../../components/UserItem'

function setup(users, email) {
  const actions = {
    removeUser: expect.createSpy(),
    addUser: expect.createSpy(),
    setInvitationEmail: expect.createSpy()
  }

  const component = shallow(
    <UserList users={users} email={email} {...actions} />
  )

  return {
    component: component,
    userItem: component.find(UserItem),
    emailForm: component.find(sel('email-form')),
    emailFormButton: component.find(sel('email-form-button')),
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
      isDestroy: false,
      user: users[0],
      removeUser: expect.createSpy()
    })
  })

  it('should call add user button click', () => {
    const { emailForm, emailFormButton, actions } = setup(users, 'test@example.com')
    emailFormButton.simulate('click')
    expect(actions.addUser).toHaveBeenCalled()
  })
})
