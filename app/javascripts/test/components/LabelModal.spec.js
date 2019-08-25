import React from 'react'
import expect from 'expect'
import { shallow } from 'enzyme'
import { sel } from '../utils'
import LabelModal from '../../components/LabelModal'

function setup(labelModal) {
  const actions = {
    updateLabelModal: expect.createSpy(),
    closeLabelModal: expect.createSpy(),
    createLabel: expect.createSpy(),
    updateLabel: expect.createSpy()
  }
  const component = shallow(
    <LabelModal labelModal={labelModal} {...actions}/>
  )

  return {
    component: component,
    title: component.find(sel('title')),
    textarea: component.find(sel('textarea')),
    close: component.find(sel('close')),
    save: component.find(sel('save')),
    actions: actions
  }
}

describe('LabelModal component', () => {
  const labelModal = {
    isOpen: true,
    clientX: 0,
    clientY: 0,
    label: { id: 1, kind: 'keep', description: 'description' }
  }

  it('should display', () => {
    const { title, textarea } = setup(labelModal)
    expect(title.text()).toEqual('keep')
    expect(textarea.props().value).toEqual('description')
  })

  it('should call textarea change', () => {
    const { textarea, actions } = setup(labelModal)
    textarea.simulate('change', {target: {value: 'update description'}})
    expect(actions.updateLabelModal).toHaveBeenCalled()
  })

  it('should call close button click', () => {
    const { close, actions } = setup(labelModal)
    close.simulate('click')
    expect(actions.closeLabelModal).toHaveBeenCalled()
  })

  it('should call save button click', () => {
    const { save, actions } = setup(labelModal)
    save.simulate('click')
    expect(actions.updateLabel).toHaveBeenCalled()
  })

  it('should call save button click', () => {
    const labelModal = {
      isOpen: true,
      clientX: 0,
      clientY: 0,
      label: { id: null, kind: 'keep', description: 'description' }
    }
    const { save, actions } = setup(labelModal)
    save.simulate('click')
    expect(actions.createLabel).toHaveBeenCalled()
  })
})


