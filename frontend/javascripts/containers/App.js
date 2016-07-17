import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Retrospective from '../components/Retrospective'
import { getDragStartId, getLabels, getUsers } from '../reducers'
import * as RetrospectiveActions from '../actions'

class App extends React.Component {
  render() {
    const { dragStartId, labels, users, actions } = this.props
    return (<Retrospective dragStartId={dragStartId} labels={labels} users={users} actions={actions} />)
  }
}

function mapStateToProps(state) {
  return {
    dragStartId: getDragStartId(state),
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
