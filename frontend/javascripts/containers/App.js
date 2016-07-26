import React, { Component, PropTypes } from 'react'
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
        <LabelModal isOpen={labelModal.isOpen}
                    clientX={labelModal.clientX}
                    clientY={labelModal.clientY}
                    label={labelModal.label}
                    updateLabelModal={actions.updateLabelModal}
                    createLabel={actions.createLabel}
                    updateLabel={actions.updateLabel}
                    closeLabelModal={actions.closeLabelModal} />
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
