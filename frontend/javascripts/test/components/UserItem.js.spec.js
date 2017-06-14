import React from 'react'
import expect from 'expect'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import UserItem from '../../components/UserItem'

function setup(user, isDestroy = false) {
  const actions = {
    removeUser: expect.createSpy()
  }

  const component = shallow(
    <UserItem user={user} isDestroy={isDestroy} {...actions} />
  )

  return {
    component: component,
    name: component.find('.UserItem-name'),
    remove: component.find('.UserItem-remove'),
    actions: actions
  }
}

describe('UserItem component', () => {
  const user = {
    id: 1,
    name: 'name'
  }

  it('should display name', () => {
    const { name } = setup(user)
    expect(name.text()).toEqual('name')
  })

  it('should call remove button click', () => {
    const { remove, actions } = setup(user, true)
    const confirmStub = sinon.stub(window, 'confirm')
    confirmStub.returns(true)
    remove.simulate('click')
    expect(actions.removeUser).toHaveBeenCalled()
  })
})
