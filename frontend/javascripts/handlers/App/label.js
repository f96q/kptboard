export const dragStartLabel = ({ setDragStartId }) => id => {
  setDragStartId(id)
}

export const dragEndLabel = ({ setDragStartId }) => () => {
  setDragStartId(null)
}

export const dropLabel = ({ labelsChannel }) => (id, kind, index) => {
  labelsChannel.perform('position', { id: id, kind: kind, position: index + 1 })
}

export const createLabel = ({ labelsChannel }) => label => {
  labelsChannel.perform('create', { label: label })
}

export const updateLabel = ({ labelsChannel }) => (id, label) => {
  labelsChannel.perform('update', { id: id, label: label })
}

export const destroyLabel = ({ labelsChannel }) => id => {
  labelsChannel.perform('destroy', { id: id })
}
