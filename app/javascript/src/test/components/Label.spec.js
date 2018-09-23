import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { sel } from '../utils'
import Label from '../../components/Label'

function setup(label) {
  const actions = {
    destroyLabel: expect.createSpy(),
    openEditLabelModal: expect.createSpy(),
    dragStartLabel: expect.createSpy(),
    dragEndLabel: expect.createSpy()
  }

  const component = shallow(
    <Label label={label} {...actions} />
  ).first().shallow()

  return {
    component: component,
    createdAt: component.find(sel('created-at')),
    userName: component.find(sel('user-name')),
    description: component.find(sel('description')),
    remove: component.find(sel('remove')),
    actions: actions
  }
}

describe('Label component', () => {
  const label = {
    id: 1,
    kind: 'keep',
    createdAt: '08-01',
    userName: 'name',
    description: 'description'
  }

  it('should display', () => {
    const { createdAt, userName, description } = setup(label)
    expect(createdAt.text()).toEqual('08-01')
    expect(userName.text()).toEqual('name')
    expect(description.text()).toEqual('description')
  })

  it('should call remove button click', () => {
    const { remove, actions } = setup(label)
    remove.find('.Label-remove').simulate('click', { stopPropagation: expect.createSpy() })
    expect(actions.destroyLabel).toHaveBeenCalled()
  })

  it('should call Label click', () => {
    const { component, actions } = setup(label)
    component.simulate('click', { stopPropagation: expect.createSpy(), clientX: 0, clientY: 0})
    expect(actions.openEditLabelModal).toHaveBeenCalled()
  })

  it('should call Label drag start', () => {
    const { component, actions } = setup(label)
    component.simulate('dragStart')
    expect(actions.dragStartLabel).toHaveBeenCalled()
  })

  it('should call Label drag end', () => {
    const { component, actions } = setup(label)
    component.simulate('dragEnd')
    expect(actions.dragEndLabel).toHaveBeenCalled()
  })
})
