// @flow

import React from 'react'
import Modal from 'react-modal'

import type { Label, LabelModal as LabelModalType } from '../types/labels'
import type { createLabel, updateLabel, updateLabelModal, closeLabelModal } from '../types/actions'

type Props = {
  labelModal: LabelModalType,
  createLabel: createLabel,
  updateLabel: updateLabel,
  updateLabelModal: updateLabelModal,
  closeLabelModal: closeLabelModal
}

const LabelModal = ({ labelModal, createLabel, updateLabel, updateLabelModal, closeLabelModal }: Props) => {
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
      updateLabel(labelModal.label.id, { description: labelModal.label.description })
    } else {
      createLabel(labelModal.label)
    }
    closeLabelModal()
  }

  if (labelModal.label.kind == null) return null

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
            onChange={(event: SyntheticInputEvent<*>) => updateLabelModal(event.target.value)}
            onKeyDown={(event: Event) => { if (event.keyCode == 13) save() } }
            value={labelModal.label.description}
          ></textarea>
        </div>
        <div className="modal-footer">
          <button type="button" className="LabelModal-close btn btn-secondary" data-test="close" onClick={() => closeLabelModal()}>Close</button>
          <button type="button" className="LabelModal-save btn btn-primary" data-test="save" onClick={() => save()}>Save</button>
        </div>
      </div>
    </Modal>
  )
}

export default LabelModal
