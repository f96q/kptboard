window.onload = () => {
  let retrospective = $('.js-retrospective');
  if (retrospective) {
    let id = retrospective.data('id');
    let url = retrospective.data('url');
    let store = app.configureStore();
    app.WebSocketDispatcher = app.createWebSocketDispatcher(id, url, store);

    ReactDOM.render((
      <ReactRedux.Provider store={store}>
        <app.App />
      </ReactRedux.Provider>
    ), retrospective[0]);
  }
}
