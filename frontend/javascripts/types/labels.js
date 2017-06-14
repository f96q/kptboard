// @flow

export type Label = {
  id: number,
  typ: string,
  createdAt: string,
  userName: string,
  description: string
}

export type Labels = Array<Label>

export type CreateLabel = {
  id: ?number,
  typ: ?string,
  description: string
}

export type UpdateLabel = {
  description: string
}

export type LabelModal = {
  isOpen: boolean,
  clientX: number,
  clientY: number,
  label: CreateLabel
}

export type LabelsState = {
  dragStartId: ?number,
  labels: {
    keep: Labels,
    problem: Labels,
    try: Labels
  },
  labelModal: LabelModal
}

type ActionCableAction =
  | { type: 'ACTION_CABLE_CREATE', retrospectiveId: number }
  | { type: 'ACTION_CABLE_CREATE_LABEL', label: CreateLabel }
  | { type: 'ACTION_CABLE_UPDATE_LABEL', id: number, label: UpdateLabel }
  | { type: 'ACTION_CABLE_DESTROY_LABEL', id: number }
  | { type: 'ACTION_CABLE_DROP_LABEL', id: number, typ: string, index: number }

type LabelModalAction =
  | { type: 'OPEN_NEW_LABEL_MODAL', clientX: number, clientY: number, typ: string }
  | { type: 'OPEN_EDIT_LABEL_MODAL', clientX: number, clientY: number, id: number }
  | { type: 'CLOSE_LABEL_MODAL' }
  | { type: 'UPDATE_LABEL_MODAL', description: string }

export type LabelAction =
  | LabelModalAction
  | ActionCableAction
  | { type: 'CREATE_LABEL', label: Label }
  | { type: 'UPDATE_LABEL', id: number, label: UpdateLabel }
  | { type: 'DESTROY_LABEL', id: number }
  | { type: 'DRAG_START_LABEL', id: number }
  | { type: 'DRAG_END_LABEL' }
  | { type: 'DROP_LABEL', id: number, typ: string, index: number }
