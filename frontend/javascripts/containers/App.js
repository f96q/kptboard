// @flow

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Actions from '../actions'
import Retrospective from '../components/Retrospective'
import LabelModal from '../components/LabelModal'
import Alert from '../components/Alert'
import { getAlert, getDragStartId, getLabelModal, getLabels, getUsers, getEmail } from '../reducers'

import type { Connector } from 'react-redux';
import type { State, Dispatch } from '../types'
import type { Users } from '../types/users'
import type { Alert as AlertType } from '../types/application'
import type { Labels, Label, LabelModal as LabelModalType } from '../types/labels'
import type { ActionsState } from '../types/actions'

type Props = {
  alert: AlertType,
  dragStartId: ?number,
  labelModal: LabelModalType,
  labels: {
    keep: Labels,
    problem: Labels,
    try: Labels
  },
  users: Users,
  email: string,
  actions: ActionsState
}

const App = ({alert, dragStartId, labelModal, labels, users, email, actions}: Props) => (
  <div>
    <Alert alert={alert} clearAlert={actions.clearAlert} />
    <Retrospective
      dragStartId={dragStartId}
      labels={labels}
      users={users}
      email={email}
      openNewLabelModal={actions.openNewLabelModal}
      dropLabel={actions.dropLabel}
      addUser={actions.addUser}
      removeUser={actions.removeUser}
      setInvitationEmail={actions.setInvitationEmail}
      destroyLabel={actions.destroyLabel}
      openEditLabelModal={actions.openEditLabelModal}
      dragStartLabel={actions.dragStartLabel}
      dragEndLabel={actions.dragEndLabel}
      destroyLabel={actions.destroyLabel}
      openEditLabelModal={actions.openEditLabelModal}
      dragStartLabel={actions.dragStartLabel}
      dragEndLabel={actions.dragEndLabel}
    />
    <LabelModal
      labelModal={labelModal}
      createLabel={actions.createLabel}
      updateLabel={actions.updateLabel}
      updateLabelModal={actions.updateLabelModal}
      closeLabelModal={actions.closeLabelModal}
    />
  </div>
)

const mapStateToProps = (state: State): Props => {
  return {
    alert: getAlert(state),
    dragStartId: getDragStartId(state),
    labelModal: getLabelModal(state),
    labels: getLabels(state),
    users: getUsers(state),
    email: getEmail(state),
    actions: state.actions
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { actions: bindActionCreators(Actions, dispatch) }
}

const connector: Connector<{}, Props> = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default connector(App)
