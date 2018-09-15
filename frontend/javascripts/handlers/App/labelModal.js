import findLabelPosition from '../../utils/findLabelPosition'

export const openNewLabelModal = ({ setLabelModal }) => (kind, clientX, clientY) => {
  const labelModal = {
    isOpen: true,
    clientX: clientX,
    clientY: clientY,
    label: {
      id: null,
      kind: kind,
      description: ''
    }
  }
  setLabelModal(labelModal)
}

export const openEditLabelModal = ({ setLabelModal, labels }) => (id, clientX, clientY)  => {
  const position = findLabelPosition(labels, id)
  if (position == null) return state
  const label = labels[position.kind][position.index]
  const labelModal = {
    isOpen: true,
    clientX: clientX,
    clientY: clientY,
    label: {
      id: label.id,
      kind: label.kind,
      description: label.description
    }
  }
  setLabelModal(labelModal)
}

export const updateLabelModal = ({ setLabelModal, labelModal }) => description => {
  const label = { ...labelModal.label }
  label.description = description
  setLabelModal({...labelModal, label: label})
}

export const closeLabelModal = ({ setLabelModal }) => () => {
  const labelModal = {
    isOpen: false,
    clientX: 0,
    clientY: 0,
    label: {
      id: null,
      kind: null,
      description: ''
    }
  }
  setLabelModal(labelModal)
}
