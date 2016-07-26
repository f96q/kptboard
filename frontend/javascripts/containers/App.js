import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Retrospective from '../components/Retrospective'
import LabelModal from '../components/LabelModal'
import { getDragStartId, getLabelModal, getLabels, getUsers } from '../reducers'
import * as RetrospectiveActions from '../actions'

class App extends Component {
  render() {
    const { dragStartId, labelModal, labels, users, actions } = this.props
    return (
      <div>
        <Retrospective dragStartId={dragStartId} labels={labels} users={users} actions={actions} />
        <LabelModal
          isOpen={labelModal.isOpen}
          id={labelModal.id}
          typ={labelModal.typ}
          description={labelModal.description}
          clientX={labelModal.clientX}
          clientY={labelModal.clientY}
          actions={actions} />
     </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dragStartId: getDragStartId(state),
    labelModal: getLabelModal(state),
    labels: getLabels(state),
    users: getUsers(state),
    actions: state.actions
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(RetrospectiveActions, dispatch) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
