import {
  ActionCreator,
  buildActionCreator,
  createReducer,
  Reducer
} from 'hard-reducer'

import { DeepReadonly } from 'utility-types'

import { setRetrospective } from '../actionCreators/globalActions'

const {
  createAction
} = buildActionCreator({
  prefix: 'labels/'
})

function findLabelPosition(labels, id) {
  for (let kind of ['keep', 'problem', 'try']) {
    for (let i = 0;  i < labels[kind].length; i++) {
      const label = labels[kind][i]
      if (label.id == id) {
        return { kind: kind, index: i }
      }
    }
  }
  return null
}

type Label = {
  id: string
  kind: 'keep' | 'problem' | 'try'
  description: string
}

type LabelState = {
  dragStartId: null | string
  labels: {
    keep: Label[]
    problem: Label[]
    try: Label[]
  }
  labelModal: {
    isOpen: boolean
    clientX: number
    clientY: number
    label: Label
  }
}

const initialState: LabelState = {
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
      id: '',
      kind: '',
      description: ''
    }
  }
}

// LabelModal
export const openNewLabelModal: ActionCreator<{

}> = createAction('open-new-label-modal')

export const openEditLabelModal: ActionCreator<{

}> = createAction('open-edit-label-modal')

export const updateLabelModal: ActionCreator<{

}> = createAction('update-label-modal')

export const closeLabelModal: ActionCreator<{

}> = createAction('close-label-modal')

// Label
export const createLabel: ActionCreator<{

}> = createAction('create-label')

export const updateLabel: ActionCreator<{

}> = createAction('update-label')

export const destroyLabel: ActionCreator<{

}> = createAction('destroy-label')

export const dragStartLabel: ActionCreator<{

}> = createAction('drag-start-label')

export const dragEndLabel: ActionCreator<{

}> = createAction('drag-end-lab')

export const dropLabel: ActionCreator<{

}> = createAction('drop-label')

export const reducer: Reducer<DeepReadonly<LabelState>> = createReducer(initialState)
  .case(setRetrospective, (state, payload) => {
    return {
      ...state,
      labels: payload.retrospective.labels
    }
  })
  .case(openNewLabelModal, (state, payload) => {
    const labelModal = {
      isOpen: true,
      clientX: payload.clientX,
      clientY: payload.clientY,
      label: {
        id: null,
        kind: payload.kind,
        description: ''
      }
    }
    return {
      ...state,
      labelModal: labelModal
    }
  })
  .case(openEditLabelModal, (state, payload) => {
    const position = findLabelPosition(state.labels, payload.id)
    if (position == null) return state
    const label = state.labels[position.kind][position.index]
    const labelModal = {
      isOpen: true,
      clientX: payload.clientX,
      clientY: payload.clientY,
      label: {
        id: label.id,
        kind: label.kind,
        description: label.description
      }
    }
    return {
      ...state,
      labelModal: labelModal
    }
  })
  .case(updateLabelModal, (state, payload) => {
    let labelModal = { ...state.labelModal }
    labelModal.label.description = payload.description
    return {
      ...state,
      labelModal: labelModal
    }
  })
  .case(closeLabelModal, (state, payload) => {
    return {
      ...state,
      labelModal: initialState.labelModal
    }
  })
  .case(createLabel, (state, payload) => {
    let labels = { ...state.labels }
    labels[payload.label.kind] = [payload.label, ...state.labels[payload.label.kind]]
    return {
      ...state,
      labels: labels
    }
  })
  .case(updateLabel, (state, payload) => {
    let labels = { ...state.labels }
    const position = findLabelPosition(labels, payload.id)
    if (position == null) return state
    labels[position.kind][position.index].description = payload.label.description
    return {
      ...state,
      labels: labels
    }
  })
  .case(destroyLabel, (state, payload) => {
    let labels = { ...state.labels }
    const position = findLabelPosition(labels, payload.id)
    if (position == null) return state
    labels[position.kind].splice(position.index, 1)
    return {
      ...state,
      labels: labels
    }
  })
  .case(dragStartLabel, (state, payload) => {
    return {
      ...state,
      dragStartId: payload.id
    }
  })
 .case(dragEndLabel, (state, payload) => {
   return {
     ...state,
     dragStartId: null
   }
 })
 .case(dropLabel, (state, payload) => {
   let labels = { ...state.labels }
    const from = findLabelPosition(labels, payload.id)
    if (from == null) return state
    const label = { ...labels[from.kind][from.index] }
    labels[from.kind].splice(from.index, 1)
    if (label.kind != payload.kind) {
      label.kind = payload.kind
    }
    labels[payload.kind].splice(payload.index, 0, label)
    return {
      ...state,
      labels: labels
    }
 })
