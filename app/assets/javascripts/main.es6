window.onload = () => {
  let retrospective = $('.js-retrospective');
  if (retrospective) {
    let retrospectiveId = retrospective.data('id');
    let store = app.configureStore();
    let cable = ActionCable.createConsumer();

    app.retrospectivesChannel = app.createRetrospectivesChannel(cable, retrospectiveId, store)
    app.labelsChannel = app.createLabelsChannel(cable, retrospectiveId, store)

    ReactDOM.render((
      <ReactRedux.Provider store={store}>
        <app.App />
      </ReactRedux.Provider>
    ), retrospective[0]);
  }
}
