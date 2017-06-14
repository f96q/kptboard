// @flow

import type { Label, CreateLabel, UpdateLabel } from './labels'
import type { User } from './users'

export type clearAlert = () => void

export type createLabel = (label: CreateLabel) => void
export type updateLabel = (id: number, label: UpdateLabel) => void
export type destroyLabel =  (id: number) => void

export type dragStartLabel = (id: number) => void
export type dragEndLabel = () => void
export type dropLabel = (id: number, typ: string, index: number) => void

export type openNewLabelModal = (typ: string, clientX: number, clientY: number) => void
export type openEditLabelModal = (id: number, clientX: number, clientX: number) => void
export type updateLabelModal = (description: string) => void
export type closeLabelModal = () => void

export type addUser = (email: string) => void
export type removeUser = (id: number) => void
export type setInvitationEmail = (email: string) => void

export type ActionsState = {
  clearAlert: clearAlert,
  createLabel: createLabel,
  updateLabel: updateLabel,
  destroyLabel: destroyLabel,
  dragStartLabel: dragStartLabel,
  dragEndLabel: dragEndLabel,
  dropLabel: dropLabel,
  openNewLabelModal: openNewLabelModal,
  openEditLabelModal: openEditLabelModal,
  updateLabelModal: updateLabelModal,
  closeLabelModal: closeLabelModal,
  addUser: addUser,
  removeUser: removeUser,
  setInvitationEmail: setInvitationEmail
}
