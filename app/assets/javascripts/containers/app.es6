(function() {

class App extends React.Component {
  render() {
    const { dragStartId, labels, users, actions } = this.props;
    return (<app.Retrospective dragStartId={dragStartId} labels={labels} users={users} actions={actions} />);
  }
}

function mapStateToProps(state) {
  return {
    dragStartId: state.labelsReducer.dragStartId,
    labels: state.labelsReducer.labels,
    users: state.usersReducer,
    actions: state.actions
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: Redux.bindActionCreators(app.RetrospectiveActions, dispatch)};
}

app.App = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
})();
