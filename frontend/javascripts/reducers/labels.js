import * as types from '../constants/ActionTypes'

function findLabelPosition(labels, id) {
  for (let typ of ['keep', 'problem', 'try']) {
    for (let i in labels[typ]) {
      let label = labels[typ][i];
      if (label.id == id) {
        return { typ: typ, index: parseInt(i) }
      }
    }
  }
  return null
}

const initialState = {
  dragStartId: null,
  labels: { keep: [], problem: [], try: [] },
  labelModal: {
    isOpen: false,
    clientX: 0,
    clientY: 0,
    id: null,
    typ: null,
    description: ''
  }
}

function labelsReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_RETROSPECTIVE: {
      return Object.assign({}, state, { labels: action.retrospective.labels })
    }

    case types.OPEN_NEW_LABEL_MODAL: {
      let labelModal = {
        isOpen: true,
        clientX: action.clientX,
        clientY: action.clientY,
        id: null,
        typ: action.typ,
        description: ''
      }
      return Object.assign({}, state, { labelModal: labelModal })
    }

    case types.OPEN_EDIT_LABEL_MODAL: {
      let position = findLabelPosition(state.labels, action.id)
      let label = state.labels[position.typ][position.index]
      let labelModal = {
        isOpen: true,
        clientX: action.clientX,
        clientY: action.clientY,
        id: label.id,
        typ: label.typ,
        description: label.description
      }
      return Object.assign({}, state, { labelModal: labelModal })
    }

    case types.CLOSE_LABEL_MODAL: {
      return Object.assign({}, state, { labelModal: initialState.labelModal })
    }

    case types.UPDATE_LABEL_MODAL: {
      let labelModal = Object.assign({}, state.labelModal, {description: action.description})
      return Object.assign({}, state, { labelModal: labelModal })
    }

    case types.CREATE_LABEL: {
      let labels = Object.assign({}, state.labels)
      labels[action.label.typ] = [action.label, ...state.labels[action.label.typ]]
      return Object.assign({}, state, { labels: labels })
    }

    case types.UPDATE_LABEL: {
      let labels = Object.assign({}, state.labels)
      let position = findLabelPosition(labels, action.id)
      labels[position.typ][position.index].description = action.label.description
      return Object.assign({}, state, { labels: labels })
    }

    case types.DESTROY_LABEL: {
      let labels = Object.assign({}, state.labels)
      let position = findLabelPosition(labels, action.id)
      labels[position.typ].splice(position.index, 1)
      return Object.assign({}, state, { labels: labels })
    }

    case types.DRAG_START_LABEL:
      return Object.assign({}, state, { dragStartId: action.id })

    case types.DRAG_END_LABEL:
      return Object.assign({}, state, { dragStartId: null })

    case types.DROP_LABEL: {
      let labels = Object.assign({}, state.labels)
      let from = findLabelPosition(labels, action.id)
      let label = Object.assign({}, labels[from.typ][from.index])
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

export default labelsReducer
