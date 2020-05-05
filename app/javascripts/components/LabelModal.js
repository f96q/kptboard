import React from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../actionCreators'

export const LabelModal = (props) => {
  const { labelModal } = useSelector(state => ({
    labelModal: state.label.labelModal
  }))

  const dispatch = useDispatch()

  const style = {
    overlay: {
      top: labelModal.clientY,
      left: labelModal.clientX,
      backgroundColor: 'transparent'
    },
    content: {
      marginTop: 0,
      marginLeft: 0
    }
  }

  const save = () => {
    if (labelModal.label.description == '') {
      return
    }
    if (labelModal.label.id) {
      dispatch(actions.channel.updateLabel({ id: labelModal.label.id, label: { description: labelModal.label.description } }))
    } else {
      dispatch(actions.channel.createLabel({ label: labelModal.label }))
    }
    dispatch(actions.label.closeLabelModal())
  }

  if (labelModal.label.kind == null) {
    return null
  }

  return (
    <Modal className="LabelModal label-modal modal-dialog" isOpen={labelModal.isOpen} style={style} contentLabel="Modal">
      <div className="modal-content">
        <div className={`modal-header LabelModal-header is-${labelModal.label.kind}`}>
          <h4 className="LabelModal-title modal-title" data-test="title">{labelModal.label.kind}</h4>
        </div>
        <div className="modal-body">
          <textarea
            className="LabelModal-textarea form-control"
            data-test="textarea"
            rows="10"
            onChange={event => dispatch(actions.label.updateLabelModal({ description: event.target.value }))}
            onKeyDown={event => { if (event.keyCode == 13) save() }}
            value={labelModal.label.description}
          ></textarea>
        </div>
        <div className="modal-footer">
          <button type="button" className="LabelModal-close btn btn-secondary" data-test="close" onClick={() => dispatch(actions.label.closeLabelModal({}))}>Close</button>
          <button type="button" className="LabelModal-save btn btn-primary" data-test="save" onClick={() => save()}>Save</button>
        </div>
      </div>
    </Modal>
  )
}
