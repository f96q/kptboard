import * as types from '../constants/ActionTypes'

function findLabelPosition(labels, id) {
  for (let typ of ['keep', 'problem', 'try']) {
    for (let i in labels[typ]) {
      const label = labels[typ][i];
      if (label.id == id) {
        return { typ: typ, index: parseInt(i) }
      }
    }
  }
  return null
}

const initialState = {
  dragStartId: null,
  labels: {
    keep: [],
    problem: [],
    try: []
  },
  labelModal: {
    isOpen: false,
    clientX: 0,
    clientY: 0,
    label: {
      id: null,
      typ: null,
      description: ''
    }
  }
}

export default function labels(state = initialState, action) {
  switch (action.type) {
    case types.SET_RETROSPECTIVE: {
      return Object.assign({}, state, { labels: action.retrospective.labels })
    }

    case types.OPEN_NEW_LABEL_MODAL: {
      const labelModal = {
        isOpen: true,
        clientX: action.clientX,
        clientY: action.clientY,
        label: {
          id: null,
          typ: action.typ,
          description: ''
        }
      }
      return Object.assign({}, state, { labelModal: labelModal })
    }

    case types.OPEN_EDIT_LABEL_MODAL: {
      const position = findLabelPosition(state.labels, action.id)
      const label = state.labels[position.typ][position.index]
      const labelModal = {
        isOpen: true,
        clientX: action.clientX,
        clientY: action.clientY,
        label: {
          id: label.id,
          typ: label.typ,
          description: label.description
        }
      }
      return Object.assign({}, state, { labelModal: labelModal })
    }

    case types.CLOSE_LABEL_MODAL: {
      return Object.assign({}, state, { labelModal: initialState.labelModal })
    }

    case types.UPDATE_LABEL_MODAL: {
      let labelModal = Object.assign({}, state.labelModal)
      labelModal.label.description = action.description
      return Object.assign({}, state, { labelModal: labelModal })
    }

    case types.CREATE_LABEL: {
      let labels = Object.assign({}, state.labels)
      labels[action.label.typ] = [action.label, ...state.labels[action.label.typ]]
      return Object.assign({}, state, { labels: labels })
    }

    case types.UPDATE_LABEL: {
      let labels = Object.assign({}, state.labels)
      const position = findLabelPosition(labels, action.id)
      labels[position.typ][position.index].description = action.label.description
      return Object.assign({}, state, { labels: labels })
    }

    case types.DESTROY_LABEL: {
      let labels = Object.assign({}, state.labels)
      const position = findLabelPosition(labels, action.id)
      labels[position.typ].splice(position.index, 1)
      return Object.assign({}, state, { labels: labels })
    }

    case types.DRAG_START_LABEL:
      return Object.assign({}, state, { dragStartId: action.id })

    case types.DRAG_END_LABEL:
      return Object.assign({}, state, { dragStartId: null })

    case types.DROP_LABEL: {
      let labels = Object.assign({}, state.labels)
      const from = findLabelPosition(labels, action.id)
      const label = Object.assign({}, labels[from.typ][from.index])
      labels[from.typ].splice(from.index, 1)
      if (label.typ != action.typ) {
        label.typ = action.typ
      }
      labels[action.typ].splice(action.index, 0, label)
      return Object.assign({}, state, { labels: labels })
    }
  }
  return state
}
