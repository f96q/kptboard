import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Retrospective from '../components/Retrospective'
import LabelModal from '../components/LabelModal'
import Alert from '../components/Alert'
import { getAlert, getDragStartId, getLabelModal, getLabels, getUsers, getEmail, getSubscriptions } from '../reducers'
import ActionDispatcher from '../actions'

class App extends Component {
  render() {
    const { alert, dragStartId, labelModal, labels, users, email, actions } = this.props
    return (
      <div>
        <Alert alert={alert} actions={actions} />
        <Retrospective dragStartId={dragStartId} labels={labels} users={users} email={email} actions={actions} />
        <LabelModal isOpen={labelModal.isOpen}
                    clientX={labelModal.clientX}
                    clientY={labelModal.clientY}
                    label={labelModal.label}
                    actions={actions} />
     </div>
    )
  }
}

App.propTypes = {
  dragStartId: PropTypes.number,
  labelModal: PropTypes.object.isRequired,
  labels: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    alert: getAlert(state),
    dragStartId: getDragStartId(state),
    labelModal: getLabelModal(state),
    labels: getLabels(state),
    users: getUsers(state),
    email: getEmail(state),
    subscriptions: getSubscriptions(state),
    actions: state.actions
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, { actions: new ActionDispatcher(stateProps, dispatchProps.dispatch) })
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(App)
