// @flow

import type { Action } from '../types'
import type { Labels, Label, LabelsState } from '../types/labels'

function findLabelPosition(labels, id) {
  for (let typ of ['keep', 'problem', 'try']) {
    for (let i = 0;  i < labels[typ].length; i++) {
      const label = labels[typ][i]
      if (label.id == id) {
        return { typ: typ, index: i }
      }
    }
  }
  return null
}

const initialState: LabelsState = {
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

const labels = (state: LabelsState = initialState, action: Action): LabelsState => {
  switch (action.type) {
    case 'SET_RETROSPECTIVE': {
      return { ...state, labels: action.retrospective.labels }
    }

    case 'OPEN_NEW_LABEL_MODAL': {
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
      return { ...state, labelModal: labelModal }
    }

    case 'OPEN_EDIT_LABEL_MODAL': {
      const position = findLabelPosition(state.labels, action.id)
      if (position == null) return state
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
      return { ...state, labelModal: labelModal }
    }

    case 'CLOSE_LABEL_MODAL': {
      return { ...state, labelModal: initialState.labelModal }
    }

    case 'UPDATE_LABEL_MODAL': {
      let labelModal = { ...state.labelModal }
      labelModal.label.description = action.description
      return { ...state, labelModal: labelModal }
    }

    case 'CREATE_LABEL': {
      let labels = { ...state.labels }
      labels[action.label.typ] = [action.label, ...state.labels[action.label.typ]]
      return { ...state, labels: labels }
    }

    case 'UPDATE_LABEL': {
      let labels = { ...state.labels }
      const position = findLabelPosition(labels, action.id)
      if (position == null) return state
      labels[position.typ][position.index].description = action.label.description
      return { ...state, labels: labels }
    }

    case 'DESTROY_LABEL': {
      let labels = { ...state.labels }
      const position = findLabelPosition(labels, action.id)
      if (position == null) return state
      labels[position.typ].splice(position.index, 1)
      return { ...state, labels: labels }
    }

    case 'DRAG_START_LABEL':
      return { ...state, dragStartId: action.id }

    case 'DRAG_END_LABEL':
      return { ...state, dragStartId: null }

    case 'DROP_LABEL': {
      let labels = { ...state.labels }
      const from = findLabelPosition(labels, action.id)
      if (from == null) return state
      const label = { ...labels[from.typ][from.index] }
      labels[from.typ].splice(from.index, 1)
      if (label.typ != action.typ) {
        label.typ = action.typ
      }
      labels[action.typ].splice(action.index, 0, label)
      return { ...state, labels: labels }
    }

    default:
      return state
  }
}

export default labels
