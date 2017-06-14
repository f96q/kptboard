// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'

import type { ApplicationState, ApplicationAction } from './application'
import type { RetrospectiveAction } from './retrospective'
import type { LabelsState, LabelAction } from './labels'
import type { UsersState, UserAction } from './users'
import type { ActionsState } from './actions'

export type State = {
  application: ApplicationState,
  labels: LabelsState,
  users: UsersState,
  actions: ActionsState
}

export type Action =
  | ApplicationAction
  | RetrospectiveAction
  | LabelAction
  | UserAction

export type Store = ReduxStore<State, Action>;

export type Dispatch = ReduxDispatch<Action>;
