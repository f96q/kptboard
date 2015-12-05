app.configureStore = function () {
  const thunk = store => next => action =>
    typeof action === 'function' ? action(store.dispatch, store.getState) : next(action);

  const createStoreWithMiddleware = Redux.applyMiddleware(thunk)(Redux.createStore);
  let labelsReducer = app.labelsReducer;
  let usersReducer = app.usersReducer;
  return createStoreWithMiddleware(Redux.combineReducers({labelsReducer, usersReducer}));
}
